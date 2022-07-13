const express = require("express");

const app = express();

const PORT = 8080;

let visitas = 0;

app.get("/", (req, res) => {res.send({ mensaje: "holA" });});

app.get("/visitas", (req, res) => {
    
    visitas++;
    res.send(`<h1>Cantidad de visitas del sitio ${visitas}</h1>`);});

app.get("/fyh", (req, res) => {
    let time = new Date();
    res.send(`<h1> ${time}</h1>`
);});

const server = app.listen(PORT, () => {console.log(`Servidor http escuchando en el puerto ${PORT}`);});

server.on("error", (error) => console.log(`Error en servidor ${error}`));