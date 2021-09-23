import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  subscription: Subscription;
  results: any[];
  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {
    const search = this.route.snapshot.queryParamMap.get('search') || "";
    console.log(search);
    this.userService.searchUser(search).subscribe((res) => {
      this.results = res;
    })
  }

  math = Math;
  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  search(res) {

  }

}
