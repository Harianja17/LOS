import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionDetailResponse, TransactionResponse } from 'src/app/shared/model/transaction.model';
import { ServiceService } from '../service/service.service';
import { map,switchMap } from 'rxjs';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.css']
})
export class TransactionDetailComponent implements OnInit {
  pageTitle:string='Disbursement'

  constructor(private readonly transactionService: ServiceService,
    private readonly route: ActivatedRoute , private readonly router:Router) { }
  transactionDetails:TransactionDetailResponse[]=[];
  transaction?:TransactionResponse;
  nameCustomer:String ='';
  loanCredit:String='';
  disbursementStatus :String ='';
  tenor:String='';

  ngOnInit(): void {
    this.getDetails()
  }



  getDetails(){    
    this.route.params.subscribe((params) => {
      if (params && params['id']) {
       this.transactionService.getTransactiondetail(params['id']).subscribe({
        next:({data})=>{
          this.nameCustomer = data.fullName;
          this.loanCredit = data.nominalLoan;
          this.tenor = data.tenor;
          this.disbursementStatus = data.disbursementStatus;
          this.transactionDetails=data.data;
        }
        ,error:console.error,
       })
       
      }
    })
  
    }



}
