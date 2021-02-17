// about slider
$(document).ready(function () {
  $(".about__slider").slick({
    arrows: true,
    dots: true,
    adaptiveHeight: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    pauseOnFocus: true,
    pauseOnDotsHover: true,
  });
});
