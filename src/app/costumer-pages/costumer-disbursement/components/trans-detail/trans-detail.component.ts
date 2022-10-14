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

  getDetails(){

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
