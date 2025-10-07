import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import fetch from 'node-fetch'; // Node18+: use global fetch instead
import type { Plugin, ResolvedConfig } from 'vite';

function resolveVirtual(
	baseRoot: string,
	requestPath: string,
	projectRoot: string,
) {
	if (requestPath.startsWith('/')) {
		return path.resolve(projectRoot, requestPath.slice(1));
	}
	return path.resolve(baseRoot, requestPath);
}

async function resolveIncludesAsync(
	content: string,
	rootDir: string,
	projectRoot: string,
	isBuild: boolean,
	depth = 0,
	maxDepth = 3,
): Promise<string> {
	if (depth > maxDepth) return content;

	const includeRE = /<!--#include\s+virtual="(.+?)"\s*-->/g;
	let match: RegExpExecArray | null;

	while (true) {
		match = includeRE.exec(content);
		if (!match) break;

		const virtualPath = match[1];
		let resolved: string | null = null;

		try {
			// Case 1: PHP include
			if (virtualPath.endsWith('.php')) {
				if (!isBuild) {
					const includePath = resolveVirtual(
						rootDir,
						virtualPath,
						projectRoot,
					);
					try {
						resolved = execSync(`php "${includePath}"`, {
							encoding: 'utf-8',
						});
					} catch (err) {
						console.error(
							`[vite-recursive-ssi] Failed to render PHP: ${includePath}`,
							err,
						);
						resolved = `<!-- error including PHP: ${includePath} -->`;
					}
				} else {
					resolved = `<!-- PHP include skipped during build: ${virtualPath} -->`;
				}
			}
			// Case 2: Proxied include (must fetch from Vite dev server)
			else if (
				virtualPath.startsWith('/invar') ||
				virtualPath.startsWith('/members') ||
				virtualPath.startsWith('/mp') ||
				virtualPath.startsWith('/cgi-bin') ||
				virtualPath.startsWith('/women') ||
				virtualPath.startsWith('/images') ||
				virtualPath.startsWith('/imagemapss')
			) {
				const url = `http://localhost:5173${virtualPath}`;
				const res = await fetch(url);
				if (!res.ok) {
					throw new Error(`HTTP ${res.status} for ${url}`);
				}
				const included = await res.text();
				resolved = await resolveIncludesAsync(
					included,
					rootDir,
					projectRoot,
					isBuild,
					depth + 1,
					maxDepth,
				);
			}
			// Case 3: Local file include
			else {
				const includePath = resolveVirtual(
					rootDir,
					virtualPath,
					projectRoot,
				);
				if (fs.existsSync(includePath)) {
					const included = fs.readFileSync(includePath, 'utf-8');
					resolved = await resolveIncludesAsync(
						included,
						path.dirname(includePath),
						projectRoot,
						isBuild,
						depth + 1,
						maxDepth,
					);
				} else {
					console.warn(
						`[vite-recursive-ssi] File not found: ${includePath}`,
					);
					resolved = `<!-- file not found: ${includePath} -->`;
				}
			}
		} catch (err) {
			console.error(
				`[vite-recursive-ssi] Error resolving include: ${virtualPath}`,
				err,
			);
			resolved = `<!-- error including: ${virtualPath} -->`;
		}

		if (resolved !== null) {
			content =
				content.slice(0, match.index) +
				resolved +
				content.slice(match.index + match[0].length);
			includeRE.lastIndex = 0; // reset regex after replacing
		}
	}

	return content;
}

export default function ViteRecursiveSSI(): Plugin {
	let isBuild = false;
	let projectRoot: string = process.cwd();

	return {
		name: 'vite-recursive-ssi',

		configResolved(config: ResolvedConfig) {
			isBuild = config.command === 'build';
			projectRoot = config.root;
		},

		async transformIndexHtml(html: string, ctx) {
			let processed = await resolveIncludesAsync(
				html,
				path.dirname(ctx.filename),
				projectRoot,
				isBuild,
			);

			if (isBuild) {
				processed = processed.replace(
					/<!--#include\s+virtual="\/imagemapss\//g,
					'<!--#include virtual="/imagemaps/',
				);
			}

			return processed;
		},

		async load(id: string) {
			if (id.endsWith('.shtml') || (!isBuild && id.endsWith('.html'))) {
				const raw = fs.readFileSync(id, 'utf-8');
				let resolved = await resolveIncludesAsync(
					raw,
					path.dirname(id),
					projectRoot,
					isBuild,
				);

				if (isBuild) {
					resolved = resolved.replace(
						/<!--#include\s+virtual="\/imagemapss\//g,
						'<!--#include virtual="/imagemaps/',
					);
				}

				return {
					code: resolved,
					map: null,
				};
			}
		},
	};
}
