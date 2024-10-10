// const cartIcon = document.querySelector(".cart-icon");
// const cartTab = document.createElement("div");
// cartTab.classList.add("cart-tab");
// document.body.appendChild(cartTab);
// let cartItems = [];
// let totalPrice = 0;
// const cartCountElement = document.querySelector(".cart-count");
// const cartContent = document.createElement("div");
// cartContent.classList.add("cart-content");
// cartTab.appendChild(cartContent);

// cartIcon.addEventListener("click", () => {
//   cartTab.classList.toggle("open");
//   displayCartItems();
// });

// const addToCartButtons = document.querySelectorAll(".add-button");
// addToCartButtons.forEach(button => {
//   button.addEventListener("click", (event) => {
//     const product = event.target.closest('li');
//     const productName = product.querySelector("h2").textContent;
//     const productPrice = parseFloat(product.querySelector("p").textContent.replace('Price: $', ''));
//     const productImageSrc = product.querySelector("img").src;

//     addToCart(productName, productPrice, productImageSrc);
//   });
// });

// function addToCart(name, price, imageSrc) {
//   const existingItem = cartItems.find(item => item.name === name);
//   if (existingItem) {
//     existingItem.quantity++;
//   } else {
//     cartItems.push({ name, price, imageSrc, quantity: 1 });
//   }
//   totalPrice += price;
//   updateCartCount();
//   displayCartItems();
// }

// function updateCartCount() {
//   cartCountElement.textContent = cartItems.reduce((total, item) => total + item.quantity, 0);
// }

// function displayCartItems() {
//   cartContent.innerHTML = "<h2>Your Cart</h2>";
//   if (cartItems.length === 0) {
//       cartTab.classList.remove("open");
//   } else {
//     cartItems.forEach((item, index) => {
//       const itemElement = document.createElement("div");
//       itemElement.classList.add("cart-item");

//       itemElement.innerHTML = `
//         <img src="${item.imageSrc}" alt="${item.name}" style="width: 50px; height: 50px; border-radius: 50px;">
//         <div>
//           <h3>${item.name}</h3>
//           <p>Price: $${item.price.toFixed(2)}</p>
//           <p>Quantity: ${item.quantity}</p>
//         </div>
//         <button class="remove-item" data-index="${index}">Remove</button>
//       `;

//       cartContent.appendChild(itemElement);
//     });

//     cartContent.innerHTML += `
//       <div class="cart-total">
//         <h3>Total: $${totalPrice.toFixed(2)}</h3>
//       </div>
//     `;

//     const removeButtons = document.querySelectorAll('.remove-item');
//     removeButtons.forEach(button => {
//       button.addEventListener('click', (event) => {
//         const index = event.target.getAttribute('data-index');
//         removeFromCart(index);
//       });
//     });
//   }
// }

// function removeFromCart(index) {
//   const item = cartItems[index];
//   totalPrice -= item.price * item.quantity;
//   cartItems.splice(index, 1);
//   updateCartCount();
//   displayCartItems();
// }

const products = [
  { name: "iPhone 12 Pro Max", price: 1280, imageSrc: "images/iphone12.jpg" },
  { name: "Cocktail", price: 18, imageSrc: "images/drink.jpg" },
  { name: "iPhone 16 Pro Max", price: 1180, imageSrc: "images/iphone12.jpg" },
  { name: "Jordan 21", price: 180, imageSrc: "images/shoe.jpeg" },
  { name: "Samsung Galaxy S21",price: 1880,imageSrc: "images/Samsung21.jpeg",},
  { name: "iPhone 12 Pro Max", price: 1280, imageSrc: "images/iphone12.jpg" },
  { name: "Cocktail", price: 18, imageSrc: "images/drink.jpg" },
  { name: "iPhone 16 Pro Max",price: 1180,imageSrc: "images/iphone12.jpg"
  },
  { name: "Jordan 21",price: 180, imageSrc: "images/shoe.jpeg" },
  {name: "Samsung Galaxy S21",price: 1880,imageSrc: "images/Samsung21.jpeg",},
];

const productList = document.getElementById("product-list");

// Function to generate product list items dynamically
function generateProductList() {
  products.forEach((product) => {
    const productItem = document.createElement("li");
    productItem.innerHTML = `
        <h2>${product.name}</h2>
        <img src="${product.imageSrc}" alt="${product.name}" class="image_style">
        <p>Price: $${product.price}</p>
        <div class="button-container">
          <button class="buy-button">Buy Now</button>
          <button class="add-button">Add to cart</button>
        </div>
      `;
    productList.appendChild(productItem);
  });

  // Add event listeners to dynamically created buttons
  const addToCartButtons = document.querySelectorAll(".add-button");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const productElement = event.target.closest("li");
      const productName = productElement.querySelector("h2").textContent;
      const product = products.find((p) => p.name === productName);

      addToCart(product.name, product.price, product.imageSrc);
    });
  });
}

generateProductList();

// Cart functionality
const cartIcon = document.querySelector(".cart-icon");
const cartTab = document.createElement("div");
cartTab.classList.add("cart-tab");
document.body.appendChild(cartTab);

let cartItems = [];
let totalPrice = 0;

const cartCountElement = document.querySelector(".cart-count");
const cartContent = document.createElement("div");
cartContent.classList.add("cart-content");
cartTab.appendChild(cartContent);

cartIcon.addEventListener("click", () => {
  cartTab.classList.toggle("open");
  displayCartItems();
});

function addToCart(name, price, imageSrc) {
  const existingItem = cartItems.find((item) => item.name === name);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.push({ name, price, imageSrc, quantity: 1 });
  }
  totalPrice += price;
  updateCartCount();
  displayCartItems();
}

function updateCartCount() {
  cartCountElement.textContent = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
}

function displayCartItems() {
  cartContent.innerHTML = "<h2>Your Cart</h2>";
  if (cartItems.length === 0) {
    cartTab.classList.remove("open");
  } else {
    cartItems.forEach((item, index) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("cart-item");

      itemElement.innerHTML = `
          <img src="${item.imageSrc}" alt="${
        item.name
      }" style="width: 50px; height: 50px; border-radius: 50px;">
          <div>
            <h3>${item.name}</h3>
            <p>Price: $${item.price.toFixed(2)}</p>
            <p>Quantity: ${item.quantity}</p>
          </div>
          <button class="remove-item" data-index="${index}">Remove</button>
        `;

      cartContent.appendChild(itemElement);
    });

    cartContent.innerHTML += `
        <div class="cart-total">
          <h3>Total: $${totalPrice.toFixed(2)}</h3>
        </div>
      `;

    const removeButtons = document.querySelectorAll(".remove-item");
    removeButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-index");
        removeFromCart(index);
      });
    });
  }
}

function removeFromCart(index) {
  const item = cartItems[index];
  totalPrice -= item.price * item.quantity;
  cartItems.splice(index, 1);
  updateCartCount();
  displayCartItems();
}
