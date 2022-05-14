const express = require('express');
const session = require('express-session'); // sessão
const bodyParser = require('body-parser');

const port = 3000;
var path = require('path');
const app = express();

var login = "admin";
var password = "admin"

app.use(session({secret:'home6415684198key'}));
app.use(bodyParser.urlencoded({extended:true}));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/views'));

app.post('/', (req, res)=>{

  if(req.body.password == password && req.body.login == login){
    // logado com sucesso
    req.session.login = login;
    
    res.render('logado',{login: login});

  }else{
    res.render('index');
  }
});

app.get('/', (req, res) =>{
  if(req.session.login){
    res.render('logado',{login: login});
    console.log('O meu usuário logado é: '+ req.session.login);
  }else{
    res.render('index');
  }
  
});


app.listen(port, () => {
  console.log('servidor rodando'); 
});