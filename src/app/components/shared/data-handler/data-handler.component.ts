import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-handler',
  templateUrl: './data-handler.component.html',
  styleUrls: ['./data-handler.component.css']
})
export class DataHandlerComponent implements OnInit {
  @Input() dataLength: number;
  @Input() loading = false;
  constructor() { }

  ngOnInit(): void {
  }

}
