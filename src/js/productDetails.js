
window.addEventListener("DOMContentLoaded", function () {

  var header = document.querySelector(".header_top");
  var initialOffset = header.offsetTop;
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > initialOffset + 30) {
      header.style.position = "fixed";
      header.style.top = "0";
      header.style.width = "100%";
      header.style.zIndex = "100";
    } else {
      header.style.position = "relative";
    }
  });

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  console.log(productId)



  if (productId !== null) {
    fetch("db.json")
      .then(res => res.json())
      .then(data => {
        const selectedProduct = data.products.find(product => product.id === parseInt(productId));
        console.log(selectedProduct.options.color);

        if (selectedProduct) {
          const {
            title,
            category,
            img,
            brand,
            price,
            oldPrice,
            description
        } = selectedProduct;
        
        document.getElementById("product_type").textContent = brand;
        document.getElementById("description").textContent = description;
        document.getElementById("product-title").textContent = title;
        document.getElementById("product-category").textContent = category;
        document.getElementById("product-image").src = img;
        document.getElementById("product-price").innerHTML = `${price.toFixed(2)}<span>USD</span>`;
        document.getElementById("product-old_price").innerHTML = `${oldPrice.toFixed(2)}<span>USD</span>`;
       
        const colorOptions = selectedProduct.options.color;
        const selectColor = document.getElementById("select_color");
        colorOptions.forEach(color => {
          const option = document.createElement("option");
          option.value = color;
          option.textContent = color;
          selectColor.appendChild(option);
      });
      
      
      
      
      
      

        } else {
          console.error("Ürün bulunamadı veya geçersiz ID.");
        }
      })
     
  } else {
    console.error("Ürün ID'si belirtilmemiş.");
  }

});
