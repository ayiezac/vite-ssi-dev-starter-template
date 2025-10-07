<?php
$numberBegin = 631;
$numberEnd = 640;
$numberPhotos = 8;

if (!function_exists('genHTMLPeru')) {

    function genHTMLPeru($number)
    {
        return "<div class='embla-rotator__slide'>
            <a class='hvr-shrink' href='/mp/info{$number}.htm'>
            <img decoding='async' class='img-fluid lazyload d-block' data-src='/mp/p{$number}-1.jpg' height='120' width='80' style='aspect-ratio: 80/120; object-fit: cover;' title='Profile - info{$number}' alt='Profile{$number}'>
            </a>
        </div>";
    }
}

$HTML = "";
$arr = range($numberBegin, $numberEnd);
if ($numberPhotos > count($arr))
    $numberPhotos = count($arr);

for ($i = 0; $i < $numberPhotos; $i++) {
    $randKey = array_rand($arr);
    $HTML .= "\t" . genHTMLPeru($arr[$randKey]);
    unset($arr[$randKey]);
}

echo $HTML;
