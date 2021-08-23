import { Component, OnInit } from '@angular/core';
import { WebRequestService } from 'src/app/services/web-request.service';

import { Option } from 'src/app/models/option.model';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
  options: Option[];
  userId: string;

  newOption: Option;


  constructor(private webService: WebRequestService, private spinner: NgxSpinnerService) {
    this.userId = '60efccf23f045226ac85337b';
    this.options = [];

    this.spinner.show();
    //todo refactor: servizio a parte
    this.webService.get(`users/${this.userId}/variantsoptions`).subscribe((res: any) => {
      if (res && res.length > 0) {
        for (let i = 0; i < res.length; i++) {
          this.options.push(new Option(res[i].title, res[i].options));
          console.log(this.options);
          this.spinner.hide();
        }
      }
    })
  }


  generateNewOption(event) {
    this.newOption = new Option(event.target.value, []);
    console.log(this.newOption);
  }

  submitNewOption() {
    this.webService.post(`users/${this.userId}/variantsoptions`, this.newOption).subscribe((res) => {
      if (res) {
        this.options.push(this.newOption);
        this.unsetNewOption();
      }
    })
  }

  unsetNewOption() {
    delete this.newOption;
  }

  edit(id){
    let el = document.getElementById(id);

    if(el.getAttribute('data-status') == 'default')
      el.setAttribute('data-status', 'edit');
    else
      el.setAttribute('data-status', 'default');
  }

  ngOnInit(): void {

  }

}
