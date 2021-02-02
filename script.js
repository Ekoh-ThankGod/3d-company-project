// Variable declarations
const aboutCompany = document.querySelectorAll(".a-link");
let imagePath;

const manipulateIcons = (e, imagePath) =>{
	let parentLinkIcon = e.target.closest(".a-link");
	parentLinkIcon.children[0].src = imagePath;
}

// functions
const changeArrow = (e) => {
	manipulateIcons(e, "icons/arrow-red.svg");
}

const changeArrowBack = (e) =>{
	manipulateIcons(e, "icons/arrow-right.svg");
}

// Event listeners

aboutCompany.forEach(about => {
	about.addEventListener("mouseenter", changeArrow);
});

aboutCompany.forEach(about => {
	about.addEventListener("mouseleave", changeArrowBack);
});