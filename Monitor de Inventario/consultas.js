const { Pool } = require("pg");
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "postgres",
    database: "bikeshop",
    port: 5432,
});

async function getTiendas() {
    const result = await pool.query(`SELECT * FROM stores ORDER BY store_name`);
    return result.rows;
}

async function getCategorias(tienda_id) {
    const consulta = {
        text: `select distinct c.* FROM categories c 
                JOIN products p ON p.category_id = c.category_id 
                JOIN stocks s on s.product_id = p.product_id
                join stores st on st.store_id = s.store_id 
                where st.store_id = $1
                ORDER BY c.category_name`,
        values: Object.values(tienda_id),
    };
    const result = await pool.query(consulta);
    return result.rows;
}

async function getMarcas(categoria_id, tienda_id) {
    const consulta = {
        text: `select distinct b.* FROM brands b
                JOIN products p on p.brand_id = b.brand_id 
                JOIN categories c ON p.category_id = c.category_id 
                JOIN stocks s on s.product_id = p.product_id
                JOIN stores st on st.store_id = s.store_id 
                WHERE c.category_id = $1 AND
                st.store_id = $2
                ORDER BY b.brand_name;`,
        values: [categoria_id, tienda_id]
    };
    const result = await pool.query(consulta);
    return result.rows;
}

async function getProductos(categoria_id, tienda_id, marca_id) {
    console.log('cat', categoria_id)
    const consulta = {
        text: `SELECT st.store_name, 
                p.product_id,
                p.product_name,
                s.quantity
                FROM products p 
                JOIN brands b on p.brand_id = b.brand_id 
                JOIN categories c ON p.category_id = c.category_id 
                JOIN stocks s on s.product_id = p.product_id
                JOIN stores st on st.store_id = s.store_id 
                WHERE c.category_id = $1 AND
                st.store_id = $2 AND
                b.brand_id = $3`,
        values: [categoria_id, tienda_id, marca_id]
    };
    const result = await pool.query(consulta);
    return result.rows;
}

module.exports = {
    getTiendas,
    getCategorias,
    getMarcas,
    getProductos
};
