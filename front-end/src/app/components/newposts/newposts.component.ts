import { Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations'
import { WebRequestService } from 'src/app/services/web-request.service';

import { Option } from 'src/app/models/option.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { StepperComponent } from '../tools/stepper/stepper.component';


import { initPackery } from '../../../assets/js/packery';
import { AuthService } from 'src/app/services/auth.service';
import { ProductPost } from 'src/app/models/productPost.model';
import { ProductPostService } from 'src/app/services/product-post.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { MessageBoxComponent, MsgCode } from '../common/message-box/message-box.component';


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
  @Output() newPostEvent = new EventEmitter<ProductPost>();

  @ViewChild(StepperComponent) stepper: StepperComponent;
  @ViewChild(MessageBoxComponent) messageBox: MessageBoxComponent;

  @ViewChild('mydiv') set div(div: ElementRef) {
    if (div) {
      // initially setter gets called with undefined
      console.log(div);
      initPackery();
    }
  }
  model: ProductPost;

  files: File[] = [];
  isOptions: boolean;
  postMultimedias: any = [];
  selectedImg = 0;
  currentStep = 1;

  tags = [];
  options: Option[];
  selected = [];

  constructor(private webService: WebRequestService,
    private spinner: NgxSpinnerService,
    private auth: AuthService,
    private prodPostService: ProductPostService,
    private prodService: ProductService
  ) {
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
        }
      }
    })
  }


  onSubmit() {
    console.log("Sto creando!");
    this.model.isADraft = false;
    this.model.img = this.postMultimedias[this.selectedImg];
    console.log(this.model);
    this.prodPostService.patchProductPost(this.auth.getUserId(), this.newpostId, this.model).subscribe((newProductpost: ProductPost) => {
      newProductpost['_id'] = this.newpostId;
      this.newPostEvent.emit(newProductpost);
      this.onReset();
    })
  }

  ngOnInit(): void {


  }

  onLimitTextLenght(event, len) {
    if (!(event.key === "Backspace")) {
      console.log(event.target.value);
      if (event.target.value.length >= len) {
        event.target.value = event.target.value.substring(0, len);
      }
    }
  }



  /**
   * DropZone Functions
  */
  onSelect(event, images) {
    this.spinner.show();
    if (event.rejectedFiles.length > 0) {
      this.messageBox.fire("Immagine troppo grande!", MsgCode.Warning);
    } else {
      for(var i = 0; i< event.addedFiles.length; i++){
        if(this.files.map((e) => { return e.name }).includes(event.addedFiles[i].name)){
          event.addedFiles.splice(i,1);
          this.messageBox.fire("uno o più immagini sono già state caricate!", MsgCode.Warning);
        }
      }
        this.files.push(...event.addedFiles);
        this.readmultifiles(event.addedFiles, images);

        this.spinner.hide();
    }
  }

  //recursive funtion
  private readmultifiles(files, images) {
    var reader = new FileReader();  
    function readFile(index) {
      if( index >= files.length ) {
        return;
      }
      var file = files[index];
      reader.onload = function() {  
        var dataURL = reader.result;
        images.push(dataURL);
        readFile(index+1)
      }
      reader.readAsDataURL(file);
    }
    readFile(0);
  }

  onRemove(index) {
    //let position = this.files.indexOf(event);
    this.postMultimedias.splice(index, 1);
    this.files.splice(index, 1);
  }



  /**
   * Stepper Functions
   */

  next() {
    console.log(this.postMultimedias);
    if (this.currentStep == 5) {
      this.onSubmit();
    } else {
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
  handleCategory(target, category) {
    if (this.model.customFilter.indexOf(category) > -1) {
      this.model.customFilter.splice(this.model.customFilter.indexOf(category), 1);
    } else {
      if (this.model.customFilter.length < 3) {
        this.model.customFilter.push(category);
      }
    }
  }

  setPrice(event) {
    this.prodService.getProducts(this.auth.getUserId(), this.newpostId).subscribe((products: Product[]) => {
      let min = Infinity;
      for (let i = 0; i < products.length; i++) {
        if (products[i].price < min) {
          min = products[i].price;
        }
      }
      this.model.price = min.toString();
    })
  }

  onReset() {
    this.model = new ProductPost();
    this.files = [];
    this.postMultimedias = [];
    this.currentStep = 1;
    this.stepper.reset();

    this.prodPostService.deleteProductPost(this.auth.getUserId(), this.newpostId).subscribe((deletedProdPost:ProductPost)=>{
      console.log(deletedProdPost);
      if(deletedProdPost){
        this.prodPostService.createProductPost(this.auth.getUserId(), new ProductPost()).subscribe((newProductPost:ProductPost)=>{
          console.log(newProductPost);
          if(newProductPost)
            this.newpostId = newProductPost['_id'];
        })
      }
    })
    console.log(this.category);
  }
}
