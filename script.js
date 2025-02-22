const products = [
  { name: "Pit Bull", price: 128, imageSrc: "images/dog1.webp" },
  { name: "Oregon", price: 108, imageSrc: "images/dog2.webp" },
  { name: "Pug", price: 110, imageSrc: "images/dog3.jpg" },
  { name: "Great Dane", price: 180, imageSrc: "images/dog4.webp" },
  { name: "German Shepherd", price: 180, imageSrc: "images/dog5.jpg" },
  { name: "Labrador Retriever", price: 150, imageSrc: "images/dog6.jpg" },
  { name: "Beagle", price: 140, imageSrc: "images/dog7.webp" },
  { name: "Golden Retriever", price: 170, imageSrc: "images/dog8.webp" },
  { name: "Rottweiler", price: 190, imageSrc: "images/dog9.jpg" },
  { name: "Husky", price: 130, imageSrc: "images/dog10.jpg" },
];

const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search-input");
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

function generateProductList(filteredProducts = products) {
  productList.innerHTML = "";

  filteredProducts.forEach((product) => {
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

  const addToCartButtons = document.querySelectorAll(".add-button");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const productElement = event.target.closest("li");
      const productName = productElement.querySelector("h2").textContent;
      const product = products.find((p) => p.name === productName);

      addToCart(product.name, product.price, product.imageSrc);
      showCustomAlert(`${product.name} has been added to the cart!`);
    });
  });
}

generateProductList();

searchInput.addEventListener("input", (event) => {
  const query = event.target.value.toLowerCase();
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query)
  );
  generateProductList(filteredProducts);
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

function showCustomAlert(message) {
  const alertContainer = document.createElement("div");
  alertContainer.classList.add("custom-alert");
  alertContainer.innerHTML = `
      <div class="alert-box">
        <p>${message}</p>
      </div>
    `;
  document.body.appendChild(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 1500);
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
            <div class="quantity-container">
              <button class="decrease-quantity" data-index="${index}">-</button>
              <span class="quantity">${item.quantity}</span>
              <button class="increase-quantity" data-index="${index}">+</button>
            </div>
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
        showRemoveConfirmation(index);
      });
    });

    const decreaseButtons = document.querySelectorAll(".decrease-quantity");
    decreaseButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-index");
        changeQuantity(index, -1);
      });
    });

    const increaseButtons = document.querySelectorAll(".increase-quantity");
    increaseButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-index");
        changeQuantity(index, 1);
      });
    });
  }
}

function showRemoveConfirmation(index) {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
      <div class="modal-content" style="width : 500px">
          <h3>Are you sure you want to remove this item from your cart?</h3>
          <button id="confirm-remove">Yes</button>
          <button id="cancel-remove">No</button>
      </div>
    `;
  document.body.appendChild(modal);

  document.getElementById("confirm-remove").addEventListener("click", () => {
    removeFromCart(index);
    modal.remove();
  });

  document.getElementById("cancel-remove").addEventListener("click", () => {
    modal.remove();
  });
}

function removeFromCart(index) {
  const item = cartItems[index];
  totalPrice -= item.price * item.quantity;
  cartItems.splice(index, 1);
  updateCartCount();
  displayCartItems();
}

function changeQuantity(index, delta) {
  const item = cartItems[index];
  if (item.quantity + delta > 0) {
    item.quantity += delta;
    totalPrice += delta * item.price;
    updateCartCount();
    displayCartItems();
  }
}
