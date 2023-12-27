
var username = ""
var userss = []
var socket

$(document).ready( function(){
    verificaruseronline()
})

$("#btnenviarid").on('click', () => {
    
    if(socket.connected){
        const text = $("#textinputid").val().trim()
        const msg = {
            msg: text,
            name:username,
            tipe: "1"
        }
        socket.emit('message', msg)
        $("#textinputid").val("")
    }else{
        console.log('Dont have a Connection')
    }

})

$("#btnconnectid").on('click', function(){
    
    const nick = $("#nicknameid").val()
    if(nick.length < 3){
        $("#alertid").html("Coloque um Nome antes de proceguir, minimo 3 charactere")
        $("#nicknameid").removeClass("border border-dark")
        $("#nicknameid").addClass("border border-danger")
    }else{
        username = $('#nicknameid').val().trim()
        $("#nicknameid").removeClass("border border-danger border-dark")
        $("#nicknameid").addClass("border border-primary")
        $("#nicknameid").attr("disabled", "disabled")
        $("#alertid").html("trying to Connect ...")
        $("#alertid").removeClass("alert-danger")
        $("#alertid").addClass("alert-warning")
        initconection()
    }
})

function initconection(){

    socket = io('http://localhost:3001')

    socket.on('connect', () => {

        $("#alertid").removeClass("alert-danger")
        $("#alertid").removeClass("alert-warning")
        $("#statusserverid").removeClass("text-danger")
        $("#statusserverid").addClass("text-success")
        $("#alertid").addClass("alert-success")
        $("#alertid").html("Connection Establishment")
        
        $("#nicknameid").attr("disabled", "disabled")
        $("#btnconnectid").attr("disabled", "disabled")

        socket.emit('nickname', username)

        socket.on('message', (message) => {

            enviarparatextarea(message)
        })

        socket.on('updateusers', (users) => {
            userss = users
            $("#userid").empty()
            userlogados()
        } )

        socket.on('discon', (user) => {
            const olduser = {
                name: user,
                tipe: "3"
            }
            enviarparatextarea(olduser)

        })


    })

}


function verificaronlines(){
    socket.emit('updateuser')
    scrollelement()
}

function userlogados() {

    var htmls = ``
    userss.forEach(user => {
        htmls = htmls + `<div>${user.name} <i class="bi bi-circle-fill text-success"></i></div>`
    });

    $("#userid").html($("#userid").html() + htmls)
}

function enviarparatextarea(msg) {
    const message = msg
    if(message.tipe == "1"){
        $("#Chatareaid").html($("#Chatareaid").html() +
        `
        <div class="mb-2 p-2 bg-dark rounded">
            <div>
                <div class="text-white">${message.msg}</div>
                <span class="text-success d-flex justify-content-start" style="font-size: 10px;">${message.name}</span>
            </div>
        </div>
        `)
    }
    if(message.tipe == "2"){
        $("#Chatareaid").html($("#Chatareaid").html() +
        `
        <div class="alert alert-success" role="alert">
            ${message.name} is Connected.
        </div>
        `)
    } 
    if(message.tipe == "3"){
        $("#Chatareaid").html($("#Chatareaid").html() +
        `
        <div class="alert alert-danger" role="alert">
            ${message.name} is disconnected.
        </div>
        `)
    }
    verificaronlines()

}

function scrollelement(){
    var element = document.getElementById("Chatareaid");
    element.scrollTop = element.scrollHeight;
}