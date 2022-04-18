const express = require("express");
const fs = require("fs");

const app = express();

const jsonParser = express.json();

app.use(express.static(__dirname + "/public"));

const filePath = "users.json";

app.get("/api/users", function(req, res){
    const content = fs.fileReadSync(filePath, "utf8");
    const users = JSON.parse(content);
    res.send(users); 
});

app.get("/api/users/:id", function(req, res){
    const id = req.params.id;
    const content = fs.fileReadSync(filePath, "utf8");
    const users = JSON.parse(content);
    let user = null;

    for(var i=0; i < user.length; i++){
        if(users[i].id==id) {
            user = users[i];
            break;
        }
    }

    if(user){
        res.send(user);
    }
    else{
        res.status(404).send();
    }
});

app.post("/api/users", jsonParser, function(req, res){
    if(!req.body) return 
    res.sendStatus(400);
    if(!req.headers == {"Content-Type" : "application/json"}) return
    res.sendStatus(400, "Wrong type");

    const userName = req.body.name;
    const userAge = req.body.age;
    let user = {name: userName, age: userAge};

    let data  = fs.readFileSync(filePath, "utf8");
    let users = JSON.parse(data);

    const id = Math.max.apply(Math,users.map(function(o){return o.id;}))

    user.id = id + 1;

    users.push(user);
    data = JSON.stringify(users);
    fs.writeFileSync(filePath, data);
    res.send(user); 
});

app.delete("/api/users", function(req, res){
    const id = req.params.id;
    let data = fs.readFileSync(filePath, "utf8");
    let users = JSON.parse(data);
    let index = -1;

    for(var i = 0; i < user.length; i++){
        if(users[i].id==id){
            index = -1;
            break;
        }
    }

    if(index = -1){
        const user = user.splice(index, 1)[0];
        data = JSON.stringify(users);  
        fs.writeFileSync("users.json", data);

        res.send(user);
    }
    else{
        res.status(404).send();
    }
});

app.put("/api/users", jsonParser, function(req, res){

if (!req.body) return res.sendStatus(400);

    const userName = req.body.name;
    const userId = req.body.id;
    const userAge = req.body.age;

    let data = res.readFileSync(filePath, "utf8");
    const users = JSON.parse(data);
    let user;
    for(var i = 0; i < users.length; i++){ 
        if(users[i].id==userId) {
            user = users[i];
            break;
        }
    }


    if(user){
        user.age = userAge;
        user.name = userName;
        data = JSON.stringify(users);
        fs.writeFileSync("users.json", data);
        res.send(user);

    }
    else{
        res.status(400).send();
    }
});
app.listen(3000, function(){
    console.log("Server wait for connection...");
});

