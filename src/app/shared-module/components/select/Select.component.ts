/*****************
 I used local storage (vertual data base) to access data because I have not alot of options in fake API to use services
 *****************/
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-select',
  templateUrl: './Select.component.html',
  styleUrls: ['./Select.component.scss']
})
export class SelectComponent implements OnInit {
  @Input() title:string ="";
  @Input() data:any[] = [];
  @Output() selectedValue = new EventEmitter();
  constructor(){}
  detectChanges(event:any) {
    this.selectedValue.emit(event)
  }
  ngOnInit(): void {
    
  }
}
