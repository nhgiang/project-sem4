import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  isshow = false;
  megashow = false;
  megashow1 = false;
  isCollapsed = true;
  isCollapsed2 = true;
  constructor() {}
  
  ngOnInit() {}
}
