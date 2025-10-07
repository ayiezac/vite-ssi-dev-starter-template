<?php
$numberBegin = 631;
$numberEnd = 640;
$numberPhotos = 8;

if (!function_exists('genHTMLPeru')) {
    function genHTMLPeru($number)
    {
        return "<li class='list-group-item border-0'><a class='hvr-shrink d-inline-block position-relative' href='/mp/info{$number}.htm'><svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' fill='currentColor' class='bi bi-check-circle position-absolute text-bg-primary rounded-circle' viewBox='0 0 16 16'><path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16'/><path d='m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05'/></svg><img fetchpriority='high' decoding='async' class='img-fluid rounded-4 d-block' style='aspect-ratio: 133/198; max-width: 11rem;' src='/mp/p{$number}-1.jpg' height='198' width='133' title='Cartagena Dating Profile - info{$number}' alt='Cartagena Dating{$number}'></a></li>";
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