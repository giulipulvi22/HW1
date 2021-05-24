<?php
    require_once '../Log/logcheck.php';
    if(!isset($_SESSION["usernamelog"])){
        header("Location: ../Log/login.php");
        exit;
    }
    $conn = mysqli_connect($dbcredentials['host'], $dbcredentials['user'], $dbcredentials['password'], $dbcredentials['name']) or die(mysqli_error($conn));
    $request=$_GET['q'];
    if($request=='fotografi'){
        $query="SELECT * FROM fotografo";
        $res=mysqli_query($conn, $query);
        $array=array();
        while($row = mysqli_fetch_array($res, MYSQLI_ASSOC)){
            $array[] = $row;
        }
        if ($res) {
            $response=['type'=>'fotografi', 'items'=>$array];
            echo json_encode($response);
            mysqli_close($conn);
            exit;
        }
    }
    if($request=='foto'){
        $query="SELECT * FROM foto";
        $res=mysqli_query($conn, $query);
        $array=array();
        while($row = mysqli_fetch_array($res, MYSQLI_ASSOC)){
            $array[] = $row;
        }
        if ($res) {
            $response=['type'=>'foto', 'items'=>$array];
            echo json_encode($response);
            mysqli_close($conn);
            exit;
        }
    }
    if($request=='stampe'){
        $query="SELECT s.ID as ID, s.foto as foto, f.titolo as titolo, s.prezzo as prezzo, s.altezza as altezza, s.larghezza as larghezza, s.materiale as materiale FROM stampa s join foto f on s.foto=f.id";
        $res=mysqli_query($conn, $query);
        $array=array();
        $likes=array();
        $ordered=array();
        $recensite=array();
        while($row = mysqli_fetch_array($res, MYSQLI_ASSOC)){
            $array[] = $row;
        }
        if ($res) {
            for($i=0; $i<count($array); $i++){
                $f= $array[$i]['ID'];
                $query1="SELECT count(*) as liked from salvato where stampa='$f'";
                $res=mysqli_query($conn, $query1);
                if($res){
                    while($row = mysqli_fetch_array($res, MYSQLI_ASSOC)){
                        $likes[] = $row;
                    }
                }
                $query2="SELECT count(*) as ordered from acquisto where stampa='$f'";
                $res2=mysqli_query($conn, $query2);
                if($res2){
                    while($row2 = mysqli_fetch_array($res2, MYSQLI_ASSOC)){
                        $ordered[] = $row2;
                    }
                }
            }
            $response=['type'=>'stampe', 'items'=>$array, "likes"=>$likes, "ordered"=>$ordered];
            echo json_encode($response);
            mysqli_close($conn);
            exit;
        }
    }
    if($request=='addFo'){
        $nome=mysqli_real_escape_string($conn, $_POST['nome']);
        $cognome=mysqli_real_escape_string($conn, $_POST['cognome']);
        $citta=mysqli_real_escape_string($conn, $_POST['citta']);
        $datan=mysqli_real_escape_string($conn, $_POST['datan']);
        $cf=mysqli_real_escape_string($conn, $_POST['cf']);
        $datai=mysqli_real_escape_string($conn, $_POST['datai']);
        $fb=mysqli_real_escape_string($conn, $_POST['fb']);
        $ig=mysqli_real_escape_string($conn, $_POST['ig']);
        $sp=mysqli_real_escape_string($conn, $_POST['sp']);
        $pp=$_FILES['propic'];
        if(!empty($nome)&&!empty($cognome)&&!empty($citta)&&!empty($datan)&&!empty($cf)&&!empty($datai)&&!empty($sp)&&!empty($pp)){
            if (isset($_FILES['propic'])) {
                $file = $_FILES['propic'];
                $type = exif_imagetype($file['tmp_name']);
                $allowedExt = array(IMAGETYPE_PNG => 'png', IMAGETYPE_JPEG => 'jpg', IMAGETYPE_GIF => 'gif');
                if (isset($allowedExt[$type])) {
                    if ($file['error'] === 0) {
                        if ($file['size'] < 7000000) {
                            $fileNameNew = uniqid('', true).".".$allowedExt[$type];
                            $fileDestination = '../immagini/'.$fileNameNew;
                            move_uploaded_file($file['tmp_name'], $fileDestination);
                        } else {
                            $error[] = "L'immagine non deve avere dimensioni maggiori di 7MB";
                        }
                    } else {
                        $error[] = "Errore nel carimento del file";
                    }
                } else {
                    $error[] = "I formati consentiti sono .png, .jpeg, .jpg e .gif";
                }
            }
    
            $foto=$fileDestination;
            $query="INSERT INTO FOTOGRAFO (CF, nome, cognome, citta, data_nascita, eta, data_inizio, negozio, propic, playlist, facebook, instagram) values('$cf', '$nome', '$cognome', '$citta', '$datan', 0, '$datai', 1, '$foto', '$sp', '$fb', '$ig')";
            $res=mysqli_query($conn, $query);
            mysqli_close($conn);
            header("Location: ../Proprietario/homeProprietario.php");
        }
        header("Location: ../Proprietario/homeProprietario.php");
    }

    if($request=='removeFo'){
        $cf=mysqli_real_escape_string($conn, $_GET['cf']);
        $query="SELECT ID FROM foto WHERE fotografo = '$cf'";
        $res = mysqli_query($conn, $query);
        $foto = array();
            while($row = mysqli_fetch_array($res, MYSQLI_ASSOC)){
            $foto[] = $row;
        }
        if ($res) {
            for($i=0; $i<count($foto); $i++){
                $f= $foto[$i]['ID'];
                $query1="DELETE FROM STAMPA WHERE foto = '$f'";
                $res=mysqli_query($conn, $query1);
                if($res){
                    $query2="DELETE FROM FOTO WHERE ID='$f'";
                    $res=mysqli_query($conn, $query2);
                    if(!$res){
                        $response=["error"=>mysqli_error($conn)];
                        echo json_encode($response);
                        mysqli_close($conn);
                        exit;
                    }
                }
                else{
                    $response=["error"=>mysqli_error($conn)];
                    echo json_encode($response);
                    mysqli_close($conn);
                    exit;
                }
            }
            $query="DELETE FROM FOTOGRAFO WHERE CF='$cf'";
                        $res=mysqli_query($conn, $query);
                        if ($res) {
                            $array=['cf'=>$cf, 'foto'=>$foto];
                            echo json_encode($array);
                            mysqli_close($conn);
                            exit;
                        }
        }
    }

    if($request=='addF'){
        $data=mysqli_real_escape_string($conn, $_POST['data']);
        $descrizione=mysqli_real_escape_string($conn, $_POST['descrizione']);
        $fotografo=mysqli_real_escape_string($conn, $_POST['cfFotografo']);
        $genere=mysqli_real_escape_string($conn, $_POST['genere']);
        $titolo=mysqli_real_escape_string($conn, $_POST['titolo']);
        $file= $_FILES['foto'];

        if(!empty($data)&&!empty($descrizione)&&!empty($fotografo)&&!empty($genere)&&!empty($titolo)&&!empty($file)){
            if (isset($_FILES['foto'])) {
                $file = $_FILES['foto'];
                $type = exif_imagetype($file['tmp_name']);
                $allowedExt = array(IMAGETYPE_PNG => 'png', IMAGETYPE_JPEG => 'jpg', IMAGETYPE_GIF => 'gif');
                if (isset($allowedExt[$type])) {
                    if ($file['error'] === 0) {
                        if ($file['size'] < 7000000) {
                            $fileNameNew = uniqid('', true).".".$allowedExt[$type];
                            $fileDestination = '../immagini/'.$fileNameNew;
                            move_uploaded_file($file['tmp_name'], $fileDestination);
                        } else {
                            $error[] = "L'immagine non deve avere dimensioni maggiori di 7MB";
                        }
                    } else {
                        $error[] = "Errore nel carimento del file";
                    }
                } else {
                    $error[] = "I formati consentiti sono .png, .jpeg, .jpg e .gif";
                }
            }
    
            $foto=$fileDestination;
            $query="INSERT INTO FOTO (ID, titolo, data_scatto, genere, fotografo, descrizione, file) values(0, '$titolo', '$data', '$genere', '$fotografo', '$descrizione', '$foto')";
            $res=mysqli_query($conn, $query);
            mysqli_close($conn);
            header("Location: ../Proprietario/homeProprietario.php");
        }
        header("Location: ../Proprietario/homeProprietario.php");
    }

    if($request=='removeF'){
        $ID=mysqli_real_escape_string($conn, $_GET['cf']);
        $query="DELETE FROM STAMPA WHERE FOTO='$ID'";
        $res=mysqli_query($conn, $query);
        if ($res) {
            $query="DELETE FROM FOTO WHERE ID='$ID'";
            $res=mysqli_query($conn, $query);
            echo json_encode($ID);
            mysqli_close($conn);
            exit;
        }
    }

    if($request=='removeS'){
        $ID=mysqli_real_escape_string($conn, $_GET['cf']);
        $query="DELETE FROM STAMPA WHERE ID='$ID'";
        $res=mysqli_query($conn, $query);
        if ($res) {
            echo json_encode($ID);
            mysqli_close($conn);
            exit;
        }
    }

    if($request=='addS'){
        $altezza=mysqli_real_escape_string($conn, $_GET['n']);
        $larghezza=mysqli_real_escape_string($conn, $_GET['c']);
        $materiale=mysqli_real_escape_string($conn, $_GET['ci']);
        $prezzo=mysqli_real_escape_string($conn, $_GET['dn']);
        $foto=mysqli_real_escape_string($conn, $_GET['cf']);
        $query="INSERT INTO STAMPA (ID, altezza, larghezza, materiale, prezzo, foto) values(0, '$altezza', '$larghezza', '$materiale', '$prezzo', '$foto')";
        $res=mysqli_query($conn, $query);
        if ($res) {
            $query1="SELECT MAX(ID) as ID FROM STAMPA";
            $res=mysqli_query($conn, $query1);
            if($res){
                $ID=mysqli_fetch_assoc($res);
                $response=["ID"=>$ID['ID'], "altezza"=>$altezza, "larghezza"=>$larghezza, "materiale"=>$materiale, "prezzo"=>$prezzo, "foto"=>$foto];
                echo json_encode($response);
                mysqli_close($conn);
                exit;
            }
        }
        else{
            $ris=mysqli_error($conn);
            echo json_encode($ris);
            mysqli_close($conn);
            exit;
        }
    }


?>