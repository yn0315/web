var express = require('express');
var app = express();
var fs = require('fs');
const bodyParser = require('body-parser');
const mysql = require('mysql');  // mysql 모듈 로드



const conn = {  // mysql 접속 설정
    host: '43.201.38.255',
    port: '3306',
    user: 'my_db_admin',
    password: '0000',
    database: 'my_db'
};


var connection = mysql.createConnection(conn); // DB 커넥션 생성
connection.connect();   // DB 접속


// var host = ''

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.listen(3000, function() {
    console.log('server Start.')

})
console.log("-11111")

app.get('/', function (req,res){
    fs.readFile('/index.html',function(error,data){
        if (error){
            console.log(error);
        }else{
            res.writeHead(200,{'Content-Type': 'text/html'});
            res.end(data);
        }
    });
});
// app.get("/", async function(req, res) {
//     const result = await randomfact();
//     res.send(result);
//     console.log(randomfact());
//  });
console.log("0000000000000")
app.post('/index.html', function(req, res)
{   
  

    
    
    const name = req.body.name;
    const telno = req.body.telno;
    const companyName = req.body.companyName;
    const email = req.body.email;
    const budget = req.body.budget;
    const message = req.body.message;


    console.log(req.body.name);
    console.log(req.body.telno);
    console.log(req.body.companyName);
    console.log(req.body.email);
    console.log(req.body.budget);
    console.log(req.body.message);

    res.redirect('/');
    
    

    
    
    let insert_query = `insert into my_db.contact values('${name}','${telno}','${companyName}','${email}','${budget}','${message}')`;
    // let select_query = `select * from my_db.contact`;
    console.log(insert_query);
    let commit_query = `commit`;

    connection.query(insert_query, function (err, results, fields)
    {
        if(err)
        {
            console.log(err);
        }
        else 
        {
            console.log('ok');
            
        }


        
    });

    connection.query(commit_query, function (err, results, fields)
    {
        if(err)
        {
            console.log(err);
        }
        else 
        {
            console.log('ok');
            
        }


        
    });


    // return res.writeHead(200,{'Content-Type': 'text/html'});

    
    // connection.query(select_query, function (err, results, fields)
    // {
    //     if(err)
    //     {
    //         console.log(err);
    //     }
    //     else 
    //     {   
    //         console.log(results[0].user_name);
    //     }

        
    // });
});









