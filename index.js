
import express from "express";
import ProductController from "./src/Controller/pro.controller.js";

import ejslayouts from "express-ejs-layouts";
import path from "path";

// import error file for new products
import validateReq from "./src/Middleware/Error.js";

const server = express();

server.use(express.static("public"));

server.use(express.static('src/views'))

const productController = new ProductController();
// setting up middleware of ejs layout
server.use(ejslayouts);
// setting up the new_pro.ejs file to add data in pro.ejs
server.use(express.urlencoded({extended:true}));

// setting up ejs server
server.set("view engine", "ejs" )
server.set("views", path.join(path.resolve(),"src", "views"))

// const productController = new ProductController();
server.get("/", productController.getProduct);
server.get("/new", productController.getAddFrom);

//for update
server.post("/update", productController.productUpdate)
server.get("/update/:id", productController.getProductUpdate);

//for delete the products
server.post("/delete/:id", productController.deleteProduct);

server.post("/", validateReq, productController.addNewPro);


server.listen(3004);

console.log("Server listen on port 3004");
