let userName;
let messages =[];
let chat;
let object;
let campo;
let users = [];
let participantsList =[];
let contact;
let option;
let foot;

function sendUserName(){
    let userName = document.querySelector(".user").value;
    let object = {
        name:userName
      }
    let promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants" , object);
    promise.then(getMessages);
    promise.catch(changeUserName);
}

function getMessages(){
    let er = document.querySelector(".erro");
    const gif = document.querySelector(".spinner");
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    
    er.classList.remove("flex")
    er.classList.add("none");
    gif.innerHTML+='<img src="images/spinner.gif" alt=""><div>Entrando...</div>';
    
    promise.then(getData);
    setInterval (postStatus,5000);
    setInterval(getMessages,3000);
    setInterval(getParticipants,10000);
}

function getData(response){
    messages = response.data;
    messagesOnChat();
    }

function messagesOnChat(){
    let userName2 = document.querySelector(".user").value;

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
            else if(messages[i].type === "private_message" && (messages[i].to === userName2  || messages[i].from === userName2 )){
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
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", messageObject);
    promise.then(getMessages);
    promise.catch(reload);
}

function postStatus(){
    let uN = document.querySelector(".user").value;
    uNObject = {
        name: uN
      }
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/status", uNObject);
    promise.then(console.log("UserOnChat"));
    promise.catch(()=> console.log("saiu do chat"));
}

function changeUserName(error){
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

function getParticipants(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/uol/participants");
    promise.then(participants);
    promise.catch(()=> console.log("requisicao de participantes falhou"));

}

function participants(response){
    let users = response.data;

    participantsList = document.querySelector(".usersLayer");
    for(i = 0 ; i < users.length ; i++){
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

    addFooter();   
}

function chooseVisibility(check2){
    let visibility = document.querySelector(".selected2");

    if(visibility !== null){
        visibility.classList.remove("selected2");
    }
    check2.classList.add("selected2");
    addFooter();
}

function addFooter(){
    
    let fadd = document.querySelector(".add");
    let option = document.querySelector(".selected2 .visi").innerHTML;
    let contact = document.querySelector(".selected .contact").innerHTML;
    
    if(contact !== undefined && option === "Reservadamente"){
        fadd.innerHTML =`<div>Enviando para ${contact} (reservadamente)</div>`;
    } else if (contact === "Todos" && option === "Público"){
        fadd.classList.add("none");
    }
}

function returnToChat(){
    let userName = document.querySelector(".user").value;
    const back = document.querySelector(".overlay");
    back.classList.remove("flex");
    back.classList.add("none");
    getMessages();
}






