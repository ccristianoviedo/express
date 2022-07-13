const fs = require("fs")

const express = require("express");

const app = express();

const PORT = 8080;

class Contenedor {
    constructor(filename){
        this.filename = filename + ".txt"
    }
    async save(obj) {
        const DefaultState ="[]";
        try {
            const content = await fs.promises.readFile(this.filename, "utf8")
            if(content == ""){
                fs.promises.writeFile(this.filename, DefaultState)
            }
            const array = JSON.parse(content);
            obj.id = array.length + 1;
            array.push(obj);
            await fs.promises.writeFile(this.filename, JSON.stringify(array, null,2));
            console.log('Se ha guardado el objeto con el id: ' + obj.id);            
        } catch (error) {
            console.log("Ocurrio un Error")
        }
    }
    async getById(Number){
        try {
            const content = await fs.promises.readFile(this.filename, "utf8");
            const array = JSON.parse(content);
            const product = array.find(el=> el.id == Number)
            return product
        } catch (error) {
            console.log(null);            
        }
    }
    async deleteById(Number){
        try {
            const content = await fs.promises.readFile(this.filename, "utf8");
            const array = JSON.parse(content);
            const product = array.filter(el=> el.id !== Number)
            await fs.promises.writeFile(this.filename, JSON.stringify(product, null,2));
            console.log(product)
            //await fs.promises.writeFile(this.filename, JSON.stringify(product, null,2))
           
        } catch (error) {
            console.log("No pudo eliminar");            
        }
    }
    async getAll(){
        try {
            const content = await fs.promises.readFile(this.filename, "utf8");
            const array = JSON.parse(content);
            const products = array.map(el=>el)
            const aleatorio = products[Math.floor(Math.random() * products.length)];
            app.get("/productos", (req, res) => { 

                res.send(products);});
            app.get("/productosRandom", (req, res) => {

                res.send(aleatorio);});
        } catch (error) {
            console.log(null);            
        }
    }
    async deleteAll(){
        try {
            const content = await fs.promises.unlink(this.filename, "utf8");
            console.log(content);
        } catch (error) {
            console.log("Archivo Eliminado");            
        }
    }
}
const item1 = {
    title: "Celular",
    price: 424,
    thumbnail: "234"
}
const item2 = {
    title: "Televisor",
    price: 874,
    thumbnail: "135"
}
const item3 = {
    title: "impresora",
    price: 774,
    thumbnail: "635"
}
const work = new Contenedor("desafio")

work.getAll()
 
const server = app.listen(PORT, () => {console.log(`Servidor http escuchando en el puerto ${PORT}`);});
 
 server.on("error", (error) => console.log(`Error en servidor ${error}`));

