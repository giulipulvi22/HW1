<?php
    require_once '../Log/logcheck.php';
    if(!isset($_SESSION["usernamelog"])){
        header("Location: ../Log/login.php");
        exit;
    }
    $conn = mysqli_connect($dbcredentials['host'], $dbcredentials['user'], $dbcredentials['password'], $dbcredentials['name']) or die(mysqli_error($conn));
    if(logcheck()){
        $user=$_SESSION["usernamelog"];
        $postid = mysqli_real_escape_string($conn, $_POST["cartID"]);
        $query1="DELETE FROM CARRELLO WHERE ID_CARRELLO='$postid'";
        $query2 = "SELECT count(ID_CARRELLO) as num FROM CARRELLO WHERE utente = '$user'";

        $res = mysqli_query($conn, $query1);
        if($res){
            $res = mysqli_query($conn, $query2);
            if (mysqli_num_rows($res) >0) {
                $entry = mysqli_fetch_assoc($res);
                $returndata = array('npref' => $entry['num']);
                echo json_encode($returndata);
                mysqli_close($conn);
                exit;
            }
        }
        mysqli_close($conn);
    }
?>