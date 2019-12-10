--comandos insertados en la consola para la creación de la base de datos.

--creación bdd
CREATE DATABASE queveohoy;
USE queveohoy;

-- creación tabla pelicula
CREATE TABLE pelicula (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100),
    duracion INT(5),
    director VARCHAR(400),
    anio INT(5),
    fecha_lanzamiento DATE,
    puntuacion INT(2),
    poster VARCHAR(300),
    trama VARCHAR(700)
);

--creacion tabla genero
CREATE TABLE genero (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(30)
);

--se crea la columna genero_id a la table pelicula
--para poder relacionar esta tabla con la de genero
ALTER TABLE pelicula ADD COLUMN genero_id INT;
ALTER TABLE pelicula ADD FOREIGN KEY (genero_id) REFERENCES genero (id);

--se crea la tabla actor
CREATE TABLE actor (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(70)
);

--se crea la tabla actor_pelicula que relaciona las tablas pelicula y actor
CREATE TABLE actor_pelicula (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    actor_id INT,
    pelicula_id INT,
    FOREIGN KEY (actor_id) REFERENCES actor(id),
    FOREIGN KEY (pelicula_id) REFERENCES pelicula(id)
);