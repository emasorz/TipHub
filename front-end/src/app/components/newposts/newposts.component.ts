import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations'
import { WebRequestService } from 'src/app/services/web-request.service';

import { Option } from 'src/app/models/option.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { StepperComponent } from '../tools/stepper/stepper.component';

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

  @ViewChild(StepperComponent) stepper: StepperComponent;

  files: File[] = [];
  postMultimedias: any = [];
  selectedImg = 0;
  currentStep = 1;

  tags = [];
  options: Option[];
  selected = [];


  constructor(private webService: WebRequestService, private spinner: NgxSpinnerService) {
    let userId = '60efccf23f045226ac85337b';
    this.options = [];
    this.webService.get(`users/${userId}/variantsoptions`).subscribe((res: any) => {
      if (res && res.length > 0) {
        for (let i = 0; i < res.length; i++) {
          this.options.push(new Option(res[i].title, res[i].options));
          this.spinner.hide();
        }
      }
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
    this.currentStep++;
    this.stepper.next();
  }

  prev() {
    this.currentStep--; 
    this.stepper.prev();
  }

  onSelectedClick(target, option: Option) {
    if (target.classList.contains('select')) {
      target.classList.remove('select');
      this.selected.splice(this.selected.map(function (e) { return e.getTitle(); }).indexOf(option.getTitle()), 1);
    } else {
      target.classList.add('select')
      this.selected.push(option);
    }
  }
}
