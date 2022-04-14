<?php
  if (isset($_POST['sent'])) {
    $operationType = $_POST["sent"];
    if ($operationType == "Update") {

      $newID = $_POST["id"];
      $newFirstName = $_POST["firstname"];
      $newLastName = $_POST["lastname"];
      $newEmail = $_POST["email"];
      $newPassword = $_POST["password"];
      $newCardNumber = $_POST["cardnumber"];
      $newAddress = $_POST["address"];

      $dom = new DOMDocument();
      $dom->load("./Data/Users.xml");
      $root = $dom->documentElement;
      $users = $root->getElementsByTagName('user');

      foreach ($users as $user) {
        $id = $user->getElementsByTagName('id')->item(0)->textContent;
        if ($id == $newID) {
          $email = $user->getElementsByTagName('email')->item(0);
          $firstName = $user->getElementsByTagName('firstname')->item(0);
          $lastName = $user->getElementsByTagName('lastname')->item(0);
          $password = $user->getElementsByTagName('password')->item(0);
          $cardnumber = $user->getElementsByTagName('cardnumber')->item(0);
          $address = $user->getElementsByTagName('address')->item(0);

          $email->nodeValue = $newEmail;
          $firstName->nodeValue = $newFirstName;
          $lastName->nodeValue = $newLastName;
          $password->nodeValue = $newPassword;
          $cardnumber->nodeValue = $newCardNumber;
          $address->nodeValue = $newAddress;
          break;
        }
      }

      $dom->save("./Data/Users.xml");
      header("Location: ./manage_users.html");
    } else if ($operationType == "Add") {

      $newID = $_POST["id"];
      $newFirstName = $_POST["firstname"];
      $newLastName = $_POST["lastname"];
      $newEmail = $_POST["email"];
      $newPassword = $_POST["password"];
      $newCardNumber = $_POST["cardnumber"];
      $newAddress = $_POST["address"];

      $dom = new DOMDocument();
      $dom->load("./Data/Users.xml");
      $root = $dom->documentElement;

      $newUser = new DOMElement("user");

      $root->appendChild($newUser);

      $newUser->appendChild(new DOMElement("id", $newID));
      $newUser->appendChild(new DOMElement("email", $newEmail));
      $newUser->appendChild(new DOMElement("firstname", $newFirstName));
      $newUser->appendChild(new DOMElement("lastname", $newLastName));
      $newUser->appendChild(new DOMElement("password", $newPassword));
      $newUser->appendChild(new DOMElement("cardnumber", $newCardNumber));
      $newUser->appendChild(new DOMElement("address", $newAddress));


      $dom->save("./Data/Users.xml");
      header("Location: ./manage_users.html");
    } else {
      echo "We have a problem";
    }
  } else {
    echo "We have a problem";
  }
