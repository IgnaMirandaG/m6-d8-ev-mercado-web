//importaciones
import express from 'express';
import { create } from 'express-handlebars';
import * as path from "path";
import { fileURLToPath } from "url";


const __dirname = path.dirname(fileURLToPath(import.meta.url));

//instancia express
const app = express();

//llamado servidor
app.listen(3000, ()=>{
    console.log("Servidor funcionando en http://localhost:3000");
});

//Inicio config Handlebars ---------------------
// definir ruta partials
const hbs = create({
    partialsDir: [
        path.resolve(__dirname, "./views/partials/"),
    ],
});
// definir motor Handlebars de express
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));
//Fin config Handlebars ----------------------------

//INICIO MIDDLEWARES ------------------------------
//dejar público carpeta "public"
app.use(express.static("public"));

//dejar públicos los archivos de jquery y bootstrap
app.use('/bootstrap', express.static(path.join(__dirname, "/node_modules/bootstrap/dist")));

app.use('/jquery', express.static(path.join(__dirname, "/node_modules/jquery/dist")));
//FIN MDDLEWARES -------------------------------------


//variable global de array con productos dentro del servidor
let productos = [
    {sku: 1, nombre: "Banana", precio: "$1.000", estado: "Disponible", img:"/assets/img/banana.png"},
    {sku: 2, nombre: "Cebollas", precio: "$1.000", estado: "Disponible", img:"/assets/img/cebollas.png"},
    {sku: 3, nombre: "Lechuga", precio: "$1.000", estado: "Disponible", img:"/assets/img/lechuga.png"},
    {sku: 4, nombre: "Papas", precio: "$1.000", estado: "Disponible", img:"/assets/img/papas.png"},
    {sku: 5, nombre: "Pimentón", precio: "$1.000", estado: "Disponible", img:"/assets/img/pimenton.png"},
    {sku: 6, nombre: "Tomate", precio: "$1.000", estado: "Disponible", img:"/assets/img/tomate.png"}
];

//RUTAS DE VISTAS --------------------------------------
//ruta principal
app.get(["/", "/home", "/inicio"], (req, res) => {
    res.render("home", {
        titulo: "¡Bienvenido al <strong>Mercado Web</strong>!",
        subtitle: "A continuación, seleccione sus productos:",
        productos
    });
});


// ruta por defecto para rutas no definidas
app.get("*", (req, res) => {
    res.render("404");
});

