

// import UserModel from "../Models/user.model1";

import UserModel from "../Models/user.model1.js";
import ProductModel from "../Models/pro.model.js";

class UserController{
 // for register page    
    getRegister(req, res){
        res.render("register1");
    }
// for login page
    getLogin(req, res){
        res.render("login");
    }

   // method to extract and render to login page
   postRegister(req, res){
    const {name, email, password} = req.body
    UserModel.add(name, email, password);
    res.render("login");
   }

   postLogin(req, res){
    const {email, password} = req.body
    const user = UserModel.isValidUser(email, password);
    if (!user){
       return res.send("Invalid Credentials") 
    }
// to validate the mail from login page to check and render on home page
    req.session.userEmail= email;
    let products = ProductModel.get();
     res.render("pro", {products:products, userEmail:req.session.userEmail})
     }
     logout(req, res){
        //to destry the running function
        req.session.destroy((err)=>{
            if(err){
                console.log(err);
            }else{
                res.redirect("/login")
            }
        })
        res.clearCookie('lastVisit');
     }

}

export default UserController; 






