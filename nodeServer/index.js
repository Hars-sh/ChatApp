//node server handling socket io connections
const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });
const users={};
io.on('connection',socket=>
{// if any new user join ,let other users connected to the server know
    socket.on('new-user-joined',name=>
    {
        //console.log('new user',name)
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    })
    // if someone send message broadcast to everyone
    socket.on('send',message=>
    { //console.log(message);
        socket.broadcast.emit('receive',{message:message, name: users[socket.id]})
    });
    //if someone leave broadcast everyone
    socket.on('disconnect',message=>
    {
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id]
    });
})