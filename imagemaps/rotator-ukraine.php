<?php
 $numberBegin = 340;
 $numberEnd = 349;
 $numberPhotos = 6;
 function genHTMLAsia($numer) {
  return '<li><a href="/mp/info'.$numer.'.htm" target="_blank"><img src="/mp/p'.$numer.'-1.jpg" title="Hot Ukrainian Women" alt="Single Ukrainian Woman" /></a></li>'; 
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