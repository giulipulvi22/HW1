<?php
        require_once '../Log/logcheck.php';
        $conn = mysqli_connect($dbcredentials['host'], $dbcredentials['user'], $dbcredentials['password'], $dbcredentials['name']) or die(mysqli_error($conn));
        $query="SELECT * FROM FOTOGRAFO";
            $res = mysqli_query($conn, $query);
            $item = array();
                while($row = mysqli_fetch_array($res, MYSQLI_ASSOC)){
                $item[] = $row;
            }
            if ($res) {
                $array=['fotografi'=>$item];
                echo json_encode($array);
                mysqli_close($conn);
                exit;
            }
        ?>