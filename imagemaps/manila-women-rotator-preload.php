<?php
$numberBegin = 631;
$numberEnd = 640;
$numberPhotos = 8;

// $HTML = "";
$arr = range($numberBegin, $numberEnd);
if ($numberPhotos > count($arr))
    $numberPhotos = count($arr);

// Collect images for preloading
$preloadLinks = "";

for ($i = 0; $i < $numberPhotos; $i++) {
    $randKey = array_rand($arr);
    $imageSrc = "/mp/p" . $arr[$randKey] . "-1.jpg";
    
    $hasLazyLoading = false;

    // Preload the image
    if (!$hasLazyLoading) {
        // Preload the image only if it does not have 'loading="lazy"'
        $preloadLinks .= '<link fetchpriority="high" rel="preload" href="' . $imageSrc . '" as="image" type="image/jpeg" />';
    }
    
    unset($arr[$randKey]);
}

// Echo preload links in the head section
echo $preloadLinks;
?>