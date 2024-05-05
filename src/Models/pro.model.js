

class ProductModel{

    constructor(id, name, desc, price, img){
        this.id = id,
        this.name= name,
        this.desc = desc,
        this.price = price,
        this.img = img
    }

    static get(){
        return products;
    }

    
    // for update the product
    static update(proObj){
        const index = products.findIndex(p => p.id === proObj.id);
        products[index] = proObj;
    } 



    // form new_pro.ejs file to add info in pro.ejs
    static addP(name, desc, price, img){
        let newPro = new ProductModel(
            products.length + 1,
            name, desc, price, img
        );
        products.push(newPro);
    }

    // for updating a product with respect to id 
    static getProId(id){
        return products.find((product)=>product.id == id);
    }


    //for deleting the products
    static delete(id){
        const index = products.findIndex(p =>p.id == id);
        products.splice(index, 1);
        // return products;
    }
}

export default ProductModel;


var products = [
    new ProductModel(
    1, 'Atomic Habits', 'A supremely Practical and useful book.',"449" 
),
new ProductModel(
    2, 'Atomic Habits', 'A supremely Practical and useful book.',"449" 
)
]






















