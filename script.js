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
