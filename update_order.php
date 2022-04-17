<?php
if (isset($_POST["operationtype"])) {
    $operationType = $_POST["operationtype"];
    $path = "./Data/Orders.xml";
    $returnToBackStore = "Location: ./manage_orders.html";
    if ($operationType == "update") {

        $dom = new DOMDocument();
        $dom->load($path);
        $root = $dom->documentElement;
        $orders = $root->getElementsByTagName('order');

        $id = $_POST["id"];
        $userID = $_POST["userid"];
        $numberOfItem = $_POST["numberofitem"];

        foreach ($orders as $order) {
            if ($order->getElementsByTagName('id')->item(0)->nodeValue == $id) {
                $order->getElementsByTagName("userid")->item(0)->nodeValue = $userID;
                $items = $order->getElementsByTagName("items")->item(0);
                $itemList = $order->getElementsByTagName("item");
                for ($i = 1; $i <= $numberOfItem; $i++) {
                    if ($i <= $itemList->length) {
                        $item = $itemList->item($i - 1);
                        $id = $item->getElementsByTagName("id")->item(0);
                        $id->nodeValue = $_POST["productid" . $i];
                        $quantity = $item->getElementsByTagName("quantity")->item(0);
                        $quantity->nodeValue = $_POST["quantity" . $i];
                    } else {
                        $item = new DOMElement("item");
                        $items->appendChild($item);
                        $item->appendChild(new DOMElement("id", $_POST["productid" . $i]));
                        $item->appendChild(new DOMElement("quantity", $_POST["quantity" . $i]));
                    }
                }
                break;
            }
        }
        $dom->save($path);
        header($returnToBackStore);
        exit();
    } else if ($operationType == "delete") {
        $dom = new DOMDocument();
        $dom->load($path);
        $root = $dom->documentElement;
        $orders = $root->getElementsByTagName('order');

        $id = $_POST["id"];

        $orderToDelete = new DOMElement("null");

        foreach ($orders as $order) {
            if ($order->getElementsByTagName('id')->item(0)->nodeValue == $id) {
                $orderToDelete  =$order;
                break;
            }
        }

        $orderToDelete->parentNode->removeChild($orderToDelete);
        
        $dom->save($path);
        header($returnToBackStore);
        exit();
    } else if ($operationType == "add") {
        $dom = new DOMDocument();
        $dom->load($path);
        $root = $dom->documentElement;

        $id = $_POST["id"];
        $userID = $_POST["userid"];
        $numberOfItem = $_POST["numberofitem"];

        $order = new DOMElement("order");
        $root->appendChild($order);

        $order->appendChild(new DOMElement("id", $id));
        $order->appendChild(new DOMElement("userid", $userID));

        $items = new DOMElement("items");
        $order->appendChild($items);

        for ($i = 1; $i <= $numberOfItem; $i++) {
            $item = new DOMElement("item");
            $items->appendChild($item);
            $item->appendChild(new DOMElement("id", $_POST["productid" . $i]));
            $item->appendChild(new DOMElement("quantity", $_POST["quantity" . $i]));
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
