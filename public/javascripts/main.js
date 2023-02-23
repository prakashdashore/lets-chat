const socket = io();
var btn = document.querySelector("#btn")
var input = document.querySelector("#search")
var promt = document.querySelector("#promt")
var usr = document.querySelector("#usr")
var join = document.querySelector("#join")
var typ = document.querySelector("#typ")
var outGoing = document.querySelector(".outgoing");
var inComing = document.querySelector(".incoming");
var joined = document.querySelector("#joined");
var online = document.querySelector("#online");
var menu = document.querySelector("#menu");
var too = document.querySelector("#toggle")
var cha = document.querySelector("#cha")



function toggl(){
let flag = 0
  menu.addEventListener("click",function(e){
    if(flag===0){
      too.style.top="10%";
      flag = 1;
      cha.src ="../images/cross.png"

    }else{
      too.style.top = "-100%"
      cha.src ="../images/menuu.png"

      flag = 0;

    }
    
  })
 


}
toggl()







join.addEventListener("click", () => {
    promt.style.display = "none";
    // var username =usr.value;
    socket.emit("con-user", usr.value);
    socket.on("user-joined", function (joinedUser) {
        joined.style.display = "initial";
        joined.innerHTML = `<p><span>${joinedUser}&nbsp;</span>,,Joined the chat</p>`
        setTimeout(function () {
            joined.style.display = "none"

        }, 5000)


    })


})

socket.on("user-disc", function (leftusr) {
  joined.style.display = "initial";
  joined.innerHTML = `<p><span>${leftusr}&nbsp;</span>,,Left the chat</p>`
  setTimeout(function () {
      joined.style.display = "none"

  }, 5000)


})

btn.addEventListener("click", function () {
    socket.emit("msg", { msg: input.value, username: usr.value })
    outGoing.innerHTML += `
    <div id="out-msg" class="massges" >
                <h6>
                  ${input.value}
                </h6>
              </div>
    `

    input.value = ""
    typ.innerHTML = ""

})
let globle;
socket.on("rtnmsg", function (res) {

    inComing.innerHTML += `
    <div id="in-msg" class="massges" >
                <h6>
                  ${res.msg}
                </h6>
              </div>
    `

    console.log(res.msg)

    console.log(`${res.username}  Joined a chat`)
    globle = res.username;



})

input.addEventListener("input", function (e) { socket.emit("typing", e) })
socket.on("typing", function (resp) {
    typ.innerHTML = `Someone is typing... `
    setTimeout(function () {
        typ.innerHTML = ""

    }, 1400)

})


let onlineUsers = 0;
socket.on("user-list",function(userList){
  userArr = Object.values(userList)
  var clutter = '';
  userArr.forEach(function(e){
    
    clutter += `
    <div class="temps">
    <img src="../images/user.png" alt="">
    <div class="username">${e}</div>
  </div>
    `;
    

  })
  document.querySelector("#other-part").innerHTML = clutter;
  onlineUsers = userArr.length
  online.textContent = onlineUsers;
  

})