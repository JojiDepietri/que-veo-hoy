//paquetes necesarios para el proyecto
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
//referencia al controlador que contienen las funcionalidades del proyecto
var controlador = require('./controladores/controlador.js');

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

//llamadas al controlador
app.get('/peliculas/recomendacion?', controlador.mostrarRecomendacion);
app.get('/peliculas?', controlador.mostrarPeliculas);
app.get('/generos', controlador.mostrarGeneros);
app.get('/peliculas/:id', controlador.mostrarInfoPelicula);

//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});

