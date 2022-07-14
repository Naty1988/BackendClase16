const knex = require ('knex')

// Configuración mysql

const config = {
    client: 'mysql',
    connection: {
        host: "127.0.0.1",
        user: "root",
        password: "",
        database: "producto"
    },
    pool: {min: 0, max: 7},
}

// Configuración sqlite3

const configSqlite3 = {
    client: 'sqlite3',
    connection: { filename: './src/db/mydb.sqlite' }, 
    useNullAsDefault: true
}

// Conexión

const databaseConnection = knex(config)

const databaseConnectionSqlite3 = knex(configSqlite3)

// Crear tabla con mysql

createTable = async () => {
    try {
        
        await databaseConnection.schema.dropTableIfExists('producto')
        await databaseConnection.schema.createTable('producto', productoTable => {

            productoTable.increments('id').primary()
            productoTable.string('nombre', 50).notNullable()
            productoTable.integer('precio').notNullable()
            productoTable.string('url').notNullable()

        })
        console.log("tabla de productos creada")
        databaseConnection.destroy()

    } catch (error) {
        console.log("Hubo un error en createTable")
        databaseConnection.destroy()
    }
}

// Crear tabla con sqlite3

createTableSqlite3 = async () => {
    try {
        
        await databaseConnectionSqlite3.schema.dropTableIfExists('mensaje')
        await databaseConnectionSqlite3.schema.createTable('mensaje', mensajeTable => {

            mensajeTable.increments('id').primary()
            mensajeTable.string('mail', 50).notNullable()
            mensajeTable.string('fecha').notNullable()
            mensajeTable.string('msg').notNullable()

        })
        console.log("tabla de productos creada")
        databaseConnectionSqlite3.destroy()

    } catch (error) {
        console.log(`Hubo un error en createTableSqlite3: ${error}`)
        databaseConnectionSqlite3.destroy()
    }
}

// createTable()
createTableSqlite3()

module.exports = databaseConnection
// module.exports = databaseConnectionSqlite3
