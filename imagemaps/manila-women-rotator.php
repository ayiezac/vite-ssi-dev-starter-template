<?php
 $numberBegin = 631;
 $numberEnd = 640;
 $numberPhotos = 8; 
 function genHTMLAsia($numer) {
 return '<li><a href="/mp/info'.$numer.'.htm"><img width="200" height="300" decoding="async" class="lazyload d-block" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="/mp/p'.$numer.'-1.jpg" alt="Manila Women"></a></li>'; 
 }

 
 $HTML = ""; 
 $arr = range($numberBegin, $numberEnd); 
 if($numberPhotos > count($arr)) $numberPhotos = count($arr);
 
 for($i=0;$i<$numberPhotos;$i++) {
  $randKey = array_rand($arr); 
  $HTML .= "\t".genHTMLAsia($arr[$randKey]);
  unset($arr[$randKey]);
 } 
 
 echo $HTML;
 
?>
