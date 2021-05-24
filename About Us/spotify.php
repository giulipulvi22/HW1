<?php
$client_id = '00b878d70a3e4399a5c0a3c3db3ce26a'; 
$client_secret = '3b9b2694674546fb8de1d035e404c868'; 

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL,'https://accounts.spotify.com/api/token' );
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );
curl_setopt($ch, CURLOPT_POST, 1 );
curl_setopt($ch, CURLOPT_POSTFIELDS,'grant_type=client_credentials' ); 
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization: Basic '.base64_encode($client_id.':'.$client_secret)));
$token=json_decode(curl_exec($ch), true);
curl_close($ch);
$id = urlencode($_GET["play"]);
$url = 'https://api.spotify.com/v1/playlists/'.$id;
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization: Bearer '.$token['access_token'])); 
$res=curl_exec($ch);
curl_close($ch);

echo $res;

?>