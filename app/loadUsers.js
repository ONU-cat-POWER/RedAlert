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

    get('http://codeforces.com/api/contest.list?gym=false', function(err, data){
        if(err){
            callback(err);
        } else {
            var contests = _.filter(data, function(el){return el.name.indexOf('Div. 1')!==-1 && el.phase==='FINISHED';})
                .slice(0, 10)
                .map(function(el){return el.id});

            var results = contests.map(function(el){return null});
            var loadedCount = 0;
            var errHappened = false;

            function loadHandles(contestId, index, callback){
                get('http://codeforces.com/api/contest.standings?contestId='+contestId+'&from=1&count=100&showUnofficial=false', function(err, data){
                    if(errHappened) return;
                    if(err){
                        errHappened = true;
                        callback(err);
                    } else {
                        results[index] = data.rows.map(function(el){return el.party.members[0].handle});
                        loadedCount++;
                        if(loadedCount===results.length) {
                            callback(null)
                        }
                    }
                })
            }

            for(var i in contests) loadHandles(contests[i], i, function(err){
                if(err){
                    callback(err);
                } else {
                    var handles = _.unique(_.flatten(results));

                    get('http://codeforces.com/api/user.info?handles='+handles.join(';'), function(err, users){
                        if(err){
                            callback(err);
                        } else {
                            var users = _.chain(users).map(function(user){
                                user = _.pick(user, ['rating', 'handle']);
                                user.url = 'http://codeforces.com/userphoto/title/'+user.handle+'/photo.jpg';
                                return user;
                            }).sortBy(function(user){return -user.rating;}).value().slice(0, usersCount);
                            callback(null, users);
                        }
                    });
                }
            });
        }
    })

};