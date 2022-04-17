<?php
session_start();

if (isset($_SESSION['username'])) {
    session_destroy();
    echo "<script>alert('You were properly logged out.</script>";
    echo "<script>location.href='login.php'</script>";
} else {
    echo "<script>location.href='login.php'</script>";
}
