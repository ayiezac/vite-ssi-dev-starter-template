import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import type { Plugin, ResolvedConfig } from "vite";

function resolveVirtual(
  baseRoot: string,
  requestPath: string,
  projectRoot: string,
) {
  // If path starts with /, resolve from project root
  if (requestPath.startsWith("/")) {
    return path.resolve(projectRoot, requestPath.slice(1));
  }
  // Otherwise resolve relative to current file's directory
  return path.resolve(baseRoot, requestPath);
}

function resolveIncludes(
  content: string,
  rootDir: string,
  projectRoot: string,
  isBuild: boolean,
  depth = 0,
  maxDepth = 2,
): string {
  if (depth > maxDepth) return content;

  const includeRE = /<!--#include\s+virtual="(.+?)"\s*-->/g;
  let match: RegExpExecArray | null;

  while (true) {
    match = includeRE.exec(content);

    if (!match) break;

    // During build, leave the SSI directive as-is but modify the path
    if (isBuild) {
      // Strip the 's' from 'imagemapss' in the path during build
      const modifiedInclude = match[0].replace(
        /virtual="\/imagemapss\//g,
        'virtual="/imagemaps/',
      );

      if (modifiedInclude !== match[0]) {
        content =
          content.slice(0, match.index) +
          modifiedInclude +
          content.slice(match.index + match[0].length);
        // Reset regex index since we modified the content
        includeRE.lastIndex = 0;
      }
      continue;
    }

    // Only process includes during dev mode
    const includePath = resolveVirtual(rootDir, match[1], projectRoot);
    let resolved: string | null = null;

    if (includePath.endsWith(".php")) {
      try {
        resolved = execSync(`php "${includePath}"`, { encoding: "utf-8" });
      } catch (err) {
        console.error(
          `[vite-recursive-ssi] Failed to render PHP: ${includePath}`,
          err,
        );
        resolved = `<!-- error including PHP: ${includePath} -->`;
      }
    } else if (fs.existsSync(includePath)) {
      const included = fs.readFileSync(includePath, "utf-8");
      resolved = resolveIncludes(
        included,
        path.dirname(includePath),
        projectRoot,
        isBuild,
        depth + 1,
        maxDepth,
      );
    } else {
      console.warn(`[vite-recursive-ssi] File not found: ${includePath}`);
      resolved = `<!-- file not found: ${includePath} -->`;
    }

    if (resolved !== null) {
      content =
        content.slice(0, match.index) +
        resolved +
        content.slice(match.index + match[0].length);
      // Reset regex index since we modified the content
      includeRE.lastIndex = 0;
    }
  }

  return content;
}

export default function ViteRecursiveSSI(): Plugin {
  let isBuild = false;
  let projectRoot: string = process.cwd();

  return {
    name: "vite-recursive-ssi",

    configResolved(config: ResolvedConfig) {
      isBuild = config.command === "build";
      projectRoot = config.root;
    },

    transformIndexHtml(html: string, ctx) {
      return resolveIncludes(
        html,
        path.dirname(ctx.filename),
        projectRoot,
        isBuild,
      );
    },

    load(id: string) {
      if (id.endsWith(".shtml") || id.endsWith(".html")) {
        const raw = fs.readFileSync(id, "utf-8");
        const resolved = resolveIncludes(
          raw,
          path.dirname(id),
          projectRoot,
          isBuild,
        );

        return {
          code: resolved,
          map: null,
        };
      }
    },
  };
}
