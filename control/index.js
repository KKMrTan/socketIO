var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    // res.send('<h1>Welcome to Vincent Server</h1>');
    // res.sendFile(__dirname + '/index.html');
    res.sendFile(__dirname + '/beControlled.html');
});
app.get('/control.html', function(req, res){
    // res.send('<h1>Welcome to Vincent Server</h1>');
    // res.sendFile(__dirname + '/index.html');
    res.sendFile(__dirname + '/control.html');
});


//在线用户socketid
var onlineUsersId = [];


io.on('connection', function(socket){
	// console.log(socket.id);
	// 取所有在线id
    // for(var key in io.sockets.sockets){
    // 	key
    // }
	onlineUsersId.push(socket.id);
    // socket.to(socket.id).emit('login', {id:socket.id,type:1});

    socket.on('conn', function(obj){
        socket.to(obj.id).emit('conn', {type: 3});
    });

    //监听用户退出
    socket.on('disconnect', function(){
        io.emit('logout', {});
    });

    //监听用户发布聊天内容
    socket.on('message', function(obj){
    	console.log(obj);
        socket.to(obj.id).emit('message', {selected:obj.selected,type: 2});
    });

});

http.listen(3000, function(){
    console.log('listening on *:3000');
});