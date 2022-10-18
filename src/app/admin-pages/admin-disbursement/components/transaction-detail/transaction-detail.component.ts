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

  // getTransactions(){
  //   this.route.queryParamMap.pipe(
  //     switchMap((val)=>{
  //       return this.transactionService.getAllTransactions(this.installment).pipe(map(({data})=>{
  //         console.log(this.installment);
          
  //         if(Object.getOwnPropertyNames(val).length!==0){
  //           return {params:val, data:data};
  //         }else{
  //           this.isPresent=false;
  //           return {params:{page: 1, size: 5, direction: 'Desc'}, data:data};
  //         }
  //       }))
  //     })
  //   ).subscribe({
  //     next: ({data})=>{
  //       console.log(data);
  //       // console.log('fullname'+data.data[0]);
        
  //       this.transactions=data.data;
  //       this.paginate=data;
        
  //     },
  //     error:console.error,
  //   })
  // }


  getDetails(){    
    this.route.params.subscribe((params) => {
      if (params && params['id']) {
        // console.log('param : '+params['id'].trxId);
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
          this.nameCustomer = this.transactionService.nameCustomer;
          this.loanCredit = this.transactionService.loanCredit;
          this.tenor = this.transactionService.tenor;
          this.disbursementStatus = this.transactionService.disbursementStatus;
          console.log('customer name: '+this.nameCustomer);
          
          
        this.transactionDetails=data.data;
          
        }
        ,error:console.error,
       })
       
      }
    })
  
    }



}
