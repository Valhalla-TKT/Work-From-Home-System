/**
 * 
 */
document.addEventListener("DOMContentLoaded", function() {
	const items = document.querySelectorAll(".wfh-form-step-wizard-item");
	
	let finishedIndex = 1;
	items[finishedIndex].classList.add("current-item");
	let startRemoveFromHere = finishedIndex + 1;
	for (let i = startRemoveFromHere; i < items.length; i++) {            
	    items[i].classList.remove("current-item");
	}
});