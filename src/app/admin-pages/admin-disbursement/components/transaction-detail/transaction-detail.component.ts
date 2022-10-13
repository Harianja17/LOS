import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.css']
})
export class TransactionDetailComponent implements OnInit {
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
