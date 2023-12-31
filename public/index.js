

let username = "";
let port = ""
let users = [];
let socket;

$(document).ready(() => {

});

// Use arrow function for click event
$("#btnenviarid").on('click', () => {
    if (typeof socket?.connected !== "undefined") {
        const text = $("#textinputid").val().trim();
        const msg = {
            msg: text,
            name: username,
            tipe: "1",
        };
        socket.emit('message', msg);
        $("#textinputid").val("");
    } else {
        const msg = {
            name: "Try to 'Conectar' button first. Server is disconnected",
            msg: "",
            tipe: "3"
        }
        sendMessageToTextarea(msg)
        $("#btnconnectid")
        .addClass("border border-danger")
        console.log('Don\'t have a connection');
    }
});

// Use arrow function for click event
$("#btnconnectid").on('click', () => {
    const nick = $("#nicknameid").val();
    if (nick.length < 3 || nick == "") {
        $("#alertid")
            .html("Coloque um Nome antes de prosseguir, mínimo 3 caracteres")
            .removeClass("border border-dark")
            .addClass("border border-danger");
    } else {
        username = $('#nicknameid').val().trim();
        port = $('#portid').val().trim(); 

        if(port == "" || port.length < 4){
        $("#alertid")
            .html("Coloque um port number, 4 caractere")
            .removeClass("border border-dark")
            .addClass("border border-danger");
        }else{
        $("#nicknameid")
            .removeClass("border border-danger border-dark")
            .addClass("border border-primary")
            .attr("disabled", "disabled");
        $("#alertid")
            .html(`Trying to Connect to the Server ... <i id="statusserverid" class="bi bi-circle-fill text-danger"></i>`)
            .removeClass("alert-danger")
            .addClass("alert-warning");
        $('#portid')
        .attr("disabled" , "disabled")
        initConnection();
        }
    }
});

// Use function expression instead of function declaration
const initConnection = () => {

    socket = io(`http://localhost:${port}`);

    socket.io.on('error', (error) => {
        const message = {
            msg: "",
            tipe: "3",
            name: "Reconnection attempt ..." 
        }
        sendMessageToTextarea(message);
    })

    socket.on('connect', () => {

        $("#alertid")
            .removeClass("alert-danger alert-warning")
            .addClass("alert-success")
            .html(`Connection Establishment <i id="statusserverid" class="bi bi-circle-fill text-success"></i>`);

        $("#nicknameid, #btnconnectid").attr("disabled", "disabled");

        socket.emit('nickname', username);

        socket.on('message', (message) => {
            sendMessageToTextarea(message);
        });

        socket.on('updateusers', (onlineUsers) => {
            users = onlineUsers;
            $("#userid").empty();
            displayOnlineUsers();
        });

        socket.on('discon', (disconnectedUser) => {
            const oldUser = {
                name: `${disconnectedUser} is disconnected`,
                tipe: "3",
            };
            sendMessageToTextarea(oldUser);
        });

        socket.on('connect_error', function(err) {
            console.log("ERROR")
        });

    });

};


const verifyOnlineUsers = () => {
    socket.emit('updateuser');
    scrollElement();
};


const displayOnlineUsers = () => {
    let html = "";
    users.forEach((user) => {
        html += `<div>${user.name} <i class="bi bi-circle-fill text-success"></i></div>`;
    });

    $("#userid").html($("#userid").html() + html);
};


const sendMessageToTextarea = (msg) => {
    const message = msg;
    switch (message.tipe) {
        case "1":
            $("#Chatareaid").html($("#Chatareaid").html() +
                `
        <div class="mb-2 p-2 bg-dark rounded">
            <div>
                <div class="text-white">${message.msg}</div>
                <span class="text-success d-flex justify-content-start" style="font-size: 10px;">${message.name}</span>
            </div>
        </div>
        `);
            break;
        case "2":
            $("#Chatareaid").html($("#Chatareaid").html() +
                `
        <div class="alert alert-success" role="alert">
            ${message.name} is Connected.
        </div>
        `);
            break;
        case "3":
            $("#Chatareaid").html($("#Chatareaid").html() +
                `
        <div class="alert alert-danger" role="alert">
            ${message.name}.
        </div>
        `);
            break;
    }
    verifyOnlineUsers();
    scrollElement();
};


const scrollElement = () => {
    var element = document.getElementById("Chatareaid");
    element.scrollTop = element.scrollHeight;
};