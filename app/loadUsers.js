window.loadUsers = function(usersCount, callback){
    function getXmlHttp(){
        var xmlhttp;
        try {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (E) {
                xmlhttp = false;
            }
        }
        if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
            xmlhttp = new XMLHttpRequest();
        }
        return xmlhttp;
    }

    function get(url, callback){
        var xmlhttp = getXmlHttp();
        xmlhttp.open('GET', url, false);
        xmlhttp.send(null);
        if(xmlhttp.status == 200) {
            try {
                var obj = JSON.parse(xmlhttp.responseText);
                callback(null, obj.result);
            } catch(e){
                callback({
                    code: 2,
                    message: "JSON parsing failed"
                })
            }
        } else {
            callback({
                code: 1,
                message: "Request failed"
            })
        }
    }

    get('/users/'+usersCount, callback);
};