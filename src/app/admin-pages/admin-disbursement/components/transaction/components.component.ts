import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import Swal from "sweetalert2";
import { PageResponse } from 'src/app/shared/model/PageResponse';
import { TransactionResponse } from 'src/app/shared/model/transaction.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service/service.service';
import { map, switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import {Sort} from '@angular/material/sort';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.css']
})
export class ComponentsComponent implements OnInit {


  pageTitle:string='Disbursement'
  transactions?: TransactionResponse[];
  isPresent:boolean=true;
  searchText='';
  constructor(private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly transactionService:ServiceService,
    private readonly authService:AuthService) { }

  ngOnInit(): void {
    this.transactionService.notify().subscribe(() => {
      this.getTransactions();
    })
    this.getTransactions()
    this.changeRole()
    
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

page:number=0;
size:number=5;
direction:string='ASC';
sortBy:string='nominalCredit'
data:PageResponse<TransactionResponse>={
  totalPages:0,
  size:0,
  page:0,
  count:0,
  data:[]
};
isSearch:boolean=true;
totalPages:number=0;
isStaff:boolean=true;

setSort(sort:string){
  this.sortBy=sort;
  if(this.direction==='ASC'){
    this.direction='DESC'
  }
  else{
    this.direction='ASC'
  }
  this.getTransactions()
}

  getTransactions(){
    this.transactionService.getAllTransactions(this.installment,this.page,this.size,this.direction,this.sortBy).subscribe({
      next: ({data})=>{
        this.totalPages = data.totalPages
        this.data = data;
        this.transactions=data.data;
        this.isSearch=true
      },
      error:()=>{
        Swal.fire("No Data Found")
      },
    })
  }
  
  moveToDetails(data : TransactionResponse){
    this.router.navigateByUrl("/disbursement/detail/"+data.trxId)
  }



  role:string=''
  changeRole(){
    this.authService.getUserFromToken().subscribe((val)=>{
      this.role= val.data.roleList[0];
      if(this.role !== 'ROLE_STAFF'){
        this.isStaff=false;
      }
    })
  }
 
  authNik:string=''
  moveToForm(trans: TransactionResponse) {
    this.isSearch=false;
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
            this.authNik=res.data.nik
            this.authService.login(confirmAuth).subscribe({
              next:({res2})=>{
                if (confirmAuth.nik===this.authNik){
                    this.transactionService.approved(trans.trxId).subscribe(()=>{
                    this.transactionService.getDisbursementByTrxID(trans.trxId).subscribe((val)=>{
      
                    this.router.navigateByUrl('disbursement/disbursement-form/'+val.data.disbursementId); 
                  })
                })
                  
                            
                  
              }
              },
              error:({})=>{
                Swal.fire('Failed Authentication')
                this.getTransactions()
              }
            }
            );
            
          })
          
        }
      })

}
onTableDataChange(){
  this.page+=1;
  this.getTransactions();
}
onTableDataChangeNext(){
  this.page+=1;
  this.getTransactions();
}
onTableDataChangePrev(){
  this.page-=1;
  this.getTransactions();
}
}
