<?php
    $citta=$_GET['location'];
    $data=$_GET['date'];
    $key="3cb001a81fba428e889a587e29c717d7";//API KEY ipgeolocation
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL,
    "https://api.ipgeolocation.io/astronomy?apiKey=" .$key."&location=".$citta."&date=".$data);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $result = curl_exec($curl);
    echo $result;
    curl_close($curl);
?>