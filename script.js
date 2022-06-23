let userName;
let messages =[];
let chat;
let object;

function enterChat(){
    let login = document.querySelector(".containerLogin");
    let foot = document.querySelector("footer");
    let head = document.querySelector("header");
    chat = document.querySelector(".containerChat");

    
    login.classList.add("none");
    foot.classList.remove("none");
    chat.classList.remove("none");
    head.classList.remove("none");
    sendUserName();
    setInterval (sendUserName, 5000);
    setInterval(getMessages ,3000 );
    
}

function sendUserName(){
    console.log("enviando userName para parc API cada 5s");
    let userName = document.querySelector(".user").value;
    console.log(userName);
    let object = {
        name:userName
      }
    let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants" , object );
    promise.then(getMessages);
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
    for(i=0; i < messages.length ; i++){
        if(messages[i].type === "status"){
                chat.innerHTML+=`<div class = "message status"> 
                                    <span class = "time">(${messages[i].time})</span>
                                    <strong> ${messages[i].from}</strong>
                                    <span> ${messages[i].text}</span>
                                </div>`;
        }
        else{
            if(messages[i].type === "message"){
                chat.innerHTML+=`<div class = "message all"> 
                                    <span class = "time">(${messages[i].time})</span>
                                    <strong> ${messages[i].from} </strong>
                                    <span> ${messages[i].text}</span>
                                </div>`;
            }
            else if(messages[i].type === "private_message"){
                    chat.innerHTML+=`<div class = "message private"> 
                                        <span class = "time">(${messages[i].time})</span>
                                        <strong> ${messages[i].from}"reservadamente para"${messages[i].to}</strong>
                                        <span> ${messages[i].text}</span>
                                    </div>`;
            }
        }

    }
    scroll();
}
// mandando o nome para entrar e sair //


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
    console.log(userName);
    const promise = axios.post ("https://mock-api.driven.com.br/api/v6/uol/messages", messageObject)
    promise.then(getMessages);
    promise.catch(resolveError);
}
function resolveError(){
    alert("errrrou")
}
