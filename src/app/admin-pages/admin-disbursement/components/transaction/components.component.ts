import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import { PageResponse } from 'src/app/shared/model/PageResponse';
import { TransactionResponse } from 'src/app/shared/model/transaction.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service/service.service';
import { map, switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';


@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.css']
})
export class ComponentsComponent implements OnInit {

  pageTitle:string='Disbursement'
  transactions?: TransactionResponse[];
  currentPaginate: { [key: string]: any } = {page: 1, size: 5};
  paginate?: Omit<PageResponse<any>, "content">
  isPresent:boolean=true;
  constructor(private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly transactionService:ServiceService,
    private readonly authService:AuthService) { }

  ngOnInit(): void {
    this.transactionService.notify().subscribe(() => {
      this.getTransactions();
    })
    this.getTransactions()
  }

  items = [
    {name: "SIX_MONTHS", type: "type2"},
    {name: "TWELVE_MONTHS", type: "type3"},
    {name: "TWENTY_FOUR_MONTHS", type: "type4"},
    {name: "THIRTY_SIX_MONTHS", type: "type5"}

];

installment:string='SIX_MONTHS'
setInstallment(event:any){

  this.installment=event
  this.getTransactions();
  
}


  getTransactions(){
    this.route.queryParamMap.pipe(
      switchMap((val)=>{
        return this.transactionService.getAllTransactions(this.installment).pipe(map(({data})=>{
          console.log(this.installment);
          
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
    this.router.navigateByUrl("/disbursement/detail/"+data.trxId)
  }
  async onTableDataChange(page: number) {
    this.currentPaginate = {...this.currentPaginate, page: page}
    await this.router.navigateByUrl(`/transactions?page=${this.currentPaginate['page']}&size=${this.currentPaginate['size']}`)
    this.getTransactions();
  }

  moveToForm(trans: TransactionResponse) {
    Swal.fire({
      title: 'Confirm Password',
      input: 'password',
      confirmButtonText: 'Submit',
      showCancelButton: true,
      focusConfirm: false,
      showLoaderOnConfirm: true}).then((result)=>{
        if(result.isConfirmed){
          this.authService.getUserFromToken().subscribe((res)=>{
            let confirmAuth = {nik:res.data.nik,password:result.value}
            this.authService.login(confirmAuth).subscribe((res2)=>{
              if (confirmAuth.nik===res2.data.nik){
                this.transactionService.approved(trans.trxId).subscribe((val)=>{
                  this.router.navigateByUrl('disbursement/disbursement-form/');            
                  })
              }
              
              
            });
            
          })
          
          
        }
      })

}
}
