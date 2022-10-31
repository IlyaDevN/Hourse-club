// 'use strict'

function setSlidesState(slider, className){
	const activeIndexes = getActiveIndexes(slider, slider.realIndex);
	const slideCollection = slider.slides;
	
	slideCollection.forEach(function(elem, index) {
		if(activeIndexes.includes(index)){
			elem.classList.remove(className);
		}
		else{
			elem.classList.add(className);
		}
	});
}

function getActiveIndexes(slider, realIndex){
	let activeIndexes = [];
	let activeIndex = realIndex;
	if(realIndex == 0){
		for(let i = 0; i < slider.params.slidesPerView; i++){
			activeIndexes.push(i);
		}
	}
	if(realIndex == slider.slides.length - slider.params.slidesPerView){
		for(let i = realIndex; i < slider.slides.length; i++){
			activeIndexes.push(i);
		}
	} 
	else {
		const quantityOfActiveIndexes = slider.params.slidesPerView - 2;
		for(let i = 0; i < quantityOfActiveIndexes; i++){
			activeIndexes.push(++activeIndex);
		}
	}
	return activeIndexes;
}

(function changeContactsMapSize(){

	let screenResolution = document.documentElement.clientWidth;
	let fullScreenResolution = window.innerWidth;
	let map = document.querySelector(".contacts__bg_map");
	map.width = screenResolution;
	if(fullScreenResolution < 480) {
		map.height = 748;
	}
	if(fullScreenResolution >= 480 && fullScreenResolution < 768) {
		map.height = 786;
	}
	if(fullScreenResolution >= 768 && fullScreenResolution < 1000) {
		map.height = 510;
	}
	if(fullScreenResolution >= 1000) {
		map.height = 650;
	}

	window.addEventListener("resize", function(){
	
		screenResolution = document.documentElement.clientWidth;
		fullScreenResolution = window.innerWidth;
		map.width = screenResolution;
		if(fullScreenResolution < 480) {
			map.height = 748;
		}
		if(fullScreenResolution >= 480 && fullScreenResolution < 768) {
			map.height = 786;
		}
		if(fullScreenResolution >= 768 && fullScreenResolution < 1000) {
			map.height = 510;
		}
		if(fullScreenResolution >= 1000) {
			map.height = 650;
		}
	})

})();

(function questionsValidation(){

	let button = document.querySelector(".form__button");
	let checkbox = document.querySelector(".form__checkbox_original");
	let checkboxContainer = document.querySelector(".form__checkbox_container");

	button.addEventListener("click", function(){
		let label = document.querySelector(".form__label_checkbox")
		console.dir(label);
		if(!checkbox.checked){
			let tooltip = document.createElement("div");
			tooltip.innerHTML = "Подтвердите согласие";
			tooltip.classList.add("tooltip");
			if(checkboxContainer.querySelector(".tooltip")) {
				return;
			}
			checkboxContainer.append(tooltip);
			setTimeout(() => tooltip.remove(), 4000);
		}
	});
})();