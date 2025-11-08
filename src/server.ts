import express from 'express'
import colors from 'colors'
import router from './router'
import db from './config/db'

//conectar a base de datos
async function connectDB() {
    try{
        await db.authenticate()
        db.sync()
        console.log(colors.bgWhite.green('conexion exitosa'))
    } catch(error){
        console.log(error)
        console.log( colors.bgRed.white('hubo un error al conectar a la db' ) )
    }
}

connectDB()


const server = express()

//leer datos de formularios
server.use(express.json())

server.use('/api/film', router)

export default server