import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations'
import { WebRequestService } from 'src/app/services/web-request.service';

import { Option } from 'src/app/models/option.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { StepperComponent } from '../tools/stepper/stepper.component';


import { initPackery } from '../../../assets/js/packery';
import { AuthService } from 'src/app/services/auth.service';
import { ProductPost } from 'src/app/models/productPost.model';
import { ProductPostService } from 'src/app/services/product-post.service';

@Component({
  selector: 'app-newposts',
  templateUrl: './newposts.component.html',
  styleUrls: ['./newposts.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('200ms ease-in', style({ transform: 'translateX(0%)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-out', style({ transform: 'translateX(-100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class NewpostsComponent implements OnInit {
  category = [" Moda, abbigliamento e accessori",
    "Lusso",
    "Salute e bellezza",
    "Elettronica",
    "Gioielli e orologi",
    "Handmade",
    "Sport",
    "App, giochi e software",
    "Cibi e cucina",
    "Film e serie",
    "Informatica",
    "Lettura",
    "Musica e strumenti",
    "Viaggi ed Eventi",
    "Veicoli",
    "Arredamento ed elettromestici",
    "Arte",
    "Fai da te e giardinaggio",
    "Immobiliari",
    "Industria",
    "Cancelleria",
    "Prima infanzia",
    "Altro"
  ];

  
  @Input() newpostId = null;
  @ViewChild(StepperComponent) stepper: StepperComponent;

  @ViewChild('mydiv') set div(div: ElementRef) {
    if (div) { 
      // initially setter gets called with undefined
      console.log(div);
      initPackery();
    }
  }
  model: ProductPost;

  files: File[] = [];
  isOptions:boolean;
  postMultimedias: any = [];
  selectedImg = 0;
  currentStep = 1;

  tags = [];
  options: Option[];
  selected = [];

  constructor(private webService: WebRequestService,
              private spinner: NgxSpinnerService,
              private auth: AuthService,
              private prodPostService:ProductPostService
  ){
    this.isOptions = false;
    this.model = new ProductPost();
    this.model.customFilter = [];


    //refactor option own model and service
    this.options = [];
    this.webService.get(`users/${this.auth.getUserId()}/variantsoptions`).subscribe((res: any) => {
      console.log("RISPOSTA:", res);
      if (res && res.length > 0) {
        for (let i = 0; i < res.length; i++) {
          this.options.push(new Option(res[i].title, res[i].options));
          this.spinner.hide();
        }
      }
    })


  }

  onSubmit(){
    console.log("Sto creando!");
    this.model.isADraft = false;
    this.model.img = this.postMultimedias[this.selectedImg];
    console.log(this.model);
    this.prodPostService.patchProductPost(this.auth.getUserId(),this.newpostId, this.model).subscribe((newProductpost:ProductPost)=>{
      console.log(newProductpost);
    })
  }

  ngOnInit(): void {


  }



  /**
   * DropZone Functions
  */
  onSelect(event, images) {
    this.files.push(...event.addedFiles);
    var reader = new FileReader();
    reader.onload = function () {
      var dataURL = reader.result;
      images.push(dataURL);
    };
    reader.readAsDataURL(this.files[this.files.length - 1]);
    
  }

  
  onRemove(event) {
    let position = this.files.indexOf(event);
    this.postMultimedias.splice(position, 1);
    this.files.splice(position, 1);
  }



  /**
   * Stepper Functions
   */

  next() {
    console.log(this.postMultimedias);
    if(this.currentStep==5){
      this.onSubmit();
    }else{
      this.currentStep++;
      this.stepper.next();
    }
  }

  prev() {
    this.currentStep--;
    this.stepper.prev();
  }

  //rename
  onSelectedClick(target, option: Option) {
    if (target.classList.contains('select')) {
      target.classList.remove('select');
      this.selected.splice(this.selected.map(function (e) { return e.getTitle(); }).indexOf(option.getTitle()), 1);
    } else {
      target.classList.add('select')
      this.selected.push(option);
    }
  }

  //rename
  handleCategory(target, category){
    if(this.model.customFilter.includes(category)){
      target.classList.remove('category-selected');
      this.model.customFilter.splice(this.category.indexOf(category),1);
    }else{
      this.model.customFilter.push(category);
      target.classList.add('category-selected');
    }
  }

}
