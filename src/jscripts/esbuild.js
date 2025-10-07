import esbuildWasm from 'https://cdn.jsdelivr.net/npm/esbuild-wasm@0.25.5/+esm';

async function loadScript(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load ${url}`);
  return await res.text();
}

async function buildAndInject() {
  await esbuildWasm.initialize({
    wasmURL: 'https://cdn.jsdelivr.net/npm/esbuild-wasm@0.25.5/esbuild.wasm',
  });

  const entryPointUrl = new URL('./jscripts/main.js', document.baseURI).href;

  const entryContents = await loadScript(entryPointUrl);

  const plugin = {
    name: 'remote-loader',
    setup(build) {
      build.onResolve({ filter: /^(\.\/|\.\.\/)/ }, args => {
        try {
          // fallback for empty importer (entry point)
          const importerUrl = args.importer && args.importer.startsWith('http')
            ? args.importer
            : entryPointUrl;

          const resolvedUrl = new URL(args.path, importerUrl).toString();
          return { path: resolvedUrl, namespace: 'remote' };
        } catch (err) {
          console.error('URL resolution error:', err, 'args:', args);
          return { errors: [{ text: 'Invalid base URL in onResolve' }] };
        }
      });


      build.onLoad({ filter: /.*/, namespace: 'remote' }, async (args) => {
        const contents = await loadScript(args.path);
        return {
          contents,
          loader: 'js',
        };
      });
    },
  };

  const result = await esbuildWasm.build({
    stdin: {
      contents: entryContents,
      sourcefile: entryPointUrl,
      resolveDir: '/', // Required but arbitrary in browser
      loader: 'js',
    },
    bundle: true,
    write: false,
    minify: true,
    inject: ['./jquery@1.12.4.js'],
    treeShaking: true,
    target: ['esnext'],
    plugins: [plugin],
  });

  for (const file of result.outputFiles) {
    const text = new TextDecoder().decode(file.contents);
    const script = document.createElement('script');
    script.type = 'module';
    script.textContent = text;
    document.body.append(script);
  }
}

document.addEventListener('DOMContentLoaded', buildAndInject);
