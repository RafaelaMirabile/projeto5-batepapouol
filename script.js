let userName;
let messages =[];
let chat;
let object;
let campo;
let users = [];
let participantsList =[];
let contact;
let option;


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
    console.log("funcao pegando mensagens a cada 3s");
    const gif = document.querySelector(".spinner")
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    
    gif.innerHTML+='<img src="images/spinner.gif" alt=""><div>Entrando...</div>';
    
    promise.then(getData);
    setInterval (postStatus, 5000);
    setInterval(getMessages ,3000);
    setInterval(getParticipants, 10000);
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
    let ccampo = document.querySelector(".campoErro");

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
            else if(messages[i].type === "private_message" && messages[i].to === userName){
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
    ultima.scrollIntoView();
}

function sendUserMessage(){
    let messageObject ={};
    let contact = document.querySelector(".selected .contact").innerHTML;
    let option = document.querySelector(".selected2 .visi").innerHTML;
    let userName = document.querySelector(".user").value;
    let userMessage = document.querySelector(".messageInput").value;
    console.log(contact);
    console.log(option);

    if(contact !== undefined && option === "Reservadamente"){
        messageObject ={
            from: userName,
            to: contact,
            text: userMessage,
            type: "private_message" 
        }
    } else {
        messageObject = {
            from: userName,
            to: "Todos",
            text: userMessage,
            type: "message" 
        }

    }
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", messageObject);
    promise.then(getMessages);
    promise.catch(reload);
}

function postStatus(){
    let uN = document.querySelector(".user").value;
    uNObject = {
        name: uN
      }
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", uNObject);
    promise.then(console.log("UserOnChat"));
    promise.catch(()=> console.log("saiu do chat"));

}

function changeUserName(error){
    console.log("nao mandou o nome ");
    let campo = document.querySelector(".campoErro");
    if(error.response.status === 400 || userName == " "){
        campo.innerHTML = '<span class = "changeName" >Nome de usuário já existente.Por favor escolha outro.</span>'
    }
}

function overlayEffect(){
   let usersLay = document.querySelector(".overlay");
   usersLay.classList.remove("none");
   usersLay.classList.add("flex");
   getParticipants();   
}
function reload(){
window.location.reload();
}

// BONUS//
function getParticipants(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants");
    promise.then(participants);
    promise.catch(()=> console.log("requisicao de participantes falhou"));

}

function participants(response){
    console.log("atualizando lista de usuario a cada 10");
    let users = response.data;

    participantsList = document.querySelector(".usersLayer");
    for(i = 0 ; i< users.length ; i++){
        participantsList.innerHTML += `<div class="usersList" onclick= greenCheckMessageTo(this)>
                                            <div>
                                                <ion-icon name="person-circle-outline"></ion-icon>
                                                <span class="contact">${users[i].name}</span>
                                            </div>
                                            <ion-icon class="check" name="checkmark-outline"></ion-icon>
                                        </div>` 
    }
}

function greenCheckMessageTo(check){
    let userSelected = document.querySelector(".selected");

    if(userSelected !== null){
        userSelected.classList.remove("selected");
    }
    check.classList.add("selected");
}

function chooseVisibility(check2){
    let visibility = document.querySelector(".visibility");

    if(visibility !== null){
        visibility.classList.remove("selected2");
    }
    check2.classList.add("selected2");
}

function returnToChat(){
    let userName = document.querySelector(".user").value;
    const back = document.querySelector(".overlay");
    back.classList.remove("flex");
    back.classList.add("none");
    console.log(userName);
    getMessages();
}






