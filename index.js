const express = require('express')
const app = express()

var obj = {
    "user1":"arun", 
    "user2":"karan",
    "user3":"kumar",
    "user4":"naresh"
};

// to handle GET request
app.get('/users', (req, res) => { 
    res.send(obj) 
}) 

// to handle query string and path variable in urls
app.get('/users/:id', (req, res) => { 
    if(obj[req.params.id]){
        res.send(obj[req.query.id]);     
    }else{
        res.send("user not found");             
    }
})

// to handle POST request
app.post('/users', (req, res) => { 
    res.send("new user created");                 
}) 

// to handle PUT request
app.put('/users/:id', (req, res) => { 
    res.send("updated the user %s", req.params.id);
}) 

// to handle DELETE request
app.delete('/users/:id', (req, res) => { 
    res.send("deleted the user %s", req.params.id);
}) 

app.listen(8000, () => { 
    console.log('Example app listening on port 8000!');
 })