
var itemList = document.getElementsByClassName("itemList")[0].getElementsByClassName("itemControls")
var summaryPriceList = document.getElementsByClassName("inSummaryPrices")[0]
var summaryQtyList = document.getElementsByClassName("inSummaryItems")[0].getElementsByClassName("individualQty")

var sum = 0

function newTotal() {
    sum = 0
    for(var i = 0; i < itemList.length; i++) {
        var itemPrice = parseFloat(itemList[i].getElementsByClassName("itemCost")[0].innerHTML.replace("$","").replace("/ea", ""))
        var itemQty = parseFloat(itemList[i].getElementsByClassName("quantity")[0].getElementsByClassName("qtyValue")[0].value)
    
        summaryQtyList[i].innerHTML = itemQty + "x"

        sum += itemPrice * itemQty 
    }

    var subtotalString = "$" + sum.toFixed(2)

    var gst = sum * 0.05
    var qst = sum* 0.09975
    sum += gst + qst

    var qstString = "$" + qst.toFixed(2)
    var gstString = "$" + gst.toFixed(2)
    var sumString = "$" + sum.toFixed(2)

    summaryPriceList.getElementsByClassName("subtotal")[0].innerHTML = subtotalString
    summaryPriceList.getElementsByClassName("qst")[0].innerHTML = qstString
    summaryPriceList.getElementsByClassName("gst")[0].innerHTML = gstString
    summaryPriceList.getElementsByClassName("totalPrice")[0].innerHTML = sumString
}



