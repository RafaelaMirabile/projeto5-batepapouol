let userName;
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
}
