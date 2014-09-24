$(document).ready(function() {
	// Mouseenter
	$("#dynamic, #static").on("mouseenter", "a, button, .special-click", function(e) {
		enter_target(e, this);
	});

	// Mouseleave
	$("#dynamic, #static").on("mouseleave", "a, button, .special-click", function(e) {
		exit_target(e, this);
	});
	//append_links();
});

function append_links() {
	$("#dynamic").append("<a href='http://www.google.com'>Dynamic link to google</a>");
	$("#dynamic").append("<br>");
	$("#dynamic").append("<button onclick='addButton()'>Make more buttons</button>");
	$("#dynamic").append("<div class='special-click' onclick='random_function(\"HI\")'>Dynamic div with class</div>");
}

function goToLink () {
	window.location.href = "http://www.imgur.com";
}

function addButton () {
	$("#dynamic").append("<button onclick='goToLink()'>Go to imgur.com</button>");
}

function exit_target (e, elt) {
	var state = $(elt).attr("data-state");
	// From entered to leaving (red to blue)
	clearTimeout($(elt).attr("data-time-outer"));
	if(state == 1){
		console.log("leave first time");
		$(elt).css("background-color", "blue");
		$(elt).attr("data-state", 2);
		var time = setTimeout(function(){
			var color = $(elt).attr("data-bg-color");
			$(elt).css("background-color", color);
			$(elt).attr("data-state", 0);
		}, 3000);
		$(elt).attr("data-time", time);
	} else {
	// From re-entered to leaving (blue to original color)
		console.log("leave 2nd time");
		clearTimeout($(elt).attr("data-time"));
		var color = $(elt).attr("data-bg-color");
		$(elt).css("background-color", color);
		$(elt).attr("data-state", 0);
	}
}

function random_function (msg) {
	alert(msg);
}

function enter_target (e, elt) {
	var state = $(elt).attr("data-state");
	// From unentered / not selected at all to initial entry (original color to red)
	if(state == undefined || state == 0){
		var time_outer = setTimeout(function(){
			var color = $(elt).css("background-color");
			$(elt).attr("data-bg-color", color);
			$(elt).css("background-color", "red");
			$(elt).attr("data-state", 1);
			var time = setTimeout(function(){
				$(elt).css("background-color", color);
			}, 3000);
			$(elt).attr("data-time", time);
		}, 250);
		$(elt).attr("data-time-outer", time_outer);
	} else {
	// From unentered to re-entered (blue to click to original color)
		clearTimeout($(elt).attr("data-time"));
		var color = $(elt).attr("data-bg-color");
		$(elt).css("background-color", color);
		elt.click();
	}
}