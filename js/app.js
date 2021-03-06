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
    // shortenedProduct title
    const titleBr = ` 
      <h3 class="fs-4 fw-bold" title="${product.title}">
        ${product.title} <br><br>
      </h3>
    `;
    const titleNoBr = ` 
        <h3 class="fs-4 fw-bold" title="${product.title}">${product.title.slice(
      0,
      28
    )} ...
        </h3>
      `;
    const titleDisplay = product.title.length > 25 ? titleNoBr : titleBr;
    //adding dynamic div
    div.classList.add("col");
    div.innerHTML = `
    <div class="card d-flex align-items-center justify-content-center text-center single-product">
      <div class="product-image mt-4">
        <img src=${product.image} alt="">
      </div>
      <div class="card-body">
        ${titleDisplay}
        <p class="card-text mb-2">Category: ${product.category}</p>
        <h2 class="card-title fs-4 fw-bold ">Price: $ ${product.price}</h2>
        <span>Average Ratings: <strong>${product.rating.rate}</strong> <br/>Total Reviews: <strong>${product.rating.count}</strong></span>
        <div class="d-flex justify-content-center my-2">
          <button onclick="addToCart(${product.price})" id="addToCart-btn"
        class="buy-now btn btn-dark mx-1">Add to Cart</button>
          <button id="details-btn" class="btn btn-warning text-white mx-1">Details</button>
        </div>
      </div>
    </div>`;
    //appending dynamic div
    document.getElementById("all-products").appendChild(div);
  });
};

//updating tax an charge
let count = 0;
const addToCart = (price) => {
  count += 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  document.getElementById("total-products").innerText = count;
  updateTotal();
};
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// ui price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText =
    total % 1 == 0 ? total : parseFloat(total).toFixed(2);
};

// set innerText function
const setCartInnerText = (id, value) => {
  document.getElementById(id).innerText =
    value % 1 == 0 ? value : parseFloat(value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setCartInnerText("delivery-charge", 30);
    setCartInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setCartInnerText("delivery-charge", 50);
    setCartInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setCartInnerText("delivery-charge", 60);
    setCartInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") +
    getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText =
    grandTotal % 1 == 0 ? grandTotal : parseFloat(grandTotal).toFixed(2);
};
