const io = require( "socket.io" )();
const socketapi = {
    io: io
};
var users = {}
// Add your socket.io logic here!
io.on( "connection", function( socket ) {
    // console.log( "A user connected" );
    socket.on("disconnect",function(){
        // console.log("a user is disconnectedd")
        socket.broadcast.emit("user-disc",userr = users[socket.id])
        delete users[socket.id]
        io.emit("user-list",users)

       
    })

    socket.on("con-user",function(e){
        users[socket.id] = e
        // console.log(users)
        socket.broadcast.emit("user-joined",e);
        io.emit("user-list",users)
    })
    socket.on("msg",function(e){
        socket.broadcast.emit("rtnmsg", e)
        // console.log(e.msg)
        console.log(`this is from ${e.username}`)

    });

    socket.on("typing",function(typ){
        socket.broadcast.emit("typing",typ)

    })





});



// end of socket.io logic

module.exports = socketapi;