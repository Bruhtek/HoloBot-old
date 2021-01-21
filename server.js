const express = require('express');
const server = express();

server.all('/', (req, res)=>{
    res.send('Your bot is alive!')
})

function keepAlive(){
    server.listen(3001, ()=>{console.log("Server is Ready!")});
}
//export server
module.exports = keepAlive;