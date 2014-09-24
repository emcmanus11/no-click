$(document).ready(function() {
	// Mouseenter
	$("#dynamic, #static").on("mouseenter", "a, button, .special-click", function(e) {
		//alert("oi");
		console.log("Target entered");
		enter_target(e, this);

	});

	// Mouseleave
	$("#dynamic, #static").on("mouseleave", "a, button, .special-click", function(e) {
		//alert("oi");
		console.log("Target exited");
		exit_target(e, this);
	});
	append_links();
});

function append_links() {
	$("#dynamic").append("<a href='http://www.google.com'>Dynamic link to google</a>");
	$("#dynamic").append("<br>");
	$("#dynamic").append("<button onclick='addButton()'>Dynamic button</button>");
	$("#dynamic").append("<div class='special-click' onclick='random_function(\"HI\")'>Dynamic div with class</div>");
}

function goToLink () {
	window.location.href = "http://www.imgur.com";
}

function addButton () {
	$("#dynamic").append("<button onclick='goToLink()'>Hi I'm a button</button>");
}

function exit_target (e, elt) {
	var state = $(elt).attr("data-state");
	// From entered to leaving (red to blue)
	if(state == undefined || state == 0){
		console.log("leave first time");
		$(elt).css("background-color", "blue");
		$(elt).attr("data-state", 1);
		var time = setTimeout(function(){
			var color = $(elt).attr("data-bg-color");
			$(elt).css("background-color", color);
			$(elt).attr("data-state", 0);
		}, 3000);
		$(elt).attr("data-all", time);
	} else {
	// From re-entered to leaving (blue to original color)
		console.log("leave 2nd time");
		clearTimeout($(elt).attr("data-all"));
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
		console.log("entered first time");
		var color = $(elt).css("background-color");
		$(elt).attr("data-bg-color", color);
		console.log($(elt).attr("data-bg-color"));
		$(elt).css("background-color", "red");
		console.log($(elt).attr("data-bg-color"));
		
		var time = setTimeout(function(){
			$(elt).css("background-color", color);
			console.log("color2");
			console.log(color);
		}, 3000);
		$(elt).attr("data-all", time);
	} else {
	// From unentered to re-entered (blue to click to original color)
		console.log("entered 2nd time");
		clearTimeout($(elt).attr("data-all"));
		$(elt).click();
		// $(elt).attr("data-bg-color", $(elt).css("background-color"));
		var color = $(elt).attr("data-bg-color");
		$(elt).css("background-color", color);
		
		//$(elt).attr("data-state", 0);
		console.log("have color");
		console.log(color);
	}
}