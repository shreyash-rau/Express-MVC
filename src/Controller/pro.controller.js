// import path from "path";

import ProductModel from "../Models/pro.model.js";

class ProductController{
    
    getProduct(req, res){
        // console.log(path.resolve())
        let products = ProductModel.get();
        // console.log(products)
        res.render("pro", {products:products, userEmail:req.session.userEmail})

        // res.sendFile(
        // path.join(path.resolve(), "src", "Views", "pro.html"),
        // )
    }

    // new-products formation controller
    getAddFrom(req, res){
        res.render("new_pro",{
            userEmail:req.session.userEmail
        })
    }

    // adding new product from new_pro.ejs
    addNewPro(req, res){
        // console.log(req)
        const {name, desc, price} = req.body;
        const img = "image/" + req.file.filename;
        // to adding the new pro with pro file
        // console.log(req.body)
        ProductModel.addP(name, desc, price, img)
        var products = ProductModel.get();
        res.render("pro", {products, userEmail:req.session.userEmail})
    }

    // to update the product 
    getProductUpdate(req, res){
        const id = req.params.id;
        const proFind = ProductModel.getProId(id);
        if(proFind){
            res.render("update",{product:proFind, 
                errorMassage:null, 
                userEmail:req.session.userEmail })
        }else{
            res.status(401).send("Product Not Found")
        }
    }
    productUpdate(req, res){
        ProductModel.update(req.body)
        console.log(req.body)
        var products = ProductModel.get();
        res.render("pro", {products})
    }

//for deleteing the products
    deleteProduct(req, res){
        const id = req.params.id;
        const proFind = ProductModel.getProId(id);
        if(!proFind){
            return res.status(401).send("Product Not Found")
        }
        ProductModel.delete(id);
        var products = ProductModel.get();
        res.render("pro", {products})

    }

}

export default ProductController;