import { Component, OnInit } from '@angular/core';
import { PageResponse } from 'src/app/shared/model/PageResponse';
import { TransactionResponse } from 'src/app/shared/model/transaction.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  pageTitle:string='Disbursement'

  transactions: TransactionResponse[]=[];
  currentPaginate: { [key: string]: any } = {page: 1, size: 5};
  paginate?: Omit<PageResponse<any>, "content">

  constructor() { }

  ngOnInit(): void {
    this.getTransactions()
  }
  statusClass(disbursementStatus: string): string {
    if (disbursementStatus=== 'Disbursed') return 'disbursed';
    if (disbursementStatus === 'Failed') return 'failed';
    if (disbursementStatus === 'On Progress') return 'on progress';
    return '';
  }


  getTransactions(){
    this.transactions
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
              const existing = this.transactions.find(x => x.id === trans.id);
              if (existing) {
                existing.trxStatus = 'Disbursed';
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
