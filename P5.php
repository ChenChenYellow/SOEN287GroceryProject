<?php

if(isset$_POST['Submit'])
$email=$_POST['userEmail'];
$password=$_POST['userPassword'];
 //Create DOMDocument & LOAD
 $dom = new DOMDocument();
 $dom->load('./Data/Users.xml');
 $users = $dom->getElementsByTagName('user');
 foreach($users as $user){
     if ($user->getElementsByTagName('email')->item(0)->nodeValue == $email){
         // Email exists
         if($password==$user->getElementsByTagName('password')->item(0)->nodeValue){
             
                 session_start();
                 $_SESSION['user']=$user->getElementsByTagName('firstname')->item(0)->nodeValue." ".$user->getElementsByTagName('lastname')->item(0)->nodeValue;
                 header('Location: ./P1_index.php');
                 die;
     
             }

         }
     }
     }

}
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta charset="UTF-8" />
    <title>Sign In</title>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css"
    />
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js"></script>
    <script
      src="Script/FrontStoreHeader.js"
      type="text/javascript"
      defer
    ></script>
    <link rel="stylesheet" href="mystyle.css" type="text/css" />
  </head>
  <body>
    <header-component></header-component>
    <div class="container-fluid bg-light">
      <form method="post">
        <div class="container">
          <div class="row">
            <h1 class="text-center col-lg-12">Sign In</h1>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <label>Email</label>
            </div>
            <div class="col-lg-6">
              <input type="email" name="userEmail"  id="inputEmail" />
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <label>Password</label>
            </div>
            <div class="col-lg-6">
              <input type="password" name='userPassword' id="inputPassword" />
            </div>
          </div>
          <div class="row">
            <button
              class="btn btn-outline-success"
              type="submit"
              name="Submit"
            >
              Submit
            </button>
            <button
              class="btn btn-outline-warning"
              type="reset"
            >
              Reset
            </button>
          </div>
        </div>
      </form>
    </div>
  </body>
</html>
