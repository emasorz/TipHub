export class Address{
    country:string;
    city:string;
    zipCode:string;
    street:string;
    type:string;
    def: boolean;
    int:string;
    civ:string;
    owner:string;
    phone:number;
    indications_info:string;
    _id:string;
    userId:string;

    constructor( address?: Address ) {
        if(address)
            Object.assign( this, address );
    }
}