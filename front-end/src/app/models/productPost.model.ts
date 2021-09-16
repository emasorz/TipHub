export class ProductPost{
    title:string;
    summary:string;
    description:string;
    isADraft:boolean;
    img:string;
    customFilter:string[];
    userId:string;
    linkSocials:string[];

    constructor( productPost?: ProductPost ) {
        if(productPost)
            Object.assign( this, productPost );
    }
}