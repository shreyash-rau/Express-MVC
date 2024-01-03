// import path from "path";

import ProductModel from "../Models/pro.model.js";

class ProductController{
    
    getProduct(req, res){
        // console.log(path.resolve())

        let products = ProductModel.get();
        
        // console.log(products)

        res.render("pro", {products:products})

        // res.sendFile(
        // path.join(path.resolve(), "src", "Views", "pro.html"),
        // )
    }

    // new-products formation controller
    getAddFrom(req, res){
        return res.render("new_pro")
    }

    // adding new product from new_pro.ejs
    addNewPro(req, res){
        // to adding the new pro with pro file
        console.log(req.body)
        ProductModel.addP(req.body)
        var products = ProductModel.get();
        return res.render("pro", {products:products})
    }

    // to update the product 
    getProductUpdate(req, res){
        const id = req.params.id;
        const proFind = ProductModel.getProId(id);
        if(proFind){
            res.render("update",{product:proFind, errorMassage:null })
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