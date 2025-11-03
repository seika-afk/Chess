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
let currentPlayer="w";

////////////////////////////ROUTES

app.get("/",(req,res)=>{
res.render("index",{title:"Chess Game"});
})

io.on("connection",function(uniqueSocket){
console.log("connected");


//difference :between socket.emit and io.emit
//uniquesocket is refernceing to the person who is on pc and io refers to all the players

if (!players.white){
players.white=uniqueSocket.id;
uniqueSocket.emit("playerRole","w");

}else if(!players.black){

players.black=uniqueSocket.id;
uniqueSocket.emit("playerRole","b");
}
else{
uniqueSocket.emit("spectatorRole");
}

uniqueSocket.on("disconnect",()=>{
	if (uniqueSocket.id=== players.white){
	delete players.white;

	}
	else if (uniqueSocket.id === players.black){
	delete players.black;

	}

 })


//check if move is correct or not

uniqueSocket.on("move",(move)=>{

try{

if(chess.turn()==='w' && uniqueSocket.id != players.white)return;
if(chess.turn()==="b" && uniqueSocket.id != players.black)return;

const result=chess.move(move);

if (result){

currentPlayer=chess.turn();
io.emit("move",move);
io.emit("boardState",chess.fn())
}
else{

console.log("Invalid Move : ", move);
	uniqueSocket.emit("invalidMove",move);
}

}
catch(err){
console.log(err);
uniqueSocket.emit("Invalid move : ",move)
}

})

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














