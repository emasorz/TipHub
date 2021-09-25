import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/address.model';
import { AddressService } from 'src/app/services/address.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {
  model:Address;
  user;
  addresses:Address[];

  constructor(private auth:AuthService, private router:Router, private addressService:AddressService) {
    this.model = new Address();

    this.auth.isLoggedIn().then((user)=>{
      if(user[0]){
        console.log("user:", user[0]);
        this.user = user[0];
      }else{
        console.log("redirecting");
        this.router.navigate(['login']);
      }
    }).catch(e =>{
      console.log(e);
    })

    addressService.getAddress(auth.getUserId()).subscribe((addresses:Address[])=>{
      this.addresses = addresses;
    })
    
   }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.model)
    this.addressService.postAddress(this.auth.getUserId(), this.model).subscribe((newAddress) =>{
      console.log(newAddress);  
      this.addresses.push(newAddress);
    })
  }

  onDelete(postId:string){
    this.addressService.deleteAddress(this.auth.getUserId(), postId).subscribe((deleteAddress:Address)=>{
      console.log(deleteAddress);
      this.addresses.splice(this.addresses.map((e) =>{return e['_id']}).indexOf(postId),1);
    })
  }
}
