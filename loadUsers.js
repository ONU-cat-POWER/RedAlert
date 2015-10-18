module.exports = function(_, request, async){

    function get(url, callback){
        request(url, function (err, data, body) {
            if(err){
                callback(err);
            } else {
                try {
                    var obj = JSON.parse(body);
                    if(obj.status!=='OK'){
                        callback({
                            code: 1,
                            message: obj.comment
                        });
                    } else {
                        callback(null, obj.result);
                    }
                } catch(e){
                    console.log('19:', e);
                    //console.log(body);
                    callback({
                        code: 2,
                        message: "JSON parsing failed"
                    });
                }
            }
        })
    }

    var closure = {
        currentUsers: []
    };

    function updateUsers(callback){
        get('http://codeforces.com/api/contest.list?gym=false', function(err, data){
            if(err){
                callback(err);
            } else {
                var contests = _.filter(data, function(el){return el.name.indexOf('Div. 1')!==-1 && el.phase==='FINISHED';})
                    .slice(0, 10)
                    .map(function(el){return el.id});

                async.mapLimit(contests, 5, function(contestId, callback){
                    get('http://codeforces.com/api/contest.standings?contestId='+contestId+'&from=1&count=100&showUnofficial=false', function(err, data){
                        if(err){
                            callback(err);
                        } else {
                            callback(null, data.rows.map(function(el){return el.party.members[0].handle}));
                        }
                    })
                }, function(err, results){
                    var handles = _.unique(_.flatten(results));
                    //console.log(handles)

                    get('http://codeforces.com/api/user.info?handles='+handles.join(';'), function(err, users){
                        if(err){
                            callback(err);
                        } else {
                            var users = _.chain(users).map(function(user){
                                user = _.pick(user, ['rating', 'handle']);
                                user.url = 'http://codeforces.com/userphoto/title/'+user.handle+'/photo.jpg';
                                return user;
                            }).sortBy(function(user){return -user.rating;}).value();
                            callback(null, users);
                        }
                    });
                });
            }
        });
    }

    (function update(){
        updateUsers(function(err, users){
            if(err){
                console.log('Failed update users due to error:', err);
            } else {
                closure.currentUsers = users;
                console.log(users);
                console.log('Users successfully updated');
            }
            setTimeout(update, 600000);
        });
    })();

    return function(usersCount, callback){
        console.log(usersCount);
        callback(null, closure.currentUsers.slice(0, usersCount));
    }
};