window.addEventListener("DOMContentLoaded",function(){

    var header = document.querySelector(".header_top");
    var initialOffset = header.offsetTop;
    window.addEventListener("scroll", function () {
        if (window.pageYOffset > initialOffset + 30) {
          header.style.position = "fixed";
          header.style.top = "0";
          header.style.width="100%";
          header.style.zIndex="100"
        } else {
          header.style.position = "relative";
        }
      });

    var swiper = new Swiper(".mySwiper", {
        loop: true,
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
      });
      var swiper2 = new Swiper(".mySwiper2", {
        loop: true,
        spaceBetween: 10,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        thumbs: {
          swiper: swiper,
        },
      });


})