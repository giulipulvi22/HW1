<?php
    require_once '../Log/logcheck.php';
    if(!isset($_SESSION["usernamelog"])){
        $array=['type'=>'no', 'response'=>'Per poter salvare una foto devi effettuare il login.'];
        echo json_encode($array);
        exit;
        }
        else{
        $conn = mysqli_connect($dbcredentials['host'], $dbcredentials['user'], $dbcredentials['password'], $dbcredentials['name']) or die(mysqli_error($conn));
        if(logcheck()){
        $user=$_SESSION["usernamelog"];
        $queryPROP="SELECT u.username FROM utente u JOIN proprietario p ON u.username=p.username WHERE u.username='$user'";
        $resPROP = mysqli_query($conn, $queryPROP);
        if(mysqli_num_rows($resPROP)>0){
            $array=['type'=>'proprietario', 'response'=>'Per poter salvare le foto è necessario effettuare il login come utente.'];
            echo json_encode($array);
            mysqli_close($conn);
            exit;
        }
        $data = date('Y-m-d');
        $stampa = mysqli_real_escape_string($conn, $_GET["stampa"]);
        $query1 = "SELECT * FROM SALVATO WHERE stampa='$stampa' AND utente='$user'";
        $query2="INSERT INTO SALVATO (ID_PREF, stampa, utente, datasalvataggio) VALUES ('0', '$stampa', '$user', '$data')";
        if($res=mysqli_query($conn, $query1)){
            if(mysqli_num_rows($res)>0){
                $array=['type'=>'done', 'response'=>'Hai già aggiunto questa stampa ai preferiti.'];
                echo json_encode($array);
                mysqli_close($conn);
                exit;
            }
            else if (mysqli_query($conn, $query2)) {
                    $array=['type'=>'si','response'=>"Elemento salvato. Puoi visualizzarlo nell'area personale."];
                    echo json_encode($array);
                    mysqli_close($conn);
                    exit;
                }
            }
    }
}
?>