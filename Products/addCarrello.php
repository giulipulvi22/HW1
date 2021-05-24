<?php
    require_once '../Log/logcheck.php';
    if(!isset($_SESSION["usernamelog"])){
        $array=['type'=>'no', 'response'=>'Per poter aggiungere una foto al carrello devi effettuare il login.'];
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
            $array=['type'=>'proprietario', 'response'=>'Per poter acquistare le foto è necessario effettuare il login come utente.'];
            echo json_encode($array);
            mysqli_close($conn);
            exit;
        }
        $stampa = mysqli_real_escape_string($conn, $_GET["stampa"]);
        $query1="INSERT INTO CARRELLO (ID_CARRELLO, stampa, utente) VALUES ('0', '$stampa', '$user')";
        if($res=mysqli_query($conn, $query1)){
            $array=['type'=>'si','response'=>"Elemento aggiunto al carrello. Puoi visualizzarlo nell'area personale."];
            echo json_encode($array);
            mysqli_close($conn);
            exit;

        }
    }
}
?>