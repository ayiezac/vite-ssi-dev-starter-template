<?php
// vite.php

function vite($entry) {
    // Development: Load from Vite dev server
    if (file_exists($_SERVER['DOCUMENT_ROOT'] . '/.development')) { // Or use an env variable
        return <<<HTML
            <script type="module" src="http://localhost:5173/@vite/client"></script>
            <script type="module" src="http://localhost:5173/{$entry}"></script>
        HTML;
    }

    // Production: Load from built assets using the manifest
    $manifestPath = $_SERVER['DOCUMENT_ROOT'] . '/dist/manifest.json';
    if (file_exists($manifestPath)) {
        $manifest = json_decode(file_get_contents($manifestPath), true);
        if (isset($manifest[$entry])) {
            $entryChunk = $manifest[$entry];
            $output = '';

            // Include CSS files
            if (isset($entryChunk['css'])) {
                foreach ($entryChunk['css'] as $cssFile) {
                    $output .= "<link rel='stylesheet' href='/dist/{$cssFile}'>";
                }
            }

            // Include the JS file
            $jsFile = $entryChunk['file'];
            $output .= "<script type='module' src='/dist/{$jsFile}'></script>";

            return $output;
        }
    }

    return '<!-- Vite assets not found -->';
}
