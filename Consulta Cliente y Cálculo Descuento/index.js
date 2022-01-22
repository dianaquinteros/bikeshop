const fs = require('fs')

// Conexión a Base de Datos
const { Pool } = require("pg");
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "postgres",
    port: 5432,
    database: "bikeshop",
});

// Creación de JSON con datos de clientes
(async () => {
    try {
        const result = await pool.query("SELECT * FROM customers");
        fs.writeFileSync('clientes.json', JSON.stringify(result.rows), (err, data) => {
            if (err) console.log('Ha ocurrido un error al crear JSON de clientes');
        });
        
    } catch (error) {
        console.log(error.code);
        return error;
   
    } finally {
        pool.end();
    }
})().then(()=> consultarCliente());


// Consulta mediante consola indicando nombre de cliente, monto y descuento.
const consultarCliente = () => {
    const argumentos = process.argv.slice(2)
    const nombre = argumentos[0];
    const monto = Number(argumentos[1]);
    const porcentaje = Number(argumentos[2]);

    let clientes = JSON.parse(fs.readFileSync("clientes.json", "utf8"));
    
    let mensaje = '';

    const cliente = clientes.find(c => c.first_name == nombre);
    if (cliente) {
        mensaje = `Cliente: ${cliente.first_name}\n\t Su compra es de $${monto} pesos \n\t porcentaje de descuento ${porcentaje} da un total de: $${monto * (1 - (porcentaje/100))}`;
    } else {
        mensaje = `Don: ${nombre} \n\t Actualmente usted no es cliente en la tienda, favor registrarse para poder realizar compras.`;
    }

    fs.writeFileSync('mensaje.txt', mensaje, (err, data) => {
        if (err) console.log('Ha ocurrido un error al crear mensaje de cliente.');
    });

    fs.readFile("mensaje.txt", "utf8", (error, data) => {
        console.log(data);
    });
}





