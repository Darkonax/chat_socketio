const express = require('express')
const { Socket } = require('socket.io')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors:{origin:"*"}})
var util = require('util')
const path = require('path')

const port = 3001;
var users = []
var messages = []

app.use(express.static("public"));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
})

server.listen(port, () =>{

    console.log("Server Running on port " + port)
    verificaruseronline()
})

io.on('connection', (socket) => {

    console.log("User Conected id: " + socket.id)

    socket.on('nickname', (nickname) => {


        const user = {

            name: nickname,
            id: socket.id

        }

        users.push(user)

        io.emit('usuarios', users)
        const msg = {
            msg: "New Connection",
            tipe: "2",
            name:user.name
        }
        io.emit('message', msg)

    })

    socket.on("message", (msg) => {
    
        messages.push(msg)
        io.emit('message', msg)

    })

    socket.on('updateuser', () => {
        io.emit('updateusers', users)
    })

    socket.on("disconnect", (reason) => {
        
        for (let i = 0; i < users.length; i++) {
            const element = users[i];
            if(socket.id == element.id){
                io.emit('discon', element.name)
                users.splice(i,1)
            }
        }
        
        console.log(reason)
      });


}) 

function verificaruseronline(){

    setTimeout(() => {

        if(users[0]){
            io.emit('updateusers', users)
            verificaruseronline()
        }else{
            verificaruseronline()
        }
        
    }, 5000);


    

}


