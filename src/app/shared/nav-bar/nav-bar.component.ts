import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Input() navLabel: string = "Site"; 
  @Input() btnLabel: string = "DEFALUT"; 
  @Input() colorNav: string = "indigo"; 
  @Input() container: boolean = true; 

  @Output() 
  public onClick = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  onClickEvent(event) 
  {
    this.onClick.emit(event);
  }
}
