<?php
if (isset($_POST['operationtype'])) {
  $operationType = $_POST["operationtype"];
  if ($operationType == "update") {

    $newID = $_POST["id"];
    $newFirstName = $_POST["firstname"];
    $newLastName = $_POST["lastname"];
    $newEmail = $_POST["email"];
    $newPassword = $_POST["password"];
    $newCardNumber = $_POST["cardnumber"];
    $newAddress = $_POST["address"];
    $newType = $_POST["type"];

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
        $type = $user->getElementsByTagName('type')->item(0);

        $email->nodeValue = $newEmail;
        $firstName->nodeValue = $newFirstName;
        $lastName->nodeValue = $newLastName;
        $password->nodeValue = $newPassword;
        $cardnumber->nodeValue = $newCardNumber;
        $address->nodeValue = $newAddress;
        $type->nodeValue = $newType;
        break;
      }
    }

    $dom->save("./Data/Users.xml");
    header("Location: ./manage_users.html");
    exit();
  } else if ($operationType == "add") {

    $newID = $_POST["id"];
    $newFirstName = $_POST["firstname"];
    $newLastName = $_POST["lastname"];
    $newEmail = $_POST["email"];
    $newPassword = $_POST["password"];
    $newCardNumber = $_POST["cardnumber"];
    $newAddress = $_POST["address"];
    $newType = $_POST["type"];

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
    $newUser->appendChild(new DOMElement("type", $newType));


    $dom->save("./Data/Users.xml");
    header("Location: ./manage_users.html");
    exit();
  } else if ($operationType == "delete") {
    $newID = $_POST["id"];

    $dom = new DOMDocument();
    $dom->load("./Data/Users.xml");
    $root = $dom->documentElement;
    $users = $root->getElementsByTagName('user');
    $userToDelete = new DOMElement("null");

    foreach ($users as $user) {
      $id = $user->getElementsByTagName('id')->item(0)->textContent;
      if ($id == $newID) {
        $userToDelete = $user;
        break;
      }
    }

    $userToDelete->parentNode->removeChild($userToDelete);

    $dom->save("./Data/Users.xml");
    header("Location: ./manage_users.html");
    exit();
  } else if ($operationType == "cancel") {
    header("Location: ./manage_users.html");
    exit();
  } else {
    echo "We have a problem";
  }
} else {
  echo "We have a problem";
}

