
import express from "express";
import ProductController from "./src/Controller/pro.controller.js";


//importing new register file here
import UserController from "./src/Controller/user.controller1.js";

import ejslayouts from "express-ejs-layouts";
import path from "path";

// import error file for new products
import validateReq from "./src/Middleware/Error.js";

import { fileUpload } from "./src/Middleware/fileUpload.js";

//importing auth from auth.middle.js file
import { auth } from "./src/Middleware/auth.middelware.js";

//importing the session from express-session
import session from "express-session";

// importing cookies and setlocalvisit options
import cookieParser from "cookie-parser";
import { setLastVisit } from "./src/Middleware/lastVisit.niddleware.js";

const server = express();

//user express-session toto validate login page 
server.use(session({
    secret:"SecretKey",
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false}
}))

server.use(express.static("public"));

//using cookies andd setlastvisit here
server.use(cookieParser());
// server.use(setLastVisit);

server.use(express.static('src/views'))

const productController = new ProductController();
// creating instances to register page 
const usersController =  new UserController();


// setting up middleware of ejs layout
server.use(ejslayouts);
// setting up the new_pro.ejs file to add data in pro.ejs
server.use(express.urlencoded({extended:true}));

// setting up ejs server
server.set("view engine", "ejs" )
server.set("views", path.join(path.resolve(),"src", "views"))


// get request for new register page
server.get("/register1", usersController.getRegister);
server.get("/login", usersController.getLogin);
server.post("/login", usersController.postLogin);

server.get("/logout", usersController.logout);


// to render login page after register for that using post methods
server.post("/register", usersController.postRegister);


// const productController = new ProductController();
server.get("/", auth, setLastVisit, productController.getProduct);
server.get("/new",auth, productController.getAddFrom);

//for update
server.post("/update", auth, productController.productUpdate)
server.get("/update/:id", auth,productController.getProductUpdate);

//for delete the products
server.post("/delete/:id", auth, productController.deleteProduct);

// server.post("/", validateReq, productController.addNewPro);
server.post("/", auth, fileUpload.single("img"),
validateReq, productController.addNewPro);



server.listen(3005);

console.log("Server listen on port 3005");
