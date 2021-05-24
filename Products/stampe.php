<?php
    require_once '../Log/logcheck.php';
    $conn = mysqli_connect($dbcredentials['host'], $dbcredentials['user'], $dbcredentials['password'], $dbcredentials['name']) or die(mysqli_error($conn));
    $tipo = $_GET['t'];
    if($tipo=='foto'){
        $query="SELECT * FROM FOTO";
        $res = mysqli_query($conn, $query);
        $item = array();
            while($row = mysqli_fetch_array($res, MYSQLI_ASSOC)){
            $item[] = $row;
        }
        if ($res) {
            $array=['foto'=>$item];
            echo json_encode($array);
            mysqli_close($conn);
            exit;
        }
    }
    if($tipo=='stampa'){
        $id=$_GET['foto'];
        $query="SELECT * FROM FOTO f JOIN STAMPA s ON f.id=s.foto JOIN FOTOGRAFO o on f.fotografo=o.cf WHERE f.id='$id'";
        $res = mysqli_query($conn, $query);
        $item = array();
            while($row = mysqli_fetch_array($res, MYSQLI_ASSOC)){
            $item[] = $row;
        }
        if ($res) {
            $array=['foto'=>$item];
            echo json_encode($array);
            mysqli_close($conn);
            exit;
        }
    }
?>