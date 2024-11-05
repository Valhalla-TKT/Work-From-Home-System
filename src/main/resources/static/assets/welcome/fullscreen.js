var elem = $("#fullscreen-body");

function toggleFullscreen() {
	if (document.fullscreenElement) {
		// Exit fullscreen
		document.exitFullscreen();
		$(".fullscreen-mode-icon i").attr("class", "fa-solid fa-expand fullscreen-toggle");
	} else {
		// Enter fullscreen
		if (elem[0].requestFullscreen) {
			elem[0].requestFullscreen();
		} else if (elem[0].webkitRequestFullscreen) { // Safari
			elem[0].webkitRequestFullscreen();
		} else if (elem[0].msRequestFullscreen) { // IE11
			elem[0].msRequestFullscreen();
		}
		$(".fullscreen-mode-icon i").attr("class", "fa-solid fa-compress fullscreen-toggle");
	}
}

$(".fullscreen-toggle").on("click", function() {
	toggleFullscreen();
});

document.addEventListener("keydown", function(event) {
	if ((event.key === "f" || event.key === "F") &&
		!["INPUT", "TEXTAREA"].includes(document.activeElement.tagName) &&
		document.activeElement.getAttribute("contenteditable") !== "true") {

		event.preventDefault();
		toggleFullscreen();
	}
});

document.addEventListener("fullscreenchange", function() {
	if (document.fullscreenElement) {
		$(".fullscreen-mode-icon i").attr("class", "fa-solid fa-compress fullscreen-toggle");
	} else {
		$(".fullscreen-mode-icon i").attr("class", "fa-solid fa-expand fullscreen-toggle");
	}
});
