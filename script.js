// Variable declarations
const aboutCompany = document.querySelectorAll(".a-link");

const popUp = document.querySelector(".pop-up__container");
const overLay = document.querySelector(".overlay");
const buttonPopUp = document.querySelector("#button-resume");
const closePopUp = document.querySelector(".close");

const scrollUp = document.querySelector("#scroll-arrow");
const section1 = document.querySelector("#section1");

const slides = document.querySelectorAll('.slide');
const leftButton = document.querySelector('.btn-left');
const rightButton = document.querySelector('.btn-right');

// Mobile/tablet dropdown menu
const mobileContent = document.querySelector(".mobile-button__content");
const mobileBtn = document.querySelector(".mobile-btn__container");

const hideSections = document.querySelectorAll(".section-loop");

const catalog = document.querySelector(".catalog");
const catalogLink = document.querySelector(".catalog-link");
const otherDetails = document.querySelector(".other-details");
const backLink = document.querySelector(".back");

// search optional display variable

const searchBtn = document.querySelector(".search-container");
const removePhoneTextStore = document.querySelectorAll(".tablet-loop");
const searchInput = document.querySelector(".form-button");

// functions

const manipulateIcons = (e, imagePath) =>{
	let parentLinkIcon = e.target.closest(".a-link");
	parentLinkIcon.children[0].src = imagePath;
}

const simplifyPopUp = (el) =>{
	el.classList.toggle("hidden");
}

const initiatePopUp = (e) => {
	targPoint = e.target.classList;

	if(e.target.id !== "button-resume" && !targPoint.contains("close") &&
	 !targPoint.contains("overlay")){
		return -1;
	}
	else{
		simplifyPopUp(popUp);
		simplifyPopUp(overLay);
	};
}

const keyRemovePopup = (e) => {
	if(e.key !== "Escape"){
		return -1;
	}
	else{
		popUp.classList.add("hidden");
		overLay.classList.add("hidden");
	}
}

const changeArrow = (e) => {
	manipulateIcons(e, "icons/arrow-red.svg");
}

const changeArrowBack = (e) =>{
	manipulateIcons(e, "icons/arrow-right.svg");
}

const scrollUpFn = (e) => {
	window.scrollTo({
		left: 0,
	    top: 0,
	    behavior: 'smooth'
	});
}

// Slider for the videos
let slideCurrent = 0;
const slideMax = slides.length;

const goToSlide = (slide) =>{
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

const slideNext = () => {
    if (slideCurrent === slideMax - 1) {
      slideCurrent = 0;
    } else {
      slideCurrent++;
    }

    goToSlide(slideCurrent);
  };

const slidePrevious = () => {
    if (slideCurrent === 0) {
      slideCurrent = slideMax - 1;
    } else {
      slideCurrent--;
    }

    goToSlide(slideCurrent);
  };
  goToSlide(0);

const simplifyBackLinkFn = () =>{
	
	[catalog, backLink].forEach(el => el.classList.add("no-display"));

	otherDetails.classList.remove("no-display");
	catalogLink.children[0].src = "icons/arrow-right.svg";
	catalogLink.classList.remove("catalog-background");
}

const removeMobileDropDown = () =>{
	mobileBtn.children[0].src = "icons/icon-mobile-button.svg";

	mobileContent.classList.add("no-display");

	hideSections.forEach(el => {
		el.classList.remove("no-display");
	});
}

const mobileDropDown = (e) =>{

	if(e.target.classList.contains("mobile-button__content")){
		return;
	}
	
	let getImageSrc = mobileBtn.children[0].getAttribute("src");
	
	if(getImageSrc === "icons/icon-mobile-button.svg"){
		mobileBtn.children[0].src = "icons/close.svg";

		mobileContent.classList.remove("no-display");

		hideSections.forEach(el => {
			el.classList.add("no-display");
		});

		removeSearch();
	}
	else if(getImageSrc === "icons/close.svg"){
		removeMobileDropDown();
		simplifyBackLinkFn();
	}

};

const dropdownCatalog = (e) => {
	e.preventDefault();

	if(!e.target.classList.contains("catalog-link")){
		return;
	}

	[catalog, backLink].forEach(el => el.classList.remove("no-display"));

	otherDetails.classList.add("no-display");
	catalogLink.children[0].src = "icons/arrow-down.svg";
	catalogLink.classList.add("catalog-background");

}

const backLinkFn = (e) =>{
	e.preventDefault();

	if(!e.target.classList.contains("back")){
		return;
	}

	simplifyBackLinkFn();
}

const removeSearch = () =>{
	removePhoneTextStore.forEach(el => {
			el.classList.remove("no-display");
		});

    searchInput.classList.remove("display");

    searchBtn.children[0].src = "icons/icon-search.svg";

}

const onSearchBtnClicked = (e) =>{

	let searchContainer = e.target.closest(".search-container");

	if(!searchContainer){
		return;
	}

	if(searchContainer.children[0].getAttribute("src") === "icons/icon-search.svg"){
		searchContainer.children[0].src = "icons/close.svg";

		removePhoneTextStore.forEach(el => {
			el.classList.add("no-display");
		});

		searchInput.classList.add("display");

		removeMobileDropDown();

	}
	else if(searchContainer.children[0].getAttribute("src") === "icons/close.svg"){
		searchContainer.children[0].src = "icons/icon-search.svg";

		removeSearch();
	}

}

// Event listeners

rightButton.addEventListener("click", slideNext);
leftButton.addEventListener("click", slidePrevious);

const coords = section1.getBoundingClientRect();

window.addEventListener('scroll', function () {

  if (window.scrollY > coords.top){
  	scrollUp.classList.remove("hidden");
  }
  else{
  	scrollUp.classList.add("hidden");
  }
});

scrollUp.addEventListener("click", scrollUpFn);

[buttonPopUp, closePopUp, overLay].forEach(el => el.addEventListener("click", initiatePopUp));
[buttonPopUp, closePopUp, overLay].forEach(el=> el.addEventListener("keydown", keyRemovePopup));

aboutCompany.forEach(about => {
	about.addEventListener("mouseenter", changeArrow);
});

aboutCompany.forEach(about => {
	about.addEventListener("mouseleave", changeArrowBack);
});

mobileBtn.addEventListener("click", mobileDropDown);

catalogLink.addEventListener("click", dropdownCatalog);
backLink.addEventListener("click", backLinkFn);

searchBtn.addEventListener("click", onSearchBtnClicked);
