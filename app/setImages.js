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
loadUsers(400, function(err, data){
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
	}
})
