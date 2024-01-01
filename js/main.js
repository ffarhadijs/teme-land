// change gallery image in product page
function changeGalleryImg(item) {
  const mainImg = document.getElementById("main-gallery-img");
  mainImg.src = item.src;
}

function decreaseNumber() {
  var productCountInput = document.getElementById("product-count");
  var currentQuantity = parseInt(productCountInput.value);
  if (currentQuantity > 1) {
    productCountInput.value = currentQuantity - 1;
  }
}

// Function to increase the product quantity
function increaseNumber() {
  var productCountInput = document.getElementById("product-count");
  var currentQuantity = parseInt(productCountInput.value);
  productCountInput.value = currentQuantity + 1;
}

// Function to update the product quantity
function updateNumber(value) {
  var productCountInput = document.getElementById("product-count");
  var newQuantity = parseInt(value);
  productCountInput.value = newQuantity;

  var productName = document.getElementById("product-name").textContent;

  var cartItem = findExistingCartItem(productName);
  if (cartItem) {
    cartItem.quantity = newQuantity;
    updateCartItem(cartItem);
  }
}

function updateCartItem(existingItem) {
  const productSize = document.getElementById("product-size").value;
  const productColor = document.getElementById("product-color").value;
  var listItem = existingItem.element;
  var quantity = existingItem.quantity;
  listItem.querySelector("span").innerHTML = `
  <div id="product-item-title-sdebar">${listItem.dataset.productName}</div>
  <div id='product-item-price-sidebar'>قیمت:${listItem.dataset.productPrice}تومان - تعداد: ${quantity}</div>
  <div id='product-item-details-sidebar'>سایز:${productSize}-رنگ:${productColor}</div>
  `;
}
// Function to handle adding an item to the cart from the product page
function addToCartProductPage() {
  var productName = document.getElementById("product-name").textContent;
  var productPrice = document
    .getElementById("product-price")
    .textContent.replace("تومان", "");

  var productQuantity = parseInt(
    document.getElementById("product-count").value
  );
  const productImg = document.getElementById("main-gallery-img");
  const productSize = document.getElementById("product-size").value;
  const productColor = document.getElementById("product-color").value;
  var cartItemsContainer = document.getElementById("cart-items");

  var existingItem = findExistingCartItem(productName);

  if (existingItem) {
    existingItem.quantity = productQuantity;
    existingItem.productColor = productColor;
    existingItem.productSize = productSize;
    updateCartItem(existingItem);

  } else {
    var listItem = createCartItem(
      productName,
      productPrice,
      productQuantity,
      productImg,
      productSize,
      productColor
    );
    cartItemsContainer.appendChild(listItem);
  }

  updateTotalPrice();
}

// Function to find an existing cart item by product name
function findExistingCartItem(productName) {
  var cartItems = document.getElementById("cart-items").children;
  for (var i = 0; i < cartItems.length; i++) {
    var item = cartItems[i];
    if (item.dataset.productName === productName) {
      return {
        element: item,
        quantity: parseInt(item.dataset.quantity),
        productColor: item.dataset.productColor,
        productSize: item.dataset.productSize,
      };
    }
  }
  return null;
}

// Function to create a new cart item
function createCartItem(
  productName,
  productPrice,
  quantity,
  productImg,
  productSize,
  productColor
) {
  var listItem = document.createElement("li");

  listItem.dataset.productName = productName;
  listItem.dataset.productPrice = productPrice;
  listItem.dataset.quantity = quantity;
  listItem.dataset.productImg = productImg.src;
  listItem.dataset.productColor = productColor;
  listItem.dataset.productSize = productSize;

  const productImage = document.createElement("img");
  productImage.src = productImg.src;
  var productDetails = document.createElement("span");
  productDetails.id = "item-details-sidebar"; // Set the ID here

  productDetails.innerHTML = `
  <div id="product-item-title-sdebar">${productName}</div>
  <div id='product-item-price-sidebar'>قیمت:${productPrice}تومان - تعداد: ${quantity}</div>
  <div id='product-item-details-sidebar'>سایز:${productSize}-رنگ:${productColor}</div>
  `;

  var removeButton = document.createElement("button");
  removeButton.innerHTML = "<img src='../assets/icons/cross.png'/>";
  removeButton.id = "remove-btn";
  removeButton.onclick = function () {
    listItem.parentElement.removeChild(listItem);
    updateTotalPrice();
  };

  listItem.appendChild(productImage);
  listItem.appendChild(productDetails);
  listItem.appendChild(removeButton);

  return listItem;
}

// Function to update the total price
function updateTotalPrice() {
  var cartItems = document
    .getElementById("cart-items")
    .getElementsByTagName("li");
  var totalPrice = 0;

  var productDetails = document.getElementById("product-item-price-sidebar");

  var quantityMatch = productDetails?.textContent?.match(/تعداد: (\d+)/);

  var quantityValue = quantityMatch ? parseInt(quantityMatch[1]) : 0;
  for (var i = 0; i < cartItems.length; i++) {
    var listItem = cartItems[i];
    var productPriceNumber = parseFloat(
      listItem.dataset.productPrice.replace(/\./g, "").replace(",", ".")
    );

    var quantity = quantityValue;
    totalPrice += productPriceNumber * quantity;
  }
  document.getElementById("total-price").textContent = `قیمت کل: ${
    totalPrice == 0 ? totalPrice : totalPrice.toLocaleString("en-US")
  } تومان`;
}
