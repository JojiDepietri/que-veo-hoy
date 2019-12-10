
//importamos la conexion a la base de datos
var con = require('../lib/conexionbd.js');

//funcion que obtiene todas las peliculas a la bdd aplicando filtros, orden y paginacion
function mostrarPeliculas(req, res) {
    var sql = 'SELECT * FROM pelicula WHERE 1+1';
    var titulo = req.query.titulo;
    var anio = req.query.anio;
    var genero = req.query.genero;
    var orden = req.query.columna_orden;
    var pagina = req.query.pagina;
    var cantidad = req.query.cantidad;

    //filtros por titulo, año y genero
    if(titulo) {
        sql += ` AND titulo LIKE "%${titulo}%"`;
    }
    if(anio) {
        sql += ` AND anio = ${anio}`;
    }
    if(genero) {
        sql += ` AND genero_id = ${genero}`;
    }
    //orden de las peliculas
    switch(orden) {
        case 'anio':
            sql += ' ORDER BY anio DESC';
        break;
        case 'puntacion':
            sql += ' ORDER BY puntacion DESC';
        break;
        default:
            sql += ' ORDER BY titulo';
    }

    //guardamos la consulta sin paginación
    sqlTotal = sql;
    //realizamos la paginacion
    sql += ' LIMIT ' + (pagina - 1) * cantidad + ',' + cantidad;

    //consulta que obtiene todas las peliculas a mostrar por pagina
    con.query(sql, function(error, result, fields){
        if (error) {
            console.log('Hubo un error en la consulta', error.message);
            return res.status(404).send('Hubo un error');
        };
        var respuesta = {
            'peliculas': result,
            'total': ''
        };

        //consulta que obtiene el numero total de peliculas
        con.query(sqlTotal, function(errorTotal, resultadoTotal, fieldsTotal){
            if(errorTotal) {
                console.log('Hubo un error en la consulta', error.message);
                return res.status(404).send('Hubo un error'); 
            };
            respuesta.total = resultadoTotal.length;
            res.send(JSON.stringify(respuesta));
        });
    });
}

//funcion que obtiene los generos de la bdd
function mostrarGeneros(req, res) {
    var sql = 'SELECT * FROM genero';
    con.query(sql, function(error, result, fields) {
        if (error) {
            console.log('Hubo un error en la consulta', error.message);
            return res.status(404).send('Hubo un error en la consulta');
        };
        var respuesta = {
            'generos': result
        };
        res.send(JSON.stringify(respuesta));
    });
}

//funcion que obtiene la info de una pelicula segun su id
function mostrarInfoPelicula(req, res) {
    var id = req.params.id;
    var sqlPelicula = 'SELECT * FROM pelicula WHERE id = ' + id;
    var sqlActores = 'SELECT nombre FROM actor JOIN actor_pelicula ON actor.id = actor_pelicula.actor_id JOIN pelicula ON pelicula.id = actor_pelicula.pelicula_id WHERE pelicula.id = ' + id;
    var sqlGenero = 'SELECT nombre FROM genero JOIN pelicula ON genero.id = pelicula.genero_id WHERE pelicula.id = ' + id;
    
    //consulta que obtiene la info de la tabla pelicula
    con.query(sqlPelicula, function(error, result, fields) {
        if (error) {
            console.log('Hubo un error en la consulta1', error.message);
            return res.status(404).send('Hubo un error en la consulta');
        };
        var respuesta = {
            'pelicula': result[0],
            'actores': '',
            'genero': ''
        };

        //consulta que obtiene los nombres de los actores
        con.query(sqlActores, function(errorAct, resultAct, fieldsAct) {
            if (errorAct) {
                console.log('Hubo un error en la consulta2', error.message);
                return res.status(404).send('Hubo un error en la consulta');
            };
            respuesta.actores = resultAct;

            //consulta que obtiene el genero
            con.query(sqlGenero, function(errorGen, resultGen, fieldsGen) {
                if (errorGen) {
                    console.log('Hubo un error en la consulta', error.message);
                    return res.status(404).send('Hubo un error en la consulta');
                };
                respuesta.genero = resultGen[0].nombre;                
                res.send(JSON.stringify(respuesta));
            });
        });
    });
}

//funcion que obtiene las peliculas recomendadas
function mostrarRecomendacion(req, res) {
    var anio_inicio = req.query.anio_inicio;
    var anio_fin = req.query.anio_fin;
    var puntuacion = req.query.puntuacion;
    var genero = req.query.genero;
    var sql = 'SELECT pelicula.*, genero.nombre FROM pelicula';

    //consulta si se selecciona un genero
    if(genero) {
        sql += ` JOIN genero ON pelicula.genero_id = genero.id WHERE genero.nombre = '${genero}' `
    } else {
        sql += ` WHERE 1=1 `
    }
    //consulta si se elige un estreno
    if(anio_inicio === 2005) {
        sql += ` AND anio >= ${anio_inicio} `;
    }
    //consulta si se elige un clásico
    if(anio_inicio === 1900 && anio_fin === 2005) {
        sql += ` AND anio >= ${anio_inicio} AND anio <= ${anio_fin} `;
    }
    //consulta si se eligen peliculas bien puntuadas
    if(puntuacion) {
        sql += ` AND puntuacion >= ${puntuacion} `;
    }

    con.query(sql, function(error, result, fields) {
        if (error) {
            console.log('Hubo un error en la consulta', error.message);
            return res.status(404).send('Hubo un error en la consulta');
        };
        var respuesta = {
            'peliculas': result,
        };
        res.send(JSON.stringify(respuesta));
    });

}

//exportamos todas las funciones creadas
module.exports = {
    mostrarPeliculas: mostrarPeliculas,
    mostrarGeneros: mostrarGeneros,
    mostrarInfoPelicula: mostrarInfoPelicula,
    mostrarRecomendacion: mostrarRecomendacion
};