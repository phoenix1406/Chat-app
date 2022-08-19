// This is index.js for node server which will handle socket.io for communication
const io = require('socket.io')(8000, {
    cors: {
   origin:"*"
    }
});


const users = {};
io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        // console.log('new user:',name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined:', name)

    })
    socket.on('send', message => {
        socket.broadcast.emit('receive',
            {
                'message': message,
                'name': users[socket.id]
            })
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected',users[socket.id])
        delete users[socket.id];
            
    })
})

