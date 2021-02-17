//=============for webscss============
//
// function testWebP(callback) {

// 	var webP = new Image();
// 	webP.onload = webP.onerror = function () {
// 		callback(webP.height == 2);
// 	};
// 	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
// }

// testWebP(function (support) {

// 	if (support == true) {
// 		document.querySelector('body').classList.add('webp');
// 	} else {
// 		document.querySelector('body').classList.add('no-webp');
// 	}
// });
//
//=====================================

// media break point для адаптива
const mdBreakPoint = 768;

const clientWidth = document.documentElement.clientWidth;
const clientHeight = document.documentElement.clientHeight;

// =============Burger_menu============
let burgerCircle = document.querySelector(".burger-circle");
let header_burger = document.querySelector(".header__burger");
let header_menu = document.querySelector(".header__menu");
let menu__list = document.querySelector(".menu__list");

// По клику на бургер меняем класы для CSS
burgerCircle.addEventListener("click", function (e) {
  if (clientWidth > mdBreakPoint) return;
  e.preventDefault();
  header_burger.classList.toggle("active");
  header_menu.classList.toggle("active");
});

// Обработка при клике на nav_item
menu__list.addEventListener("click", function (e) {
  e.preventDefault();
  if (!e.target.dataset.name || clientWidth > mdBreakPoint) return;
  header_burger.classList.toggle("active");
  header_menu.classList.toggle("active");
});

// =============Burger_menu============

// =============Header and nav=========
let header = document.body.querySelector(".header");
let header__inner = document.body.querySelector(".header__inner");

// Scrooll2id - Плавный скролл
$(window).on("load", function () {
  $(".menu__link, .logo-link, .intro__btn, .f-menu__link").mPageScroll2id({
    offset: 40,
    scrollSpeed: 500,
  });
});

// Настройка header fixed при scroll
let currentScrollPosition = window.pageYOffset;
function isStartPage(e) {
  // Фиксируем шапку

  if (clientWidth > mdBreakPoint) {
    if (
      window.pageYOffset >= clientHeight / 3 &&
      window.pageYOffset < clientHeight / 2
    ) {
      header.classList.add("hide");
    }
    if (window.pageYOffset < clientHeight / 3) {
      header.style.transition = "all 0s";
      header.classList.remove("hide");
      header.classList.remove("fixed");
      header__inner.style.padding = "";
    }

    if (window.pageYOffset >= clientHeight / 2) {
      header.style.transition = "";
      header__inner.style.padding = "15px 0";
      header.classList.remove("hide");
      header.classList.add("fixed");
    }
  } else {
    header.classList.add("fixed-mobile");
    header__inner.style.padding = "10px 0";
  }

  currentScrollPosition = window.pageYOffset;
}

window.addEventListener("scroll", isStartPage);

window.addEventListener("load", function (e) {
  isStartPage();
});

// =============Header and nav=========

// =========Scroll animations=======

const animItems = document.querySelectorAll(".anim-items");
if (animItems.length > 0) {
  window.addEventListener("scroll", animOnScroll);
  function animOnScroll() {
    for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 2;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;

      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if (
        pageYOffset > animItemOffset - animItemPoint &&
        pageYOffset < animItemOffset + animItemHeight
      ) {
        animItem.classList.add("active");
      } else {
        if (!animItem.classList.contains("anim-no-hide")) {
          animItem.classList.remove("active");
        }
      }
    }
  }
  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageYOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    return { top: rect.top + scrollLeft, left: rect.left + scrollLeft };
  }
  setTimeout(() => animOnScroll(), 300);
}
// =========Scroll animations=======

// =========Parallax=======

let parallaxMouseArea = document.querySelector(".parallax__dark-rect");
let parallax_bg = document.querySelector(".scene__bg");
let alena = document.querySelector(".alena-img");
let speedBg = parallax_bg.getAttribute("data-speed");
let speedAlena = alena.getAttribute("data-speed");

function parallax(e) {
  if (clientWidth > mdBreakPoint) {
    parallax_bg.style.transform =
      "translateX(" + (-1 + (e.clientX * speedBg) / 15000) + "%)";
    alena.style.transform = "";
    alena.style.transform +=
      "translateX(-" + (50 + (e.clientX * speedAlena) / 6000) + "%)";
    alena.style.transform +=
      "translateY(-" + (-4 + (e.clientY * speedAlena) / 1200) + "%)";
  }
}

parallaxMouseArea.addEventListener("mousemove", parallax);
// =========Parallax=======

// =========Image modal=========
let tabsContent = document.querySelector(".tabs-content");
let tabsModal = document.querySelector(".tabs-modal");
let tabsModalImage = document.querySelector(".tabs-modal__image");

tabsContent.addEventListener("click", (e) => {
  let image = e.target;
  if (!image.classList.contains("tabs-content__photo")) return;

  tabsModalImage.src = image.src;
  tabsModal.classList.add("active");
  header.classList.add("hide");
  document.body.classList.add("lock");
});

tabsModal.addEventListener("click", closeModal);
tabsModal.addEventListener("touchstart", closeModal);

function closeModal(e) {
  if (e.target.dataset.close) {
    tabsModal.classList.remove("active");
    header.classList.remove("hide");
    document.body.classList.remove("lock");
  }
}

// =========Image modal=========

// ========Tabs========

const HIDE_ANIMATION_SPEED = 200;

let allTabs = document.querySelectorAll(".tabs-triggers__item");
let allTabsContent = document.querySelectorAll(".tabs-content__item");

allTabs.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    e.preventDefault();

    allTabs.forEach((tab_elem) => {
      tab_elem.classList.remove("active");
    });

    allTabsContent.forEach((tab_content) => {
      tab_content.classList.add("hide");
      setTimeout(() => {
        tab_content.classList.remove("hide");
        tab_content.classList.remove("active");
      }, HIDE_ANIMATION_SPEED);
    });

    e.target.classList.add("active");
    setTimeout(() => {
      let targetContent = document.querySelector(e.target.getAttribute("href"));
      targetContent.classList.add("hide");
      targetContent.classList.add("active");
      setTimeout(() => {
        targetContent.classList.remove("hide");
      }, HIDE_ANIMATION_SPEED);
    }, HIDE_ANIMATION_SPEED);
  });
});
// ========Tabs========

// ========Switch Portfolio========

const HIDE_PORTFOLIO_SPEED = 400;

let allPortfolioBtn = document.querySelectorAll(".p-main__btn");
let mainPortfolioArea = document.querySelector(".p-area");
let portfolioTabs = document.querySelector(".tabs");

allPortfolioBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    let helpClassName = e.target.getAttribute("href").slice(1);
    document.querySelector("." + helpClassName).classList.add("active");

    let targetContent = document.querySelector(e.target.getAttribute("href"));
    targetContent.classList.add("active");

    mainPortfolioArea.classList.add("hide");
    setTimeout(() => {
      mainPortfolioArea.classList.remove("active");
      mainPortfolioArea.classList.remove("hide");

      portfolioTabs.classList.add("active");
      portfolioTabs.classList.add("hide");
      setTimeout(() => {
        portfolioTabs.classList.remove("hide");
      }, HIDE_PORTFOLIO_SPEED);
    }, HIDE_PORTFOLIO_SPEED + 20);
  });
});
// ========Switch Portfolio========

// ========Service tabs=========
let servicePhotoBody = document.querySelector(".service-photo__body");
let serviceVideoBody = document.querySelector(".service-video__body");

let photoTab = document.querySelector(".photo-tab");
let videoTab = document.querySelector(".video-tab");

let servicePhoto = document.querySelector(".service-photo");
let serviceVideo = document.querySelector(".service-video");

servicePhotoBody.classList.add("active");
photoTab.classList.add("active");
servicePhoto.classList.add("active");

photoTab.addEventListener("click", (e) => {
  videoTab.classList.remove("active");
  serviceVideoBody.classList.remove("active");
  serviceVideo.classList.remove("active");

  servicePhotoBody.classList.add("active");
  photoTab.classList.add("active");
  servicePhoto.classList.add("active");
});

videoTab.addEventListener("click", (e) => {
  servicePhotoBody.classList.remove("active");
  photoTab.classList.remove("active");
  servicePhoto.classList.remove("active");

  videoTab.classList.add("active");
  serviceVideoBody.classList.add("active");
  serviceVideo.classList.add("active");
});

// ========Service tabs=========
