import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MultiuseService } from '../multiuse.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css'],
  providers: [MultiuseService]
})
export class ExploreComponent implements OnInit {
  puneData;
  mumbaiData;
  constructor(private router: Router, private multi: MultiuseService) { }

  ngOnInit() {
    this.multi.getPune().subscribe(res => this.puneData = res);
    this.multi.getMumbai().subscribe(res => this.mumbaiData = res);
  }

}
