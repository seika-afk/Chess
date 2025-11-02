const express=require("express");
const socket=require("socket.io");
const http=require("http")
const {Chess}= require("chess.js")
const path = require("path");
const { warn } = require("console");

const app=express();
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
const server=http.createServer(app);

//instantiating socket io 

// express(server) _> connected to HTTP(server) _> connected to socket

const io=socket(server)

const chess=new Chess();


//settng up variables
//
let players={};
let Cplayer="w";

////////////////////////////ROUTES

app.get("/",(req,res)=>{
res.render("index",{title:"Chess Game"});
})

io.on("connection",function(uniqueSocket){
console.log("connected");


//uniqueSocket.on("disconnect",()=>{
//console.log("disconnected")

//})

//on io fn , it receieves any emition coming from the frontend vanilla js 0-> that leads to data sending

//	 uniqueSocket.on("maggie",()=>{
//console.log("maggie recieved")
	 
//to send data to all:
//	io.emit("churan-2-all");
	 //})

})

server.listen(3000,function(){
console.log("Listening on port 3000");

})














