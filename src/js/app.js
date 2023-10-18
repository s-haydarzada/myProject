window.addEventListener("DOMContentLoaded", function () {

    var header = document.querySelector(".header_top");
    var initialOffset = header.offsetTop;
    window.addEventListener("scroll", function () {
        if (window.pageYOffset > initialOffset + 30) {
            header.style.position = "fixed";
            header.style.top = "0";
            header.style.width = "100%";
            header.style.zIndex = "100"
        } else {
            header.style.position = "relative";
        }
    });


    let productContainer = document.querySelector(".products_container");
    let rightContainer = document.querySelector(".right_container");
    const filterBtns = document.querySelectorAll(".btns_item");
    const basketCount = document.querySelector(".count")

    let cartIcon = document.querySelector(".shopping_cart");
    let hiddenCart = document.querySelector(".hidden_cart");
    let close_cart = document.querySelector("#cart_close");

    cartIcon.addEventListener("click", () => {
        hiddenCart.classList.add("active");
    })

    close_cart.addEventListener("click", () => {
        hiddenCart.classList.remove("active");
    })

    // 1.Show Products

    fetch("db.json")
        .then(res => res.json())
        .then(data => {

            data.products.forEach((item) => {

                const html = `
                    <div class="product_cart swiper-slide">
                    <h2 class="prod_title">${item.title}</h2>
                    <p>Type:Electrobot</p>
                    <div class="product_cart_image">
                        <img src="${item.img}" alt="" class="prod_img">
                    </div>
                    <div class="follow">
                    <i class="fa-regular fa-heart follows"></i>
                    <i class="fa-regular fa-eye follows"></i>
                    <i class="fa-solid fa-code-compare"></i>
                </div>
                    <div class="choose_color">
                        <h4>color:</h4>
                        <select name="" id="">
                            <option value="">White</option>
                            <option value="">Black</option>
                        </select>
                    </div>
                    <div class="price_buy">
                        <div class="prices">
                            <b>${item.price}<span>USD</span></b>
                            <s>${item.oldPrice}<span>USD</span></s>
                        </div>
                        <div class="add_cart_btn">
                          ${item.inStock ?
                        `<button class="added_btn">Add to Cart</button>` :
                        `<button class="added_btn desable" disabled>Out of Stock</button>`
                    }
                        </div>
                    </div>
                </div>               `

                productContainer.innerHTML += html;

                if (document.readyState === "loading") {
                    document.addEventListener("DOMContentLoaded", start)
                } else {
                    start();
                }

                // ===============START======================
                function start() {
                    addEvents();
                    update()
                }


                // ===============UPDATE======================

                function update() {
                    addEvents();
                    updateTotal();
                }

                function updateCartCount(count) {
                    const cartCountElement = document.querySelector(".count");
                    if (cartCountElement) {
                        cartCountElement.textContent = count;
                    }
                }



                // ===============ADD EVENTS======================
                function addEvents() {

                    let removeItem_btns = document.querySelectorAll(".cart_remove");

                    removeItem_btns.forEach(btn => {
                        btn.addEventListener("click", handle_removeCartItem)
                    })

                    let quantity_inputs = document.querySelectorAll(".cart_quantity");
                    quantity_inputs.forEach(input => {
                        input.addEventListener("change", handle_changeItemQuantity)
                    })

                    let addCartBtns = document.querySelectorAll(".added_btn");
                    addCartBtns.forEach(btn => {
                        btn.addEventListener("click", handle_addCartItem)

                    })

                }


                let addItems = [];
                function handle_addCartItem() {

                    let product = this.closest('.product_cart');
                    let title = product.querySelector(".prod_title").textContent;
                    let price = product.querySelector(".prices b").textContent;
                    let imgSrc = product.querySelector('.prod_img').getAttribute('src');
                    // console.log(product,title,price,imgSrc)

                    let newToAdd = {
                        title,
                        price,
                        imgSrc
                    }

                    if (addItems.find((el) => el.title == newToAdd.title)) {
                        alert("already add");
                        return;
                    } else {
                        addItems.push(newToAdd)
                    }

                    localStorage.setItem("basket", JSON.stringify(addItems))

                    let cartBoxElement = CartBoxComponent(title, price, imgSrc);
                    let newNode = document.createElement("div");
                    newNode.innerHTML = cartBoxElement;
                    const cartContent = hiddenCart.querySelector(".cart_content");
                    cartContent.appendChild(newNode);

                    updateCartCount(addItems.length);
                    update();

                }

                function handle_changeItemQuantity() {
                    if (isNaN(this.value) || this.value < 1) {
                        this.value = 1;
                        const productCard = this.closest('.cart_box');
                        if (productCard) {
                            productCard.remove();
                            update();
                        }
                    } else {
                        this.value = Math.floor(this.value);
                        update();
                    }

                }

                // ===============HANDLE EVENTS======================
                function handle_removeCartItem() {
                    this.parentElement.remove();
                    updateCartCount(addItems.length);
                    update();
                }

                function updateTotal() {
                    let cartBoxes = document.querySelectorAll(".cart_box")
                    let totalElement = hiddenCart.querySelector(".total_price");

                    let total = 0;
                    cartBoxes.forEach(cartBox => {
                        let priceElement = cartBox.querySelector(".cart_price");
                        let price = parseFloat(priceElement.innerHTML.replace("$", ""));
                        let quantity = cartBox.querySelector(".cart_quantity").value;
                        total += price * quantity;
                    })

                    total = total.toFixed(2)
                    totalElement.innerHTML = "$" + total;
                }



                function CartBoxComponent(title, price, imgSrc) {
                    return `
                    <div class="cart_box">
                    <img src=${imgSrc} alt="" class="img_cart">
                    <div class="detail_box">
                      <p class="cart_product_title">${title}</p>
                      <b class="cart_price">${price}</b>
                      <input type="number" value="1" class="cart_quantity">
                    </div>
                    <i class="fa-regular fa-trash-can cart_remove"></i>
                  </div>
                    `
                }

                const countDownDate = new Date("september 30, 2024 21:00:00").getTime();
                const result = setInterval(function () {
                    const now = new Date().getTime();
                    const distance = countDownDate - now;

                    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

                    if (distance <= 0) {
                        clearInterval(result);
                        document.querySelector(".time").innerHTML = "EXPIRED";
                    } else {
                        if (seconds === 0 && minutes > 0) {
                            minutes -= 1;
                            seconds = 59;
                        } else if (seconds < 0) {
                            seconds = 0;
                        }

                        document.querySelector(".day").innerHTML = days + "d";
                        document.querySelector(".hour").innerHTML = hours + "h";
                        document.querySelector(".minute").innerHTML = minutes + "m";
                        document.querySelector(".second").innerHTML = seconds + "s";
                    }
                }, 1000);

            })


            var swiper = new Swiper(".mySwiper", {
                slidesPerView: 4,
                spaceBetween: 30,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
            });

            var myswiper = new Swiper(".mySwiper", {
                watchSlidesProgress: true,
                slidesPerView: 5,
            });
        })

    // 3.Filter in categories section

    fetch("db.json")
        .then(res => res.json())
        .then(data => {

            data.products.forEach((item) => {
                const category = `
        <div class="product_cart data-index=${item.id} swiper-slide">
        <h2 class="prod_title">${item.title}</h2>
        <p>Type:Electrobot</p>
        <div class="product_cart_image">
            <img src="${item.img}" alt="" class="prod_img">
        </div>
        <div class="follow">
        <i class="fa-regular fa-heart follows"></i>
        <i class="fa-regular fa-eye follows"></i>
        <i class="fa-solid fa-code-compare"></i>
    </div>
        <div class="choose_color">
            <h4>Size:</h4>
            <select name="" id="sizeSelect">
                <option value="364"><span>364</span>GB</option>
                <option value="256"><span>256</span>GB</option>
            </select>
        </div>
        <div class="price_buy">
            <div class="prices">
                <b class="product_price">${item.price}<span>USD</span></b>
                <s>${item.oldPrice}<span>USD</span></s>
            </div>
            <div class="add_cart_btn">
            ${item.inStock ?
                        `<button class="add_btn">Add to Cart</button>` :
                        `<button class="add_btn desable">Out of Stock</button>`
                    }
            </div>
        </div>
    </div>`

                rightContainer.innerHTML += category;

                if (document.readyState === "loading") {
                    document.addEventListener("DOMContentLoaded", start)
                } else {
                    start();
                }

                // ===============START======================
                function start() {
                    addEvents();
                    update()
                }


                // ===============UPDATE======================

                function update() {
                    addEvents();
                    updateTotal();
                }

                function updateCartCount(count) {
                    const cartCountElement = document.querySelector(".count");
                    if (cartCountElement) {
                        cartCountElement.textContent = count;
                    }
                }



                // ===============ADD EVENTS======================
                function addEvents() {

                    let removeItem_btns = document.querySelectorAll(".cart_remove");

                    removeItem_btns.forEach(btn => {
                        btn.addEventListener("click", handle_removeCartItem)
                    })

                    let quantity_inputs = document.querySelectorAll(".cart_quantity");
                    quantity_inputs.forEach(input => {
                        input.addEventListener("change", handle_changeItemQuantity)
                    })

                    let addCartBtn = document.querySelectorAll(".add_btn");
                    addCartBtn.forEach(btn => {
                        btn.addEventListener("click", handle_addCartItem)

                    })

                }


                let addItems = [];
                function handle_addCartItem() {

                    let product = this.closest('.product_cart');
                    let title = product.querySelector(".prod_title").textContent;
                    let price = product.querySelector(".prices b").textContent;
                    let imgSrc = product.querySelector('.prod_img').getAttribute('src');
                    // console.log(product,title,price,imgSrc)

                    let newToAdd = {
                        title,
                        price,
                        imgSrc
                    }

                    if (addItems.find((el) => el.title == newToAdd.title)) {
                        alert("already add");
                        return;
                    } else {
                        addItems.push(newToAdd)
                    }

                    localStorage.setItem("basket", JSON.stringify(addItems))

                    let cartBoxElement = CartBoxComponent(title, price, imgSrc);
                    let newNode = document.createElement("div");
                    newNode.innerHTML = cartBoxElement;
                    const cartContent = hiddenCart.querySelector(".cart_content");
                    cartContent.appendChild(newNode);

                    updateCartCount(addItems.length);
                    update();

                }

                function handle_changeItemQuantity() {
                    if (isNaN(this.value) || this.value < 1) {
                        this.value = 1;
                        const productCard = this.closest('.cart_box');
                        if (productCard) {
                            productCard.remove();
                            update();
                        }
                    } else {
                        this.value = Math.floor(this.value);
                        update();
                    }

                }

                // ===============HANDLE EVENTS======================
                function handle_removeCartItem() {
                    this.parentElement.remove();

                    updateCartCount(addItems.length);
                    update();
                }

                function updateTotal() {
                    let cartBoxes = document.querySelectorAll(".cart_box")
                    let totalElement = hiddenCart.querySelector(".total_price");

                    let total = 0;
                    cartBoxes.forEach(cartBox => {
                        let priceElement = cartBox.querySelector(".cart_price");
                        let price = parseFloat(priceElement.innerHTML.replace("$", ""));
                        let quantity = cartBox.querySelector(".cart_quantity").value;
                        total += price * quantity;
                    })

                    total = total.toFixed(2)
                    totalElement.innerHTML = "$" + total;
                }



                function CartBoxComponent(title, price, imgSrc) {
                    return `
        <div class="cart_box">
        <img src=${imgSrc} alt="" class="img_cart">
        <div class="detail_box">
          <p class="cart_product_title">${title}</p>
          <b class="cart_price">${price}</b>
          <input type="number" value="1" class="cart_quantity">
        </div>
        <i class="fa-regular fa-trash-can cart_remove"></i>
      </div>
        `
                }


            })


            function filterProductsByCategory(category) {
                return data.products.filter(product => product.category === category);
            }

            filterBtns.forEach((btn) => {
                btn.addEventListener("click", function () {
                    const selectedCategory = this.getAttribute("data-category");
                    const filteredProducts = filterProductsByCategory(selectedCategory);
                    displayFilteredProducts(filteredProducts);
                    filterBtns.forEach((btn) => {
                        btn.classList.remove("active");
                    });

                    this.classList.add("active")

                })



                function displayFilteredProducts(filteredProducts) {
                    rightContainer.innerHTML = "";
                    filteredProducts.forEach(product => {
                        rightContainer.innerHTML += `
              <div class="product_cart swiper-slide">
              <h2>${product.title}</h2>
              <p>Type:Electrobot</p>
              <div class="product_cart_image">
                  <img src="${product.img}" alt="">
              </div>
              <div class="follow">
              <i class="fa-regular fa-heart follows"></i>
              <i class="fa-regular fa-eye follows"></i>
              <i class="fa-solid fa-code-compare"></i>
          </div>
              <div class="choose_color">
                  <h4>Size:</h4>
                  <select name="" id="">
                      <option value=""><span>364</span>GB</option>
                      <option value=""><span>256</span>GB</option>
                  </select>
              </div>
              <div class="price_buy">
                  <div class="prices">
                      <b>${product.price}<span>USD</span></b>
                      <s>${product.oldPrice}<span>USD</span></s>
                  </div>
                  <div class="add_cart_btn">
                  ${product.inStock ?
                                `<button class="add_btn">Add to Cart</button>` :
                                `<button class="add_btn desable" desabled>Out of Stock</button>`
                            }
                  </div>
              </div>
          </div>`
                            ;
                    });
                }
            })
        })


    // 4.size filter

    // const sizeSelect = document.querySelector("#sizeSelect");
    // const productPrice = document.querySelector("#prices");
    // fetch("db.json")
    // .then(res=>res.json())
    // .then(data=>{
    // let selectedProduct = data.products.forEach((item)=>{
    //     var sizePrices = item.sizePrices;
    //     if(sizePrices.key==sizeSelect)
    //     return sizePrices.value;
    // })

    // })



})