let userName;
let messages =[];
let chat;
let object;
let campo;

function enterChat(){
    sendUserName();
    setInterval(getMessages ,3000 );

}



function sendUserName(){

    let userName = document.querySelector(".user").value;
    console.log(userName);
    let object = {
        name:userName
      }
    let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants" , object );
    promise.then(getMessages);
    promise.catch(changeUserName);
}
// funcao para pegar as mensagens da API//
function getMessages(){
    console.log("funcao getMessages indo a cada 3s");
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(getData);
}


//funcao para pegar response//
function getData(response){
    messages = response.data;
    messagesOnChat();
    }

//funcao para colocar as mensagens no chat //
function messagesOnChat(){
    let login = document.querySelector(".containerLogin");
    let foot = document.querySelector("footer");
    let head = document.querySelector("header");
    let chat = document.querySelector(".containerChat");
    let ccampo = document.querySelector(".campoErro")

    login.classList.add("none");
    foot.classList.remove("none");
    chat.classList.remove("none");
    head.classList.remove("none");
    ccampo.classList.add("none");



    for(i=0; i < messages.length ; i++){
        if(messages[i].type === "status"){
                chat.innerHTML+=`<div class = "message status"> 
                                    <span class = "time">(${messages[i].time})</span>
                                    <strong> ${messages[i].from}</strong>
                                    <span> ${messages[i].text}</span>
                                </div>`;
        }
        else{
            if(messages[i].type === "message" && messages[i].to === "Todos"){
                chat.innerHTML+=`<div class = "message all"> 
                                    <span class = "time">(${messages[i].time})</span>
                                    <strong> ${messages[i].from} </strong>
                                    para  <strong>${messages[i].to} :</strong>
                                    <span> ${messages[i].text} </span>
                                </div>`;
            }
            else if(messages[i].type === "private_message"){
                    chat.innerHTML+=`<div class = "message private"> 
                                        <span class = "time">(${messages[i].time})</span>
                                        <strong> ${messages[i].from}</strong><span>reservadamente para<span><strong>${messages[i].to}:</strong>
                                        <span> ${messages[i].text}</span>
                                    </div>`;
            }
        }

    }
    scroll();
}

function scroll(){
    const ultima = document.querySelector(".containerChat").lastElementChild;
    console.log(ultima);
    ultima.scrollIntoView();
}

function sendUserMessage(){
    let u = document.querySelector(".user").value;
    let userMessage = document.querySelector(".messageInput").value;
    let messageObject = {
        from: u,
        to: "Todos",
        text: userMessage,
        type: "message" 
    }
    const promise = axios.post ("https://mock-api.driven.com.br/api/v6/uol/messages", messageObject);
    promise.then(getMessages);
    promise.catch(reload);
}

function postStatus(){
    console.log("sendo executada a cada 5s");
    let uN = document.querySelector(".user").value;
    uNObject = {
        name: uN
      }
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", uNObject);
    promise.then(console.log("UserOnChat"));
    promise.catch(()=> console.log("saiu do chat"));

}

function changeUserName(error){
    let campo = document.querySelector(".campoErro");
    if(error.response.status === 400 || userName == null){
        campo.innerHTML = '<span class = "changeName" >Nome de usuário já existente.Por favor escolha outro.</span>'
    }
}

function overlayEffect(){
   let usersLay = document.querySelector(".overlay");
   usersLay.classList.remove("none");
   usersLay.classList.add("flex");   
}
function reload(){
    window.location.reload();
}
