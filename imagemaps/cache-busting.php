<?php
// serve_asset.php

// Use the server's document root as our base directory
$baseDir = $_SERVER['DOCUMENT_ROOT'];

// Get the requested asset path from the query string
$assetPath = isset($_GET['file']) ? $_GET['file'] : '';

// Sanitize the asset path to prevent directory traversal attacks
$assetPath = str_replace(array('../', './'), '', $assetPath);  // Remove parent/current directory references
$assetPath = ltrim($assetPath, '/\\');  // Remove leading slashes

// Build the full filesystem path to the requested asset
$fullAssetPath = realpath($baseDir . '/' . $assetPath);

// Security checks: ensure the path is valid and within our document root
$realBase = realpath($baseDir);
if (!$fullAssetPath || 
    strpos($fullAssetPath, $realBase) !== 0 ||  // Ensure path is inside document root
    !file_exists($fullAssetPath) || 
    !is_file($fullAssetPath)) 
{
    header("HTTP/1.0 404 Not Found");
    exit("File not found.");
}

// Get file information
$fileExtension = strtolower(pathinfo($fullAssetPath, PATHINFO_EXTENSION));
$fileMTime = filemtime($fullAssetPath);  // Last modified timestamp
$fileSize = filesize($fullAssetPath);

// Determine Content-Type based on file extension
$contentType = 'application/octet-stream';  // Default MIME type
switch ($fileExtension) {
    case 'css':
        $contentType = 'text/css';
        break;
    case 'js':
        $contentType = 'application/javascript';
        break;
    case 'gif':
        $contentType = 'image/gif';
        break;
    case 'png':
        $contentType = 'image/png';
        break;
    case 'jpg':
    case 'jpeg':
        $contentType = 'image/jpeg';
        break;
    case 'ico':
        $contentType = 'image/x-icon';
        break;
    // Add more MIME types as needed
}

// --- Cache Control Headers ---
$maxAge = 365 * 24 * 60 * 60;  // 1 year in seconds

// Set expiration to 1 year in the future
$expiresTime = time() + $maxAge;
header('Expires: ' . gmdate('D, d M Y H:i:s', $expiresTime) . ' GMT');

// Instruct browsers and proxies to cache for 1 year
header("Cache-Control: public, max-age=$maxAge, immutable");

// Provide last modified timestamp for conditional requests
header('Last-Modified: ' . gmdate('D, d M Y H:i:s', $fileMTime) . ' GMT');

// Generate unique ETag based on file content metadata
$eTag = md5($fileMTime . $fileSize);
header('ETag: "' . $eTag . '"');

// --- Conditional GET Handling ---
// Handle If-None-Match (ETag) check
if (isset($_SERVER['HTTP_IF_NONE_MATCH']) && trim($_SERVER['HTTP_IF_NONE_MATCH']) == '"' . $eTag . '"') {
    header("HTTP/1.0 304 Not Modified");
    exit();
}

// Handle If-Modified-Since check
if (isset($_SERVER['HTTP_IF_MODIFIED_SINCE'])) {
    $ifModifiedSince = strtotime($_SERVER['HTTP_IF_MODIFIED_SINCE']);
    if ($ifModifiedSince >= $fileMTime) {
        header("HTTP/1.0 304 Not Modified");
        exit();
    }
}

// --- Serve the file ---
header('Content-Type: ' . $contentType);
header('Content-Length: ' . $fileSize);
readfile($fullAssetPath);
exit();
?>