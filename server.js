const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000; // armazena a variavel de ambiente, caso não exista, seta 3000

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
}); // next é obrigatório para o middleware seguir em frente.

// app.use((req, res, next) => {
//   res.render('maintenance.hbs'); // caso não usar o next, a pagina de manutencao sempre sera exibida, pois é o next que finaliza a operacao

// });

app.use(express.static(__dirname + '/public')); // Creating a middleware // dirname stores the path of host

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
}); //name of argument + function to run

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome!'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Project Page',
    Message: 'Portfolio Page Here!'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to fulfill this request'
  });
});

app.listen(port, () => {
  console.log(`Server is up at port ${port}`);
});
