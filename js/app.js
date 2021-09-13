// fetching products data
const loadProducts = () => {
  const url = `https://raw.githubusercontent.com/ProgrammingHero1/ranga-store-api/main/ranga-api.json`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayProducts(data));
};
//calling fetched products data
loadProducts();

// showing products in UI
const displayProducts = (products) => {
  // accessing products
  products.forEach((product) => {
    const div = document.createElement("div");
    // shortenedProduct title with ternary
    const titleShort =
      product.title.length > 22
        ? `${product.title.slice(0, 22)} ...`
        : product.title;
    //adding dynamic div
    div.classList.add("col");
    div.innerHTML = `<div class="card d-flex align-items-center justify-content-center text-center single-product">
    <img src=${product.image} class="product-image mt-4" alt="" >
    <div class="card-body">
      <h3 ${
        titleShort
          ? `title="${product.title}">${titleShort}</h3>`
          : `>${product.title}</h3>`
      }
      <p class="card-text">Category: ${product.category}</p>
      <h2 class="card-title">Price: $ ${product.price}</h2>
      <span>Reviews: <strong>${
        product.rating.count
      }</strong> • avg. ratings: <strong>${product.rating.rate}</strong></span>
      <div id="buttons-cart">
      <button onclick="addToCart(${product.price})" id="addToCart-btn"
        class="buy-now btn btn-dark">Add to Cart</button>
      <button id="details-btn" class="btn btn-warning text-white">Details</button>
      </div>
    </div>
</div>`;
    //appending dynamic div
    document.getElementById("all-products").appendChild(div);
  });
};

//updating
let count = 0;
const addToCart = (price) => {
  count += 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") +
    getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
