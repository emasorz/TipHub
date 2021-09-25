export class PaymentMethod{
    owner:string;
    number:number;
    cvc:number;
    MM:number;
    YY:number;
    _id:string;
    userId:string;
    constructor( paymentMethod?: PaymentMethod ) {
        if(paymentMethod)
            Object.assign( this, paymentMethod );
    }

    getLast4Digits(){
        return this.number%1000;
    }
}