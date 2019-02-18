
var http = require('http');
var url = require('url');
var config = require('./config');

var server = http.createServer(function(req,res){

    var parseUrl = url.parse(req.url,true);
    var path = parseUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g,''); 

    var chosenHandler = typeof(router[trimmedPath]) !== 'undefined'? router[trimmedPath] : handlers.notFound;
 
     chosenHandler('',function(statuseCode,payload){
       // Use the statuse code called back by the handler, or default to 200
       statuseCode  = typeof(statuseCode) == 'number' ? statuseCode : 200;
   
       // Use  the payload called back by the handler, or default to an empty object
       payload = typeof(payload) == 'object' ? payload : {};
   
       // Convert the payload to a string
       var payloadString = JSON.stringify(payload);
   
     // Send the response.
     res.setHeader('Content-Type','application/json');
     res.writeHead(statuseCode);
     res.end(payloadString);
   
     // Log the request path.
     console.log('Returning this response: ',statuseCode,payloadString);
     });
})

server.listen(config.http,function(){
    console.log("The server is listening on port: "+config.http);
});

 // define the handlers
 var handlers = {};

 // Hello handler
 handlers.hello = function(data,callback){
 // Callback a http status code,and a payload object
 callback(200,{'ping':'pong .... or something',});
 };

 // Not found handler

 handlers.notFound = function(data,callback){
     callback(404);
 }

 // Define a rquest router
 var router = {

    'hello' : handlers.hello
 };