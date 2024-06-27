/**
 * 
 */

let valueDisplays = document.querySelectorAll(".num");
let interval = 4000;
let isCountingStarted = false;
function isInViewport(element) {
	let rect = element.getBoundingClientRect();
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
}

function startCount() {
	valueDisplays.forEach((valueDisplay) => {
		let startValue = 0;
		let endValue = parseInt(valueDisplay.getAttribute("data-val"));
		let duration = Math.floor(interval / endValue);
		let counter = setInterval(function() {
			startValue += 1;
			valueDisplay.textContent = startValue;
			if (startValue === endValue) {
				clearInterval(counter);
			}
		}, duration);
	});
}
const departmentItems = document.querySelectorAll(".startCountHere");
window.addEventListener('scroll', function() {    
    if (!isCountingStarted) {
        departmentItems.forEach((item) => {
            if (isInViewport(item)) {
                startCount();
                isCountingStarted = true;
                window.removeEventListener('scroll', arguments.callee);
            }
        });
    }
});