import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-devicedetails',
  templateUrl: './devicedetails.component.html',
  styleUrls: ['./devicedetails.component.css']
})
export class DevicedetailsComponent implements OnInit {

  @Input() device: any;
  constructor() { }

  ngOnInit(): void {
  }

}
