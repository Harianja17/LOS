import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trans-detail',
  templateUrl: './trans-detail.component.html',
  styleUrls: ['./trans-detail.component.css']
})
export class TransDetailComponent implements OnInit {
  pageTitle:string='Disbursement'

  constructor() { }

  ngOnInit(): void {
  }
  tenorsList: any = 
    {
    id: "000",
    paymentDue: 0,
    installmentTotal: 0,
    paymentStatus: "STATUS",
    disbursementDate: new Date('2022-08-19')
    }
}
