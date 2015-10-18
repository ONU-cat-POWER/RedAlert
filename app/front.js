function generate(){
	var res="<div class='ball'><p id='img-wrapper'><img src=\"\"></p><p id='handle'></p></div>";
	return res;
}
$(document).ready(function(){
			var time=0;
			var audioid=0;
			$("html").click(function(){
				var str="<audio id='audio"+ (++audioid) +"' src='/shoot1.mp3'></audio>"
				$("html").append(str);
				var shoot=document.getElementById("audio"+audioid)
				shoot.play()
				var timer_id = setTimeout(function() {
					clearTimeout(timer_id);
					shoot.pause();
					$(shoot).remove();
				},1200)
			});
			$(".ball").click(function(){
				$(".balls").children().each(function(){
						var mt=Math.floor((Math.random()*95));
						var ml=Math.floor((Math.random()*95));
						mt+="%";
						ml+="%";
						$(this).css({
							top: mt,
							left: ml
						});
					});
			});
			var bgcolor = 0;
			/*setInterval(function(){
				bgcolor = Math.min(255, bgcolor += 2)
				//console.log($(".area").css("backgroundColor"))
				var rgb=$(".area").css("backgroundColor")
				rgb=rgb.substring(4,rgb.length-1);
				var r=+rgb.split(", ")[0];
				var g=+rgb.split(", ")[1];
				var b=+rgb.split(", ")[2];
		
				$(".score").css({
					backgroundColor: "rgb("+(r+1)+","+(g+1)+","+(b+1)+")" 
				});
				$(".area").css({
					backgroundColor: "rgb("+(r+1)+","+(g+1)+","+(b+1)+")" 
				});
				$(".balls div").css({
					opacity: ""+(bgcolor-50)/(255-50)
				});
			},1);*/
			$(".balls").children().each(function(){
				var mt=Math.floor((Math.random()*95));
				var ml=Math.floor((Math.random()*95));
				mt+="%";
				ml+="%";
				$(this).css({
					top: mt,
					left: ml
				});
				return $(this).click(function(){
					var id=$(this).attr('id');
					console.log(id);
					users[id].rating-=200;
					if(users[id].rating<1000)
						$(this).remove();
					else {
						$(this).find("p#handle").remove();
						$(this).append(getHandleDomString(users[id].handle,users[id].rating));
							
					}
					/*var str="<audio id='audio"+ (++audioid) +"' src='hit.mp3'></audio>"
						$("html").append(str);
						var shoot=document.getElementById("audio"+audioid)
						shoot.play()
						var timer_id = setTimeout(function() {
							clearTimeout(timer_id);
							shoot.pause();
							$(shoot).remove();
						},800)*/
					/*$(".balls").children().each(function(){
						var mt=Math.floor((Math.random()*95));
						var ml=Math.floor((Math.random()*95));
						mt+="%";
						ml+="%";
						$(this).animate({
							top: mt,
							left: ml,
						},1000);
					});*/
				});
			});
		/*
			$("body").mousemove(function(){
				var x=event.pageX;
				var y=event.pageY;
				$(".balls").children().each(function(){
					var bx=$(this).position().left;
					var by=$(this).position().top;
					//console.log(x+" "+y+" "+bx+" "+by);
					var dx=Math.abs(bx-x);
					var dy=Math.abs(by-y);
					if(dx<50 && dy<50){
						var mt=Math.floor((Math.random()*100)+1);
						var ml=Math.floor((Math.random()*100)+1);
						mt+="%";
						ml+="%";
						$(this).animate({
							top: mt,
							left: ml
						},400);
					}
					return $(this).click(function(){
						console.log($(this).remove());

					});
					

				});
			
			});
		*/
			
		});