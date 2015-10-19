$(document).click(function(){
	score-=50
	$("p#score").html("score: "+Math.floor(score))

})
$("body").mousemove(function(event){
	window.mouseX=event.pageX;
	window.mouseY=event.pageY;
})
$("html").on("keydown",function(e){
	var code=e.which;
	if(code==32){		
		document.elementFromPoint(mouseX, mouseY).click()
		score-=delta/2
	}
})