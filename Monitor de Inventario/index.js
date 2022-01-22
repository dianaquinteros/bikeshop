const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { getTiendas, getCategorias, getMarcas, getProductos } = require("./consultas");

app.listen(3000, () => console.log('Server ON, listening port 3000'));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/tiendas", async (req, res) => {
    try {
        const tiendas = await getTiendas();
        res.send(tiendas);
    } catch (error) {
        res.status(500).send(`Hubo un error, intente nuevamente. ${error}`);
    }
});

app.get("/categorias", async (req, res) => {
    let tienda_id  = req.query;
    try {
        const categorias = await getCategorias(tienda_id);
        res.send(categorias);
    } catch (error) {
        res.status(500).send(`Hubo un error, intente nuevamente. ${error}`);
    }
});

app.get("/marcas", async (req, res) => {
    let { tienda_id, categoria_id } = req.query;
    try {
        const marcas = await getMarcas(tienda_id, categoria_id);
        res.send(marcas);
    } catch (error) {
        res.status(500).send(`Hubo un error, intente nuevamente. ${error}`);
    }
});

app.post("/productos", async (req, res) => {
    const { tienda_id, categoria_id, marca_id } = req.body;
    try {
        const productos = await getProductos(tienda_id, categoria_id, marca_id);
        res.send(productos);
    } catch (error) {
        res.status(500).send(`Hubo un error, intente nuevamente. ${error}`);
    }
});