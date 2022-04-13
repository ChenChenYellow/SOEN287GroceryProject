
  <?php
  //if (isset($_POST['id'])) {
    echo $_POST['id'];
    $dom = new DOMDocument();
    $dom->load("./Data/Users.xml");
    $root = $dom->documentElement;
    $users = $root->getElementsByTagName('user');
    foreach ($users as $user) {
      $id = $user->getElementsByTagName('id')->item(0)->textContent;
      echo $id;
      if ($id == $_POST['id']) {
        echo "enter";
        $email = $user->getElementsByTagName('email')->item(0);
        $firstName = $user->getElementsByTagName('firstname')->item(0);
        $lastName = $user->getElementsByTagName('lastname')->item(0);
        $password = $user->getElementsByTagName('password')->item(0);

        $email->nodeValue = "hellooooo";
        break;
      } else {
        echo " not enter";
      }
    }
    $dom->save("./Data/Users.xml");
    echo "DONE";
    return "Hello";
  //}
  ?>
