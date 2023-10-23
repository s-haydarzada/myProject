window.addEventListener("DOMContentLoaded", function () {

  const showProduct = document.querySelector(".show_product");
  const stockInCheckbox = document.querySelector("#stock-in");
  const stockOutCheckbox = document.querySelector("#stock-out");
  const minPriceInput = document.querySelector("#min-price");
  const maxPriceInput = document.querySelector("#max-price");
  const brandCheckboxes = document.querySelectorAll(".types_list.brand-checkbox input");
  const typeCheckboxes = document.querySelectorAll(".type-checkbox");
  const colorCheckboxes = document.querySelectorAll(".color-checkbox input");
  const sizeCheckboxes = document.querySelectorAll(".types_list.size-checkbox input");

  const fetchAndRenderProducts = () => {
    showProduct.innerHTML = "";
   
    fetch("db.json")
      .then((res) => res.json())
      .then((data) => {
        

          data.products.forEach((item) => {
          const stockIn = stockInCheckbox.checked;
          const stockOut = stockOutCheckbox.checked;
          const minPrice = parseFloat(minPriceInput.value);
          const maxPrice = parseFloat(maxPriceInput.value);
          const selectedTypes = Array.from(typeCheckboxes)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.value);
          const selectedBrands = Array.from(brandCheckboxes)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.value);
          const selectedColors = Array.from(colorCheckboxes)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.value);
          const selectedSizes = Array.from(sizeCheckboxes)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.value);

          let sizeOptions = item.options.size
            .map((size) => `<option value="${size}">${size}</option>`)
            .join("");
          let colorOptions = item.options.color
            .map((color) => `<option value="${color}">${color}</option>`)
            .join("");

          if (
            (!stockIn || item.inStock) &&
            (!stockOut || !item.inStock) &&
            (!minPrice || item.price >= minPrice) &&
            (!maxPrice || item.price <= maxPrice) &&
            (selectedTypes.length === 0 || selectedTypes.includes(item.category)) &&
            (selectedColors.length === 0 ||
              selectedColors.some((color) =>
                item.options.color.includes(color)
              )) &&
            (selectedSizes.length === 0 ||
              selectedSizes.some((size) => item.options.size.includes(size))) &&
            (selectedBrands.length === 0 || selectedBrands.includes(item.brand))
          ) {



            const html = `
                      <div class="product_cart swiper-slide">
                          <h2 class="prod_title">${item.title}</h2>
                          <p>Type: ${item.brand}</p>
                          <div class="product_cart_image">
                              <img src="${item.img}" class="prod_img" alt="" />
                          </div>
                          <div class="follow">
                              <i class="fa-regular fa-heart follows"></i>
                              <i class="fa-regular fa-eye follows"></i>
                              <i class="fa-solid fa-code-compare"></i>
                          </div>
                          <div class="choose_color">
                              <h4>Size:</h4>
                              <select name="" id="size-filter">
                                  ${sizeOptions}
                              </select>
                              <h4>Color:</h4>
                              <select name="" id="color-filter">
                                  ${colorOptions}
                              </select>
                          </div>
                          <div class="price_buy">
                              <div class="prices">
                                  <b>${item.price}<span>USD</span></b>
                                  <s>${item.oldPrice}<span>USD</span></s>
                              </div>
                              <div class="add_cart_btn">
                                  ${item.inStock ?
                `<button class="add_btn">Add to Cart</button>` :
                `<button class="add_btn desable" disabled>Out of Stock</button>`
              }
                              </div>
                          </div>
                      </div>
                  `;
                  

            showProduct.innerHTML += html;
          }
        });

      });


  };


  function setupEventListeners() {
    stockInCheckbox.addEventListener("change", fetchAndRenderProducts);
    stockOutCheckbox.addEventListener("change", fetchAndRenderProducts);
    minPriceInput.addEventListener("input", fetchAndRenderProducts);
    maxPriceInput.addEventListener("input", fetchAndRenderProducts);
    typeCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", fetchAndRenderProducts);
    });
    brandCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", fetchAndRenderProducts);
    });
    colorCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", fetchAndRenderProducts);
    });

    sizeCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", fetchAndRenderProducts);
    });
  }



  setupEventListeners();
  fetchAndRenderProducts();
})