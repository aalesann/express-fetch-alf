const express = require('express')
const morgan = require('morgan');
const path = require('path');
const app = express()


// settings
app.set("port", process.env.PORT || 5500);
// static files
app.use(express.static(path.join(__dirname, "public")));

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

// Rutas

// GET
app.get('/', (req, res)=> {
    // Línea 22 muestra cómo devolver un archivo html que se encuentra dentro de la carpeta public
    res.sendFile(path.join(__dirname, "src/public/index.html"))
})

app.post('/', (req, res)=> {
    res.send()
})

app.put('/', (req, res)=> {
    res.send()
})

app.delete('/', (req, res)=> {
    res.send()
})

// Corriendo el servidor en el puerto 5500
app.listen(app.get('port'), () => console.log(`Server on port ${app.get('port')}`))