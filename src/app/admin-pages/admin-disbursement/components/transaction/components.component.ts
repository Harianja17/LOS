import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import { PageResponse } from 'src/app/shared/model/PageResponse';
import { TransactionResponse } from 'src/app/shared/model/transaction.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service/service.service';
import { map, switchMap } from 'rxjs';


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

  constructor(private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly transactionService:ServiceService) { }

  ngOnInit(): void {
    this.getTransactions()
  }
  statusClass(approvalStatus: string): string {
    if (approvalStatus === 'Disbursed') return 'disbursed';
    if (approvalStatus === 'Failed') return 'failed';
    if (approvalStatus === 'On Progress') return 'on progress';
    return '';
  }


  getTransactions(){
    this.route.queryParamMap.pipe(
      switchMap((val)=>{
        return this.transactionService.getAllTransactions(val).pipe(map(({data})=>{
          if(Object.getOwnPropertyNames(val).length!==0){
            return {params:val, data:data};
          }else{
            return {params:{page: 1, size: 5, direction: 'Desc'}, data:data};
          }
        }))
      })
    ).subscribe({
      next: ({data})=>{
        console.log(data);
        this.transactions=data.content;
        this.paginate=data;
        
      },
      error:console.error,
    })
  }

  async onTableDataChange(page: number) {
    this.currentPaginate = {...this.currentPaginate, page: page}
    await this.router.navigateByUrl(`/transaction?page=${this.currentPaginate['page']}&size=${this.currentPaginate['size']}`)
    this.getTransactions();
  }
  
    onApproved(trans:TransactionResponse) {
      console.log('mehods work');
 
      
      Swal.fire({
        title: 'Confirm Password',
        input: 'password',
        confirmButtonText: 'Submit',
        focusConfirm: false,
        showLoaderOnConfirm: true,
        preConfirm: (password) => {
          if (password=='') {
            Swal.showValidationMessage(`Please enter verification password`)
          }
          else {
            let a = password
            if(a==='12345'){
              const existing = this.transactions!.find(x => x.id === trans.id);
              if (existing) {
                existing.approvalStatus = 'Disbursed';
                existing.disbursementDate= new Date();
               
              }
            }else{
              Swal.showValidationMessage(`Password Incorrect`)
            }
            
          }
        }
      })
    }
}
