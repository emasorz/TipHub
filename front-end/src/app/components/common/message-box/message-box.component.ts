import { Component, OnInit, Input} from '@angular/core';

export enum MsgCode {
  Primary = 0,
  Secondary = 1,
  Success = 2,
  Danger = 3,
  Warning = 4,
  Info = 5,
  Light = 6,
  Dark = 7
}

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent implements OnInit {

 

  @Input() content: string = "No message provided!";
  @Input() code: number = 7;
  @Input() isVisible: boolean = false;

  classTypes: string[];

  constructor() {
    this.classTypes = [
      "alert-primary", "alert-secondary", "alert-success", "alert-danger", "alert-warning", "alert-info", "alert-light", "alert-dark"
    ]
  }

  ngOnInit(): void {

  }

  fire(content: string, code: MsgCode) {
    this.content = content;
    this.code = code;
    this.isVisible = true;
  }

  hide() {
    this.isVisible = false;
  }

  onDelete(){
    this.content = "";
    this.isVisible = false;
  }

}
