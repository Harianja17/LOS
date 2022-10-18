import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageResponse } from 'src/app/shared/model/PageResponse';
import { TransactionResponse } from 'src/app/shared/model/transaction.model';
import Swal from 'sweetalert2';
import { ServiceService } from '../../customer-trans-service.service';
import { map, switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';



@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  pageTitle:string='Disbursement'
  isPresent:boolean=true;
  transactions: TransactionResponse[]=[];
  currentPaginate: { [key: string]: any } = {page: 1, size: 5};
  paginate?: Omit<PageResponse<any>, "content">

  constructor(private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly transactionService:ServiceService) { }

  ngOnInit(): void {
    this.authService.getUserFromToken()
    .subscribe(data => {
      this.nik=data.data.nik
      console.log(this.nik);
      this.getTransactions();
    });
    // this.transactionService.notify().subscribe(() => {
    //   this.getTransactions();
    // })
   
    
  }
  statusClass(disbursementStatus: string): string {
    if (disbursementStatus=== 'Disbursed') return 'disbursed';
    if (disbursementStatus === 'Failed') return 'failed';
    if (disbursementStatus === 'On Progress') return 'on progress';
    return '';
  }
  items = [
    {name: "SIX_MONTHS", type: "type2"},
    {name: "TWELVE_MONTHS", type: "type3"},
    {name: "TWENTY_FOUR_MONTHS", type: "type4"},
    {name: "THIRTY_SIX_MONTHS", type: "type5"}

];
nik:string='';
installment:string='SIX_MONTHS'
setInstallment(event:any){

  this.installment=event
  this.getTransactions();
  
}

  getTransactions(){
    this.route.queryParamMap.pipe(
      switchMap((val)=>{
        console.log(this.nik);
        
        return this.transactionService.getAllTransactions(this.installment,this.nik).pipe(map(({data})=>{
         console.log(data);
         
          
          if(Object.getOwnPropertyNames(val).length!==0){
            return {params:val, data:data};
          }else{
            this.isPresent=false;
            return {params:{page: 1, size: 5, direction: 'Desc'}, data:data};
          }
        }))
      })
    ).subscribe({
      next: ({data})=>{
        console.log(data);
        // console.log('fullname'+data.data[0]);
        
        this.transactions=data.data;
        this.paginate=data;
        
      },
      error:console.error,
    })
  }
  moveToDetails(data : TransactionResponse){
    this.router.navigateByUrl("/disbursement/details/"+data.trxId)
  }
  async onTableDataChange(page: number) {
    this.currentPaginate = {...this.currentPaginate, page: page}
    await this.router.navigateByUrl(`/list?page=${this.currentPaginate['page']}&size=${this.currentPaginate['size']}`)
    this.getTransactions();
  }

}
