const { Router } = require('express')
const router = Router()
const { getProducts, addProduct, showForm } = require('../controllers/productsController')
const knex = require('knex')

router.get('/products', getProducts)
router.post('/products', addProduct)
router.get('/productsForm', showForm)

// Configuración msql

const config = {
    client: 'mysql',
    connection: {
        host: "127.0.0.1",
        user: "root",
        password: "",
        database: "producto"
    },
    pool: { min: 0, max: 7 },
}

// Contenedor productos

class Contenedor {
    constructor(config, producto) {

        this.config = config,
        this.producto = producto

    }

// Método agregar productos

    static insertProducts = async () => {
        const databaseConnection = knex(config)
        try {

            const productos = [
                { nombre: "regla", precio: 100, url: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png" },
                { nombre: "lapiz", precio: 200, url: "https://cdn3.iconfinder.com/data/icons/education-209/64/pencil-pen-stationery-school-512.png" },
                { nombre: "cuaderno", precio: 300, url: "https://cdn2.iconfinder.com/data/icons/mixed-rounded-flat-icon/512/note-512.png" },
            ]

            await databaseConnection('producto').insert(productos)

            console.log("productos agregados")
            databaseConnection.destroy()

        } catch (error) {
            console.log(`Hubo un error en insertProducts ${error}`)
            databaseConnection.destroy()
        }
    }

// Método obtener productos

    static getAll = async () => {
        const databaseConnection = knex(config)
        try {
            const productosFromDatabase = await databaseConnection.from('producto').select('*')
            productosFromDatabase.forEach(pro => {
                console.log(`
                Nombre: ${pro.nombre}
                Precio: ${pro.precio}
                Url: ${pro.url}`)
            })

            databaseConnection.destroy()

        } catch (error) {
            console.log(`Hubo un error en getAll ${error}`)
            databaseConnection.destroy()
        }
    }

// Método obtener productos por ID

    static getById = async (id) => {
        const databaseConnection = knex(config)
        try {
            const productosFromDatabase = await databaseConnection.from('producto').select('*').where('id', '=', 2)
            productosFromDatabase.forEach(pro => {
                console.log(`
                Nombre: ${pro.nombre}
                Precio: ${pro.precio}
                Url: ${pro.url}
                `)
            })

            databaseConnection.destroy()

        } catch (error) {
            console.log(`Hubo un error en getById ${error}`)
            databaseConnection.destroy()
        }
    }

// Método actualizar productos

    static updateProduct = async () => {
        const databaseConnection = knex(config)
        try {
            const productosFromDatabase = await databaseConnection.from('producto').select('precio', 'id')
            await Promise.all(productosFromDatabase.map(async prod => {
                await databaseConnection.from('producto').where("id", "=", prod.id).update({ precio: (prod.precio / 2) })
            }))

            console.log('precios actualizados')
            databaseConnection.destroy()

        } catch (error) {
            console.log(`Hubo un error en updateProduct ${error}`)
            databaseConnection.destroy()
        }
    }

// Método borrar producto por ID

    static deleteProduct = async () => {
        const databaseConnection = knex(config)
        try {
            const productosFromDatabase = await databaseConnection.from('producto').select('*')
            for (const prod of productosFromDatabase) {
                if (prod.nombre === "lapiz") {
                    await databaseConnection.from('producto').where("id", "=", prod.id).del()
                }
            }

            console.log('producto borrado')
            databaseConnection.destroy()

        } catch (error) {
            console.log(`Hubo un error en deleteProduct ${error}`)
            databaseConnection.destroy()
        }
    }

// Método borrar tabla de productos

    static deleteTable = async () => {
        const databaseConnection = knex(config)
        try {
            const productosFromDatabase = await databaseConnection.from('producto').del()


            console.log('tabla borrada')
            databaseConnection.destroy()

        } catch (error) {
            console.log(`Hubo un error en deleteTable ${error}`)
            databaseConnection.destroy()
        }
    }


}

// Ejecución de métodos de la clase Constructor: 

// Contenedor.insertProducts()
// Contenedor.getAll()
// Contenedor.getById()
// Contenedor.updateProduct()
// Contenedor.deleteProduct()
// Contenedor.deleteTable()

// Configuración sqlite3

const configSqlite3 = {
    client: 'sqlite3',
    connection: { filename: './src/db/mydb.sqlite' },
    useNullAsDefault: true
}

// Creación de clase para mensajes

class ContenedorMensaje {
    constructor(configSqlite3, mensaje) {

        this.configSqlite3 = configSqlite3,
            this.mensaje = mensaje

    }

// Método agregar mensajes

    static insertMensaje = async () => {
        const databaseConnectionSqlite3 = knex(configSqlite3)
        try {

            const mensajes = [
                { mail: 'usuario1@gmail.com', fecha: "30/06/22", msg: 'Hola desde usuario 1' },
                { mail: 'usuario2@gmail.com', fecha: "30/06/22", msg: 'Hola desde usuario 2' }
            ]

            await databaseConnectionSqlite3('mensaje').insert(mensajes)

            console.log("mensajes agregados")
            databaseConnectionSqlite3.destroy()

        } catch (error) {
            console.log(`Hubo un error en insertMensaje ${error}`)
            databaseConnectionSqlite3.destroy()
        }
    } 

}

// Ejecución de métodos de la clase ConstructorMensajes: 

ContenedorMensaje.insertMensaje()

module.exports = router