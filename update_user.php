<?php
if (isset($_POST['operationtype'])) {
  $operationType = $_POST["operationtype"];
  $path = "./Data/Users.xml";
  $returnToFrontStore = "Location: ./index_phase_II.html";
  $returnToBackStore = "Location: ./manage_users.html";
  if ($operationType == "update") {

    // Update an User

    // Retrive data from POST request
    $newID = $_POST["id"];
    $newFirstName = $_POST["firstname"];
    $newLastName = $_POST["lastname"];
    $newEmail = $_POST["email"];
    $newPassword = $_POST["password"];
    $newCardNumber = $_POST["cardnumber"];
    $newAddress = $_POST["address"];
    $newType = $_POST["type"];

    // Load the Users xml document
    $dom = new DOMDocument();
    $dom->load($path);
    $root = $dom->documentElement;
    $users = $root->getElementsByTagName('user');

    foreach ($users as $user) {
      $id = $user->getElementsByTagName('id')->item(0)->textContent;
      if ($id == $newID) {
        // Find the user where the id matched
        $email = $user->getElementsByTagName('email')->item(0);
        $firstName = $user->getElementsByTagName('firstname')->item(0);
        $lastName = $user->getElementsByTagName('lastname')->item(0);
        $password = $user->getElementsByTagName('password')->item(0);
        $cardnumber = $user->getElementsByTagName('cardnumber')->item(0);
        $address = $user->getElementsByTagName('address')->item(0);
        $type = $user->getElementsByTagName('type')->item(0);

        // Assign new value to user
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

    $dom->save($path);
    // Go to another page
    header($returnToBackStore);
    // Refresh script, so the another page will reload & display change
    exit();
  } else if ($operationType == "add" || $operationType == "signup") {

    $newFirstName = $_POST["firstname"];
    $newLastName = $_POST["lastname"];
    $newEmail = $_POST["email"];
    $newPassword = $_POST["password"];
    $newCardNumber = $_POST["cardnumber"];
    $newAddress = $_POST["address"];
    // Type will be default as 'normal'
    $newType = "normal";
    if (isset($_POST['type'])) {
      $newType = $_POST["type"];
    }

    $dom = new DOMDocument();
    $dom->load($path);
    $root = $dom->documentElement;

    // Find the last User, and $newID is his id + 1
    $length = $root->getElementsByTagName("user")->length;
    $lastUser = $root->getElementsByTagName('user')->item($length - 1);
    $newID = $lastUser->getElementsByTagName("id")->item(0)->nodeValue + 1;

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


    $dom->save($path);
    if ($operationType == "signup") {
      header($returnToFrontStore);
      exit();
    } else {
      header($returnToBackStore);
      exit();
    }
  } else if ($operationType == "delete") {
    $newID = $_POST["id"];

    $dom = new DOMDocument();
    $dom->load($path);
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

    $dom->save($path);
    header($returnToBackStore);
    exit();
  } else if ($operationType == "cancel") {
    // Admin cancel from backstore, return to backstore
    header($returnToBackStore);
    exit();
  } else if ($operationType == "abort") {
    // Customer cancel sign up process, return to frontstore
    header($returnToFrontStore);
    exit();
  } else {
    // operation type is wrong
    echo "We have a problem";
  }
} else {
  // We did not receive data of the request
  echo "We have a problem";
}
