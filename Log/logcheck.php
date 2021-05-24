<?php
    require_once 'dbcredentials.php';
    session_start();

    function logCheck(){
        if(isset($_SESSION['usernamelog'])){
            return $_SESSION['usernamelog'];
        }
        else
        return 0;
    }
?>