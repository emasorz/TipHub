export class Product{
    price:number;
    quantity:number;
    img:string; 
    thingsCategory:String[];

   
    constructor( product?: Product ) {
        if(product)
            Object.assign( this, product );
        else{
            this.price = 0;
            this.quantity = 0;
            this.img = undefined;
            this.thingsCategory = [];
        }
      }
}
