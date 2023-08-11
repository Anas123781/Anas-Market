/*****************
 I used local storage (vertual data base) to access data because I have not alot of options in fake API to use services
 *****************/
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-head',
  templateUrl: './main-head.component.html',
  styleUrls: ['./main-head.component.scss']
})
export class MainHeadComponent implements OnInit{
  @Input() header:string | undefined;
  ngOnInit(): void {
  }

}
