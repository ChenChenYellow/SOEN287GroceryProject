// readmorebutton
const readMoreBtn = document.querySelector('.read-more-btn');
const text = document.querySelector('.text');
readMoreBtn.addEventListener("click",(e)=>{
    text.classList.toggle('show-more');
    if(readMoreBtn.innerText === 'More information'){
        readMoreBtn.innerText ='Read Less';
    }
    else{
        readMoreBtn.innerText ='More information';
    }
})
//quantity modifier

var data=0;
document.getElementById("quantity").innertext=data;

function decrement(){
    data=data-1;
    document.getElementById("quantity").innerText=data;
  
}
function increment(){
    data=data+1;
    document.getElementById("quantity").innerText=data;
}

//save value on refresh
let quantity= document.getElementById("quantity");
if (sessionStorage.getItem("autosave")){
    quantity.value=sessionStorage.getItem("autosave");
}

quantity.value=localStorage.getItem("value");
modvalue.addEventListener("keyup",(e)=> {
    localStorage.setItem("value",modvalue.value);
})

//addcart
function addedtocart(){
    alert("added to cart")
}