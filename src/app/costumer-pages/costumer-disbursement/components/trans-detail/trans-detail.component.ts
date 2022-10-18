import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map,switchMap } from 'rxjs';
import { TransactionDetailResponse } from 'src/app/shared/model/transaction.model';
import { ServiceService } from '../../customer-trans-service.service';

@Component({
  selector: 'app-trans-detail',
  templateUrl: './trans-detail.component.html',
  styleUrls: ['./trans-detail.component.css']
})
export class TransDetailComponent implements OnInit {
  pageTitle:string='Disbursement'

  constructor(private readonly transactionService: ServiceService,
    private readonly route: ActivatedRoute , private readonly router:Router) { }

  transactionDetails:TransactionDetailResponse[]=[];
  ngOnInit(): void {
    this.getDetails()
  }
  nameCustomer:String ='';
  loanCredit:String='';
  disbursementStatus :String ='';
  tenor:String='';

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
