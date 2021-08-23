export class ProductPost{
    
    title:string;
    summary:string;
    description:string;
    isADraft:boolean;
    img:string;

    constructor( productPost?: ProductPost ) {
        if(productPost)
            Object.assign( this, productPost );
    }
}