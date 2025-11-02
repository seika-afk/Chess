//vanilla js -> on the mobile side {not server}
const socket=io();
//broadcasting

socket.emit("maggie") 
socket.on("churan-2-all",()=>{
//this logs on browser log
console.log("churan-2-all receieved to all")

})
