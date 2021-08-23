import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SocialsService } from '../../services/socials.service';

import MagicGrid from "magic-grid";
import { takeUntil } from 'rxjs/operators';


declare var $: any

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  name: string;


  video:any;
  v:any;

  constructor(private route: ActivatedRoute, public socialservice:SocialsService) {
    this.name = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    //script for tab animation
    $(".nav-tabs a").click(function() {
      var position = $(this).parent().position();
      var padding = $(this).parent()
      var width = $(this).parent().width();
      $(".slider").css({"left":+ position.left,"width":width});
    });
    var actWidth = $(".nav-tabs .active").width();
    var actPosition = $(".nav-tabs .active").position();
    $(".slider").css({"left":+ actPosition.left,"width": actWidth});
    //------------------------------------------------------------//

    this.video = this.socialservice.getYtVideoInfo('8OdRMa5xVG8');
   
    this.video.subscribe(val => this.generateYoutubePost(val['items']));

  }



  refresh(): void {
   
  }

  generateYoutubePost(item):void{
    let i = item[0];
    this.v = {
      stat: i.statistics,
      thumb: i.snippet.thumbnails.medium.url,
      title: i.snippet.title
    }
  }
}
