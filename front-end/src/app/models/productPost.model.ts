export class ProductPost{
    title:string;
    summary:string;
    description:string;
    isADraft:boolean;
    img:string;
    customFilter:string[] = [];
    userId:string;
    linkSocials:string[];
    price:string;
    _id:string;

    constructor( productPost?: ProductPost ) {
        if(productPost)
            Object.assign( this, productPost );
    }
}