<?php
// serve_asset.php

// Define your assets directory
define('ASSETS_DIR', dirname(__FILE__) . '/jscripts/');

// Get the requested asset path
$assetPath = isset($_GET['file']) ? $_GET['file'] : '';

// Sanitize the asset path to prevent directory traversal
$assetPath = str_replace(array('../', './'), '', $assetPath);
$fullAssetPath = realpath(ASSETS_DIR . $assetPath);

// Ensure the requested file is within the ASSETS_DIR and actually exists
if (!$fullAssetPath || strpos($fullAssetPath, ASSETS_DIR) !== 0 || !file_exists($fullAssetPath) || !is_file($fullAssetPath)) {
    header("HTTP/1.0 404 Not Found");
    exit("File not found.");
}

// Get file information
$fileExtension = strtolower(pathinfo($fullAssetPath, PATHINFO_EXTENSION));
$fileMTime = filemtime($fullAssetPath); // Last modified time of the file
$fileSize = filesize($fullAssetPath);

// Determine Content-Type
$contentType = 'application/octet-stream'; // Default
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
    // Add more types as needed
}

// --- Cache Control Headers ---

// Set a far future Expires header (e.g., 1 year from now)
// Note: time() returns current timestamp, 31536000 seconds in a year
$expiresTime = time() + (365 * 24 * 60 * 60); // 1 year
header('Expires: ' . gmdate('D, d M Y H:i:s', $expiresTime) . ' GMT');

// Cache-Control: public, max-age (in seconds)
// This tells proxies and browsers to cache the content for a long time.
$maxAge = 365 * 24 * 60 * 60; // 1 year in seconds
header("Cache-Control: public, max-age=$maxAge");

// Last-Modified header
// This helps with conditional GET requests (If-Modified-Since)
header('Last-Modified: ' . gmdate('D, d M Y H:i:s', $fileMTime) . ' GMT');

// ETag header
// A unique identifier for the file. A simple ETag can be based on file modification time and size.
$eTag = md5($fileMTime . $fileSize);
header('ETag: "' . $eTag . '"');

// --- Conditional GET Handling ---

// Check If-None-Match (ETag)
if (isset($_SERVER['HTTP_IF_NONE_MATCH']) && trim($_SERVER['HTTP_IF_NONE_MATCH']) == '"' . $eTag . '"') {
    header("HTTP/1.0 304 Not Modified");
    exit();
}

// Check If-Modified-Since
if (isset($_SERVER['HTTP_IF_MODIFIED_SINCE'])) {
    $ifModifiedSince = strtotime($_SERVER['HTTP_IF_MODIFIED_SINCE']);
    // Compare only up to the second for consistency
    if ($ifModifiedSince >= $fileMTime) {
        header("HTTP/1.0 304 Not Modified");
        exit();
    }
}

// --- Serve the file ---
header('Content-Type: ' . $contentType);
header('Content-Length: ' . $fileSize);

// Read the file and output its content
readfile($fullAssetPath);
exit();
?>