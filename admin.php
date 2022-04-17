<?php
$username = "admin";
$password = "admin";

session_start();

if (isset($_SESSION['username'])) {
    echo "<h1>Welcome " . $_SESSION['username'] . "</h1>";
    echo "<a href='https://www.google.ca'>TestLink</a><br>";
    echo "<br><a href='logout.php'><input type=button value=logout name=logout></a>";
} else {
    if ($_POST['username'] == $username && $_POST['password'] == $password) {
        $_SESSION['username'] = $username;
        echo "<script>location.href='admin.php'</script>";
    } else {
        echo "<script>alert('Wrong credentials')</script>";
        echo "<script>location.href='login.php'</script>";
    }
}
