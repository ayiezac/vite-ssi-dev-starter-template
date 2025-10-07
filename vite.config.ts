import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SSIPlugin } from '@server-side-include/vite-plugin';
import fg from 'fast-glob';
import UnpluginInjectPreload from 'unplugin-inject-preload/vite';
import { defineConfig } from 'vite';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import webfontdl from 'vite-plugin-webfont-dl';
import ViteRecursiveSSI from './vite-recursive-ssi';

const __dirname = dirname(fileURLToPath(import.meta.url));

const realitiesHtml = Object.fromEntries(
	fg
		.sync('realities/*.html', { cwd: __dirname })
		.map((file) => [file.replace(/\.html$/, ''), resolve(__dirname, file)]),
);

export default defineConfig({
	base: './',
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
				// ...realitiesHtml,
			},
			output: {
				entryFileNames: 'jscripts/[name].js',
				chunkFileNames: 'jscripts/[name].js',
				assetFileNames: ({ name }) => {
					if (!name) return 'assets/[name][extname]';

					// CSS → dist/jscripts/
					if (/\.(css)$/.test(name)) {
						return 'jscripts/[name][extname]';
					}

					// Images → dist/img/
					if (/\.(png|jpe?g|gif|svg|webp|avif)$/.test(name)) {
						return 'img/[name][extname]';
					}

					// Fonts → dist/fonts/
					if (/\.(woff2?|eot|ttf|otf)$/.test(name)) {
						return 'fonts/[name][extname]';
					}

					// Default → dist/assets/
					return 'assets/[name][extname]';
				},
			},
		},
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: true,
			},
		},
	},
	plugins: [
		SSIPlugin({
			rejectUnauthorized: true,
		}),
		ViteRecursiveSSI(),
		UnpluginInjectPreload({
			files: [
				{
					outputMatch: /\.js$/,
					attributes: {
						rel: 'modulepreload',
						as: undefined,
						type: undefined,
					},
				},
				{
					outputMatch: /\.css$/,
					attributes: {
						rel: 'preload',
						as: 'style',
					},
				},
				// Font preload
				{
					outputMatch: /\.(woff2?|ttf|otf|eot)$/,
					attributes: {
						rel: 'preload',
						as: 'font',
						type: 'font/woff2', // adjust based on actual format
						crossorigin: 'anonymous',
					},
				},
			],
			injectTo: 'head-prepend',
		}),
		webfontdl([
			'https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap',
			'https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap',
		]),
		ViteMinifyPlugin({
			removeComments: true,
			collapseWhitespace: true,
			conservativeCollapse: true,
			minifyJS: true,
			minifyCSS: true,
			ignoreCustomComments: [/^!/, /^\s*#/],
			processScripts: ['application/ld+json'],
			sortAttributes: true,
			sortClassName: true,
			noNewlinesBeforeTagClose: true,
			useShortDoctype: true,
			removeScriptTypeAttributes: true,
			removeStyleLinkTypeAttributes: true,
			collapseBooleanAttributes: true,
			removeEmptyAttributes: true,
			removeRedundantAttributes: true,
		}),
	],
	server: {
		fs: {
			allow: ['..'],
		},
		// port: 4173,
		proxy: {
			'/invar': {
				target: 'https://manila-women.com',
				changeOrigin: true,
				// secure: false,
			},
			'/members': {
				target: 'https://manila-women.com',
				changeOrigin: true,
				// secure: false,
			},
			'/mp': {
				target: 'https://manila-women.com',
				changeOrigin: true,
				// secure: false,
			},
			'/cgi-bin': {
				target: 'https://manila-women.com',
				changeOrigin: true,
				// secure: false,
			},
			'/women': {
				target: 'https://manila-women.com',
				changeOrigin: true,
				// secure: false,
			},
			'/images': {
				target: 'https://manila-women.com',
				changeOrigin: true,
				// secure: false,
			},
			'^/imagemaps/.*\\.php$': {
				target: 'http://localhost:5173',
				changeOrigin: true,
				// secure: false,
				rewrite: (path) => path.replace(/^\/imagemaps/, '/imagemaps'),
			},
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				silenceDeprecations: [
					'import',
					'color-functions',
					'global-builtin',
				],
			},
		},
	},
});
