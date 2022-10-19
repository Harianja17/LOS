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
  totalPages: number = 0;
  data:PageResponse<TransactionResponse>={
    totalPages:0,
    size:0,
    page:0,
    count:0,
    data:[]
  };

  constructor(private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly transactionService:ServiceService) { }

  ngOnInit(): void {
    this.authService.getUserFromToken()
    .subscribe(data => {
      this.nik=data.data.nik
      this.getTransactions();
    });
    
  }

  sortBy:string='nominalCredit'
  direction:string='ASC'
  setSort(sort:string,dir:string){
    this.sortBy=sort;
    this.direction=dir;
    console.log(this.sortBy);
    console.log(this.direction);
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
page:number=0;
size:number=5;
  getTransactions(){
  this.transactionService.getAllTransactions(this.installment,this.nik,this.page,this.size, this.direction, this.sortBy).subscribe({
      next: ({data})=>{
        this.data=data
        this.totalPages = data.totalPages
        
        this.transactions=data.data;
        this.paginate=data;
        
      },
      error:console.error,
    })
  }
  moveToDetails(data : TransactionResponse){
    this.router.navigateByUrl("/disbursement/details/"+data.trxId)
  }

  searchText='';
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
