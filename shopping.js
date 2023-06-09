// cart open and close
const cartIcon = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart');
const closeCart = document.querySelector('#close-cart');
// open cart
cartIcon.onclick = () =>{
    cart.classList.add('active')
}
// close cart
closeCart.onclick = () =>{
    cart.classList.remove('active')
}
// making add to cart
// cart working js
if(document.readyState=='loading'){
    document.addEventListener("DOMContentLoaded",ready);
}else{
    ready();
}
// making function
function ready() {
    // remove item from cart
    const removeCartButton = document.getElementsByClassName("cart-remove")
    for(var i = 0;i<removeCartButton.length;i++){
        var button = removeCartButton[i];
        button.addEventListener('click',removeCartItem)
    }
    // quantitychange
    const quantityInputs = document.getElementsByClassName("cart-quantity")
    for(var i = 0;i<quantityInputs.length;i++){
        var input = quantityInputs[i];
        input.addEventListener('change',quantityChange)
    }
    // add cart
    const addCart = document.getElementsByClassName("add-cart")
    for(var i = 0;i<addCart.length;i++){
        var button = addCart[i];
        button.addEventListener('click',addCartClicked)
    }
    loadCartItems();
}
// removeCartItem
function removeCartItem (event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
    cartItemSave();
}
// quantityChane
function quantityChange (event){
    var input = event.target;
    if(isNaN(input.value)||input.value<= 0) {
        input.value = 1;
    }
    updateTotal();
    cartItemSave();
    updateCartIcon();
}
// add cart function
function addCartClicked(event){
    var button = event.target;
    var shopProduct = button.parentElement;
    var title = shopProduct.getElementsByClassName('product-title')[0].innerText;
    var price = shopProduct.getElementsByClassName('price')[0].innerText;
    var productImg = shopProduct.getElementsByClassName('product-img')[0].src;
    addProductToCart(title,price,productImg);
    updateTotal();
    cartItemSave();
    updateCartIcon();
}
function addProductToCart(title,price,productImg){
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemNames =cartItems.getElementsByClassName('cart-product-title');
    for(var i=0;i<cartItemNames.length;i++){
        if(cartItemNames[i].innerText == title){
            alert('You have already added ths item to cart');
            return;
        }
    }
    var cartBoxContent =`<img src="${productImg}" alt="" class="cart-img">
    <div class="detial-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" name="" id="" value="1" class="cart-quantity">
    </div>
    <i class="fa-solid fa-trash cart-remove"></i></i>`;
    cartShopBox.innerHTML=cartBoxContent;
    cartItems.append(cartShopBox);
    
    cartShopBox.getElementsByClassName('cart-remove')[0]
    .addEventListener('click',removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0]
    .addEventListener('change',quantityChange);
    cartItemSave();
    updateCartIcon();
}

// update total
function updateTotal() {
    var cartContents = document.getElementsByClassName('cart-content')[0];
    var cartBoxes =cartContents.getElementsByClassName('cart-box');
    var total = 0;
    for(i=0;i<cartBoxes.length;i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElemente = cartBox.getElementsByClassName('cart-quantity')[0];
        var price =parseFloat(priceElement.innerText.replace("$",""));
        var quantity = quantityElemente.value;
        total +=price * quantity;
    }
    // if price contain some cents
    total=Math.round(total * 100) / 100;
    document.getElementsByClassName('total-price')[0].innerText ="$" + total;

    // Save total to localstorage
    localStorage.setItem('cartTotal',total)
}
// keep item in cart when page refresh with local storage
function cartItemSave(){
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var cartItems = [];

    for(var i=0;i<cartBoxes.length;i++){
        var cartBox = cartBoxes[i];
        var titleElement = cartBox.getElementsByClassName('cart-product-title')[0];
        var priceElement = cart.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var productImgElement = cartBox.getElementsByClassName('cart-img')[0].src;

        var item ={
            title:titleElement.innerText,
            price:priceElement.innerText,
            quantity:quantityElement.value,
            productImg:productImgElement,
        }
        cartItems.push(item);

    }
    localStorage.setItem('cartItems',JSON.stringify(cartItems));
}
// load in cart
function loadCartItems(){
   var cartItems =localStorage.getItem("cartItems");
   if(cartItems){
    cartItems = JSON.parse(cartItems);

    for(var i=0;i<cartItems.length;i++){
        var item = cartItems[i];
        addProductToCart(item.title,item.price,item.productImg)

        var cartBoxes = document.getElementsByClassName('cart-box');
        var cartBox = cartBoxes[cartBoxes.length-1];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        quantityElement.value = item.quantity;
    }
   }
   var cartTotal = localStorage.getItem('cartTotal')
   if(cartTotal){
    document.getElementsByClassName('total-price')[0].innerText ='$'+cartTotal;
   }
    updateCartIcon();
}
// quantity in cart icon
function updateCartIcon () {
    var cartBoxes = document.getElementsByClassName('cart-box');
    quantity = 0;


    for (i=0;i<cartBoxes.length;i++){
        var cartBox = cartBoxes[i];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        quantity +=parseInt(quantityElement.value);
    }
    var cartIcon =document.querySelector('#cart-icon');
    cartIcon.setAttribute('data-quantity',quantity)
}