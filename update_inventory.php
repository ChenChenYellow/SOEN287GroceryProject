<?php
if (isset($_POST["operationtype"])) {
    $operationType = $_POST["operationtype"];
    $path = "./Data/Inventory.xml";
    $returnToBackStore = "Location: ./manage_inventory.html";
    if ($operationType == "update") {

        $dom = new DOMDocument();
        $dom->load($path);
        $root = $dom->documentElement;
        $products = $root->getElementsByTagName('product');

        $id = $_POST["id"];

        foreach ($products as $product) {
            if ($product->getElementsByTagName("id")->item(0)->nodeValue == $id) {
                while ($product->getElementsByTagName("options")->length > 0) {
                    $options = $product->getElementsByTagName("options")->item(0);
                    $label = $options->getElementsByTagName("label")->item(0)->nodeValue;
                    $value = $_POST[$label];
                    $optionList = $options->getElementsByTagName("option");
                    foreach ($optionList as $option) {
                        if ($option->getElementsByTagName("description")->item(0)->nodeValue == $value) {
                            $product = $option;
                            break;
                        }
                    }
                }
                $product->getElementsByTagName("price")->item(0)->nodeValue = $_POST["price"];
                $product->getElementsByTagName("image")->item(0)->nodeValue = $_POST["image"];
                break;
            }
        }
        $dom->save($path);
        header($returnToBackStore);
        exit();
    }
}
