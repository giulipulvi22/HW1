<?php
    require_once '../Log/logcheck.php';
    if(!isset($_SESSION["usernamelog"])){
        header("Location: ../Log/login.php");
        exit;
    }
    $conn = mysqli_connect($dbcredentials['host'], $dbcredentials['user'], $dbcredentials['password'], $dbcredentials['name']) or die(mysqli_error($conn));
    if(logcheck()){
        $user=$_SESSION["usernamelog"];
        $voto = mysqli_real_escape_string($conn, $_POST["voto"]);
        $rec = mysqli_real_escape_string($conn, $_POST["testo"]);
        $acquisto = mysqli_real_escape_string($conn, $_POST["acquisto"]);
        $query1="INSERT INTO RECENSIONE (id, voto, testo) VALUES ('0', '$voto', '$rec')";
        $query2 = "SELECT * FROM RECENSIONE order by ID desc limit 1";
        $res = mysqli_query($conn, $query1);
        if($res){
            $res = mysqli_query($conn, $query2);
            if (mysqli_num_rows($res) >0) {
                $item = array();
                while($row = mysqli_fetch_array($res, MYSQLI_ASSOC)){
                $item[] = $row;
                }
                $array=['items'=>$item];
                $recID=$item[0]['id'];
                $query3="INSERT INTO SUPPORTO (acquisto, recensione) values('$acquisto', '$recID')";
                if(mysqli_query($conn, $query3)){
                    $query4="SELECT r.voto as voto, r.testo as testo, st.materiale as materiale, st.prezzo as prezzo, st.larghezza as larghezza, st.altezza as altezza, f.titolo as titolo FROM RECENSIONE r join SUPPORTO s on r.id=s.recensione join ACQUISTO a on s.acquisto=a.id join STAMPA st on a.stampa=st.id join foto f on st.foto=f.id order by r.ID desc limit 1";
                    $res = mysqli_query($conn, $query4);
                    $item1 = array();
                    while($row = mysqli_fetch_array($res, MYSQLI_ASSOC)){
                    $item1[] = $row;
                    }
                    if (mysqli_num_rows($res) >0) {
                        $array1=['items'=>$item1];
                        echo json_encode($array1);
                        mysqli_close($conn);
                        exit;
                    }
                }
            }
            mysqli_close($conn);
        }
    }   
?>