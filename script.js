let userName;
let messages =[];
let chat;

function enterChat(){
    let login = document.querySelector(".containerLogin");
    let foot = document.querySelector("footer");
    let head = document.querySelector("header");
    chat = document.querySelector(".containerChat");

    userName = document.querySelector(".user").value;
    
    login.classList.add("none");
    foot.classList.remove("none");
    chat.classList.remove("none");
    head.classList.remove("none");
    getMessages();
}

// funcao para pegar as mensagens da API//
function getMessages(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(getData);
}


function getData(response){
messages = response.data;
console.log(messages);
messagesOnChat();
}

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
                chat.innerHTML+=`<div class = "message message"> 
                                    <span class = "time">(${messages[i].time})</span>
                                    <strong> ${messages[i].from}</strong>
                                    <span> ${messages[i].text}</span>
                                </div>`;
            }
            else if(messages[i].type === "private_message"){
                    chat.innerHTML+=`<div class = "message message"> 
                                        <span class = "time">(${messages[i].time})</span>
                                        <strong> ${messages[i].from}</strong>
                                        <span> ${messages[i].text}</span>
                                    </div>`;
            }
        }

    }
 


            

    
}
