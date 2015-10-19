function getHandleColor(rating){
	if(rating>=2900)return "#a00";
	if(rating>=2400)return "#f00";
	if(rating>=2200)return "#ff8c00";
	if(rating>=1900)return "#a0a";
	if(rating>=1600)return "#00f";
	if(rating>=1400)return "#03a89e";
	if(rating>=1200)return "#0f0";
return "#808080";
}
function getHandleDomString(handle,rating){
	var res="<p id='handle' style='color: "+getHandleColor(rating)+" '>"
	if(rating>=2900)
		res+="<span style='color: #000'>"+handle[0]+"</span>"+handle.substr(1)
	else 
		res+=handle
	res+="</p>"
	return res;
}
$("button#reset").click(function(){
	tnow=_.now()
	score=50
	var count=$("input#count").val();
	tmax=tkill*count
	console.log(count)
	loadUsers(count, function(err, data){
		if(err){
			console.log(err);
		} else {
			window.users=data;
			_.each(users, function(user, i){
				var balls=$(".balls").append(generate());

				var url="url("+user.url+")"
				var ball=$(".ball")[i];
				$(ball).attr("id",i);
				$(ball).find("img").attr("src",user.url)
				var rating=user.rating	
				$(ball).remove("p#handle")
				$(ball).append(getHandleDomString(user.handle,rating))
					
			})
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
				});
			});
			$(".ball").click(function(){
				var id=$(this).attr('id');
				t=_.now()-tnow;
				delta=C*(.5+.5*(Math.max(0,tmax-t)/tmax))
				score+=delta;
				console.log(t)
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
		}
	})
})

