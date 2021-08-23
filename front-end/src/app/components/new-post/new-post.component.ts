import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebRequestService } from 'src/app/services/web-request.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  isExpanded:boolean;
  files: File[] = [];
  constructor(private webService: WebRequestService) { }

  ngOnInit(): void {
    this.isExpanded = false;
  }

  expand(){
    this.isExpanded = !this.isExpanded;
  }

  //dropzone 
  onSelect(event) {
      console.log(event);
      this.files.push(...event.addedFiles);
      console.log(this.files);

      // const formData = new FormData();
  
      // for (var i = 0; i < this.files.length; i++) { 
      //   formData.append("file[]", this.files[i]);
      // }
 
      // this.http.post('http://localhost:8001/upload.php', formData)
      // .subscribe(res => {
      //    console.log(res);
      //    alert('Uploaded Successfully.');
      // })
  }

  onRemove(event) {
      console.log(event);
      this.files.splice(this.files.indexOf(event), 1);
  }

  onSubmit(){
    let userId = '60efccf23f045226ac85337b';
    this.webService.post(`users/${userId}/productposts`, new Object())
  }
}
