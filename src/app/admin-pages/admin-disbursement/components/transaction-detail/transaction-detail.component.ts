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
  ngOnInit(): void {
    this.getDetails()
  }

  getDetails(){
    // this.transactionService.getTransactiondetail().subscribe((val)=>{
    //   console.log(val.data);
      
      
    // })
    this.route.params.subscribe((params) => {
      if (params && params['id']) {
       this.route.queryParamMap.pipe(
        switchMap((val)=>{
          return this.transactionService.getTransactiondetail(params['id']).pipe(map(({data})=>{
            if(Object.getOwnPropertyNames(val).length!==0){
              return {params:val,data:data};
            }
            else{
              return{params:{page:1,size:5,direction:'Desc'},data:data};
            }
          }))
          
        })
       ).subscribe({
        next:({data})=>{
          console.log('datanya : ',data);
          console.log(data);
          
        this.transactionDetails=data.data;
          
        }
        ,error:console.error,
       })
       
      }
    })
  
    }



}
