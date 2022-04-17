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
    } else if ($operationType == "addoption") {
        $dom = new DOMDocument();
        $dom->load($path);
        $root = $dom->documentElement;
        $products = $root->getElementsByTagName('product');

        $id = $_POST["id"];

        $labels = [];

        foreach ($products as $product) {
            if ($product->getElementsByTagName("id")->item(0)->nodeValue == $id) {
                while ($product->getElementsByTagName("options")->length > 0) {
                    $options = $product->getElementsByTagName("options")->item(0);
                    $label = $options->getElementsByTagName("label")->item(0)->nodeValue;
                    array_push($labels, $label);

                    $optionList = $options->getElementsByTagName("option");
                    $product = $optionList->item(0);
                }
            }
        }

        foreach ($products as $product) {
            if ($product->getElementsByTagName("id")->item(0)->nodeValue == $id) {
                for ($i = 0; $i < count($labels); $i++) {
                    if ($product->getElementsByTagName("options")->length > 0) {
                        $options = $product->getElementsByTagName("options")->item(0);
                        $label = $options->getElementsByTagName("label")->item(0);
                        if ($label->nodeValue != $labels[$i]) {
                            echo "We have a problem";
                            return;
                        }
                        $optionList = $options->getElementsByTagName("option");
                        $optionExist = false;
                        foreach ($optionList as $option) {
                            $description = $option->getElementsByTagName("description")->item(0);
                            if ($description->nodeValue == $_POST[$labels[$i]]) {
                                $product = $option;
                                $optionExist = true;
                                break;
                            }
                        }
                        if (!$optionExist) {
                            $option = new DOMElement("option");
                            $options->appendChild($option);
                            $description = new DOMElement("description", $_POST[$labels[$i]]);
                            $option->appendChild($description);
                            $product = $option;
                        }
                    } else {
                        $options =  new DOMElement("options");
                        $product->appendChild($options);
                        $label = new DOMElement("label", $labels[$i]);
                        $options->appendChild($label);
                        $option = new DOMElement("option");
                        $options->appendChild($option);
                        $description = new DOMElement("description", $_POST[$labels[$i]]);
                        $option->appendChild($description);
                        $product = $option;
                    }
                }
                if ($product->getElementsByTagName("price")->length > 0 || $product->getElementsByTagName("image")->length > 0) {
                    break;
                }
                $product->appendChild(new DOMElement("price", $_POST["price"]));
                $product->appendChild(new DOMElement("image", $_POST["image"]));
                break;
            }
        }
        $dom->save($path);
        header($returnToBackStore);
        exit();
    } else if ($operationType == "cancel") {
        header($returnToBackStore);
        exit();
    } else {
        echo "We have a problem";
    }
}
