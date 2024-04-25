/**
 * 
 */
var elem = $("#fullscreen-body");
console.log("Hello")
$(".fullscreen-toggle").on("click", function(){
	console.log("Hello")
	if (document.fullscreenElement) {
		document.exitFullscreen();
		$(".fullscreen-mode-icon i").attr("class", "fa-solid fa-expand fullscreen-toggle");
	} else {
		if (elem[0].requestFullscreen) {
			elem[0].requestFullscreen();
			$(".fullscreen-mode-icon i").attr("class", "fa-solid fa-compress fullscreen-toggle");
		} else if (elem[0].webkitRequestFullscreen) {
			elem[0].webkitRequestFullscreen();
			$(".fullscreen-mode-icon i").attr("class", "fa-solid fa-compress fullscreen-toggle");
		} else if (elem[0].msRequestFullscreen) {
			elem[0].msRequestFullscreen();
			$(".fullscreen-mode-icon i").attr("class", "fa-solid fa-compress fullscreen-toggle");
		}
	} 	
});