const express=require("express");
const bodyParser= require("body-parser");
const request=require("request");
const https=require("https");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");;
})


app.post("/",function(req,res){
    const fname=req.body.firstname;
    const sname=req.body.secondname;
    const email=req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: sname,
                }

            }
        ]
    }
    
    const jsondata= JSON.stringify(data);

    const url= "https://us7.api.mailchimp.com/3.0/lists/294144c0be";

    const options = {
        method : "POST",
        auth : "yuvasree:7b72266f75c503a88094b697ec4e7e4c-us7"
    }

    var request = https.request(url,options,function(response){
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })

        const status=response.statusCode;
        if(status==200)
        {
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }

    })

    request.write(jsondata);
    request.end();
    
});

app.post("/failure",function(req,res){
    res.redirect("/")
})

app.listen(process.env.PORT || 3000,function(){
    console.log("Server is listening on port 3000");
})

//api key
//7b72266f75c503a88094b697ec4e7e4c-us7
//list id
//294144c0be