export class User{
    username:string;
    email:string;
    icon:string;
    remeberMe:string;
    telephone:number;
    emailVerified:boolean;
    firstName:string;
    lastName:string;
    biography:string;

    _id:string;

    constructor( user?: User ) {
        if(user)
            Object.assign( this, user );
    }
}