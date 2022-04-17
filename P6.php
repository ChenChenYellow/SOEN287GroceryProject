<?php

if (isset($_POST['submit'])) {
  $firstname = $_POST['firstname'];
  $lastname = $_POST['lastname'];
  $email = $_POST['email'];
  $password = $_POST['password'];
  $cardnum = $_POST['cardnumber'];
  $address = $_POST['address'];
  $type = "normal";


  $dom = new DOMDocument();
  $dom->load('./Data/Users.xml');
  $dom->formatOutput = true;
  $mainusers = $dom->getElementsByTagName('users')->item(0);
  $users = $dom->getElementsByTagName('user');
  foreach ($users as $user) {
    // User exists- we shouldn't add- make user edit instead!
    if (strcmp($user->getElementsByTagName('email')->item(0)->nodeValue, $email) == 0) {
      $userExists = true;
    } else {
      $userExists = false;
    }
  }
  // User doesn't exist- add to xml file, need to add to table 
  if ($userExists == false) {
    $mainUsersTag = $dom->getElementsByTagName('users')->item(0);
    $mainUsersTag->formatOutput = true;

    $root = $mainUsersTag->appendChild($dom->createElement('user'));
    $root->appendChild($dom->createElement('firstname', $firstname));
    $root->appendChild($dom->createElement('lastname', $lastname));
    $root->appendChild($dom->createElement('cardnumber', $cardnum));
    $root->appendChild($dom->createElement('address', $address));
    $root->appendChild($dom->createElement('password', $password));
    $root->appendChild($dom->createElement('email', $email));
    $root->appendChild($dom->createElement('type', $type));
    $dom->formatOutput = true;
    $dom->save('./Data/Users.xml') or die('XML Create Error');
    session_destroy();
    session_start();
    $_SESSION['user'] = $user->getElementsByTagName('firstname')->item(0)->nodeValue . " " . $user->getElementsByTagName('lastname')->item(0)->nodeValue;
    header('Location: ./P1_index.php');
    die;
  } else {
    echo '<script>alert("Error")</script>';
  }
}




?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sign Up</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css" />
  <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js"></script>
  <script src="./Script/FrontStoreHeader.js" type="text/javascript" defer></script>
  <script src="./Script/FrontStoreFooter.js" type="text/javascript" defer></script>
  <link rel="stylesheet" href="./Styles/FrontStoreStyle.css" />
</head>

<body>
  <div class="container-fluid bg-light" id="mainContainer">
    <div class="row">
      <div class="col-lg-12 background-image-top contaier-fluid">
        <header-component></header-component>
      </div>
    </div>
    <div class="row">
      <div class="container bg-light">
        <form action="./update_user.php" method="post">
          <h2 class="text-center my-4">Sign Up</h2>

          <div class="row my-2">
            <div class="col-sm-6">
              <label for="inputEmail">Email</label>
            </div>
            <div class="col-sm-6">
              <input type="text" id="inputEmail" name="email" />
            </div>
          </div>

          <div class="row my-2">
            <div class="col-sm-6">
              <label for="inputPassword">Password</label>
            </div>
            <div class="col-sm-6">
              <input type="password" id="inputPassword" name="password" />
            </div>
          </div>

          <div class="row my-2">
            <div class="col-sm-6">
              <label for="inputFirstName">First Name</label>
            </div>
            <div class="col-sm-6">
              <input type="text" id="inputFirstName" name="firstname" />
            </div>
          </div>

          <div class="row my-2">
            <div class="col-sm-6">
              <label for="inputLastName">Last Name</label>
            </div>
            <div class="col-sm-6">
              <input type="text" id="inputLastName" name="lastname" />
            </div>
          </div>

          <div class="row my-2">
            <div class="col-sm-6">
              <label for="inputCardNumber">Card Number</label>
            </div>
            <div class="col-sm-6">
              <input type="text" id="inputCardNumber" name="cardnumber" />
            </div>
          </div>

          <div class="row my-2">
            <div class="col-sm-6">
              <label for="inputAddress">Address</label>
            </div>
            <div class="col-sm-6">
              <input type="text" id="inputAddress" name="address" />
            </div>
          </div>

          <div class="row my-2">
            <div class="col-sm-6">
              <button class="btn btn-outline-success" type="submit" name="submit" value="signup">
                Submit
              </button>
            </div>
            <div class="col-sm-6">
              <button class="btn btn-outline-warning" type="submit" value="abort">
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <footer-component></footer-component>
</body>

</html>