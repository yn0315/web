var express = require('express');
var app = express();
var fs = require('fs');
const bodyParser = require('body-parser');
const mysql = require('mysql');  // mysql 모듈 로드
var ejs = require("ejs");
const path = require('path');
const http = require('http');
const morgan = require('morgan');

const indexRouter = require('./routes');
const mapRouter = require('./routes/map');
const { Post } = require('./routes');
const cors = require('cors');
// const options = {
//     key: fs.readFileSync('/path/to/private.key'),
//     cert: fs.readFileSync('/path/to/certificate.crt'),
// };


app.use((morgan('dev')));

const PORT = process.env.PORT || 3000;

// app.use(cors());

// const corsOptions = {
//     origin: 'http://yn0315.shop'
//   };

// app.use(cors(corsOptions));

app.use(cors({
    origin: '*', // 모든 도메인 허용
    methods: '*', // 모든 메서드 허용
    allowedHeaders: '*' // 모든 헤더 허용
  }));
app.listen(PORT, function () {
    console.log('server Start.')

})

app.use(function(req,res,next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header('Access-control-Allow-Headers', 'Origin, X-Requested-With,Content-Type,Accept');
    next();
});


// const conn = {  // mysql 접속 설정
//     host: 'localhost',
//     port: '3306',
//     user: 'root',
//     password: '0000',
//     database: 'my_db'
// };

// http.createServer(options, app).listen(80);


const conn = {  // mysql 접속 설정
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '0000',
    database: 'my_db'
};

// const conn = {  // mysql 접속 설정
//     host: '13.125.66.227',
//     port: 3306,
//     // user: 'root',
//     // password: '0000',
//     // database: 'my_db'
// };


var connection = mysql.createConnection(conn); // DB 커넥션 생성
connection.connect();   // DB 접속

// var router = express.Router();

app.set('view engine', 'ejs');



// const map = require('./routes/map.html');
// router.route('/map').get(function (req, res) {
//     res.redirect('/map.html');
// });
// app.use('/public', static(path.join(__dirname, 'public')));

// app.use(bodyParser.urlencoded({extended:false}));
// app.use(bodyParser.json());



app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));
// app.use(express.static(__dirname + "/views/public"));


console.log("-11111")

// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');

// app.set('views', __dirname + '/views/public');
// app.set('view engine', 'ejs');

// router.route('/').get(function (req, res) {
//     res.redirect('/index.ejs');
// });

app.get('/', function (req, res) {
    fs.readFile('/index.html', 'utf-8',function (error, data) {
        if (error) {
            console.log(error);
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });

           res.end(data); 
        }
    });
    
});

// app.use('/', indexRouter);
// app.use('/map', mapRouter);


// app.get('*', function (request, response){
//     response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
//   })

// app.get('/map', function (req,res) {
    // fs.readFile('/map.html', 'utf-8',function (error, data) {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         res.writeHead(200, { 'Content-Type': 'text/html' });

    //        res.end(data); 
    //     }
    // });


//     res.sendFile(path.join(__dirname, 'public', 'map.html'));
// })

// app.get('/map', function (req,res){
//     fs.readFile('/public/map.html',function(error,data){
//         if (error){
//             console.log(error);
//         }else{
//             res.writeHead(200,{'Content-Type': 'text/html'});
//             res.end(data);
//         }
//     });
// });

app.get('/map', function (req, res) {
    fs.readFile(__dirname+ '/public/map.html', function (error, data) {
        if (error) {
            console.log(error);
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });

            res.end(data);
        }
    });
    // const filePath = 'map.html';
    // console.log(filePath);
    // res.sendFile(filePath);
    // res.sendFile('./public/map.html');
    // res.redirect(__dirname + '/public/map.html');
    
    
});

// app.get("/", async function(req, res) {
//     const result = await randomfact();
//     res.send(result);
//     console.log(randomfact());
//  });
console.log("0000000000000")


// router.route('/board').get((req, res) => {
//     res.redirect('views/public/board.ejs');
// });

app.post('/submit', function (req, res) {

    const name = req.body.name;
    const telno = req.body.tel;
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

    // res.redirect('/');

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
            // res.header("Access-Control-Allow-Origin","http://yn0315.shop")

            res.header('Content-Type','text/plain');
            res.end('200',res.redirect('/'));

            // location.href = 'http://yn0315.shop';
            // res.redirect('/');
            
            // fs.readFile(__dirname+ '/public/index.html', function (error, data) {
            //     if (error) {
            //         console.log(error);
            //     }

            // });

            // var status = {

            //     "status": 200,
            
            //     "message": 'success'
            
            //   }
            
            //   res.send(JSON.stringify(status));
            
            


        }



    });


    // fs.readFile('/map.html',function(error,data){
    //     if (error){
    //         console.log(error);
    //     }else{
    //         res.writeHead(200,{'Content-Type': 'text/html'});

    //         res.end(data);
    //     }
    // });
    // res.redirect('/');


    // res.writeHead(200,{'Content-Type': 'text/html'});
    // res.send('200');



});

app.get('/board', function (req, res) {

     
    let select_query = `select * from my_db.board`;
    

    connection.query(select_query, function(err, results, fields){
        if (err) throw err;  // 에러 있으면 띄우고
        console.log(results);
        results.reverse();
        res.render(__dirname + '/views/public/board.ejs', {users : results}); 
        console.log(results); // getlist.ejs 에 render 해줄건데 , users 에 쿼리문 날리고난 results 를 담을거다 
    });
    // res.redirect('/board.ejs');


    
    // fs.readFile('views/public/board.ejs', 'utf-8',function (error, data) {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         res.writeHead(200, { 'Content-Type': 'text/html' });

    //         res.end(data);
    //     }
    // });

    
    // let select_query = `select num from my_db.board`;

    //  connection.query(select_query, function (err, results, fields)
    // {
    //     if(err)
    //     {
    //         console.log(err);
    //     }
    //     else 
    //     {
    //         console.log('ok');

    //         res.render("views/public/board.ejs",{
    //             num : select_query
    //         })

    //     }


    // });

    // fs.readFile('/board.html', function (error, data) {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         res.writeHead(200, { 'Content-Type': 'text/html' });

    //         res.end(data);
    //     }
    // });
    // res.redirect('/board.html');

    // let select_query = `select num from my_db.board`;


    // let select_query = `select * from my_db.contact`;
    // console.log(insert_query);
    // let commit_query = `commit`;

    // connection.query(insert_query, function (err, results, fields)
    // {
    //     if(err)
    //     {
    //         console.log(err);
    //     }
    //     else 
    //     {
    //         console.log('ok');

    //         res.render("/board.html",{
    //             num : select_query
    //         })

    //     }



    // });
    // res.redirect('/board.html');
    // res.render("/board.html", {
        // num: select_query
    // })

    // res.send(
    //     fs.readFile('/board.html', function (error, data) {
    //         if (error) {
    //             console.log(error);
    //         } else {
    //             res.writeHead(200, { 'Content-Type': 'text/html' });
    
    //             res.end(data);
    //         }
    //     })
    // );

    
});

app.post('/board/write', function (req, res) {

    // res.redirect('/index.html');

    // fs.readFile('/index.html',function(error,data){
    //     if (error){
    //         console.log(error);
    //     }else{
    //         res.writeHead(200,{'Content-Type': 'text/html'});

    //         res.end(data);
    //     }
    // });
    
    const writer = req.body.writer;
    const title = req.body.title;
    const content = req.body.content;

    var today = new Date();

    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    var hours = ('0' + today.getHours()).slice(-2); 
    var minutes = ('0' + today.getMinutes()).slice(-2);


    var dateString = year + '-' + month  + '-' + day + ' ' + hours + ":" + minutes;

    console.log(dateString);



    let insert_query = `insert into my_db.board values(null,'${writer}','${title}','${content}','${dateString}')`;
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
    res.redirect('/index.html');


});

app.get('/article/:title', function (req, res) {
    // Post.findById(req.params.title, function (err, post) {
        
        // const title = req.body.title;
        const title = req.params.title;

        let select_query = `select * from my_db.board where title = '${title}'`;
        // let select_query = `select * from my_db.contact`;
        console.log(select_query);
        let commit_query = `commit`;
    
       
        connection.query(select_query, function(err, results, fields){
            if (err) throw err;  // 에러 있으면 띄우고
            console.log(results);
            
            res.render(__dirname + '/views/public/article.ejs', {users : results}); 
            console.log(results); // getlist.ejs 에 render 해줄건데 , users 에 쿼리문 날리고난 results 를 담을거다 
        });
       
        // res.render(__dirname + '/views/public/article.ejs', {users : results});
    // })
  

});

// app.use('/',router);





