// import {body, validationResult} from "validator";
import {body, validationResult} from "express-validator"

const validateReq = async (req, res, next) =>{

    // const {name, price, img} = req.body;
    // let error = [];

    // // for name validattion 
    // if (!name || name.trim() == ""){
    //     error.push("Enter Valid Name")
    // }
    // // for price validation
    // if (!price || parseFloat(price) < 1){
    //     error.push("Enter Valid Price")
    // }
    // // for img url validation
    // try {
    //     const validUrl = new URL(img);
    // } catch (error) {
    //     error.push("Enter Valid URL for Image")        
    // }
    //     // error is not occur then msg not show
    //     if(error.length > 0 ){
    //         return res.render("new_pro" , {
    //             errorMassage : error[0]
    //         })
    //     }
    //    next();

    // usingrxpress validator methods
    const rules = [
        body("name").notEmpty().withMessage("Enter Valid Name"),
        body("price").isFloat({gt:0}).withMessage("Enter a Valid price"),
        // body("img").isURL().withMessage("Enter Valid URL")
    ]
    await Promise.all(rules.map((rule)=>rule.run(req)))

    const validError = validationResult(req);
    if(!validError.isEmpty() ){
        return res.render("new_pro" , {
            errorMassage : validError.array()[0].msg
        })
    }
   next();

}


export default validateReq;