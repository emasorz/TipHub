import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  private chiperKey: string;

  constructor() {
    //todo transfer key to enviroment
    this.chiperKey = "123456$#@$^@1ERF";
  }

   //The set method is use for encrypt the value.
   set(value){
    var key = CryptoJS.enc.Utf8.parse(this.chiperKey);
    var iv = CryptoJS.enc.Utf8.parse(this.chiperKey);
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
    {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
  }

  //The get method is use for decrypt the value.
  get(value){
    var key = CryptoJS.enc.Utf8.parse(this.chiperKey);
    var iv = CryptoJS.enc.Utf8.parse(this.chiperKey);
    var decrypted = CryptoJS.AES.decrypt(value, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }


  getRedirectToken(){
      return this.set(Date.now().toString());
  }

  isValidRedirectToken(token:string){
    let now:number = Date.now();
    let Inttoken = parseInt(this.get(token));

    return now-Inttoken < 3000;
  }


}
