import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import { PageResponse } from 'src/app/shared/model/PageResponse';
import { TransactionResponse } from 'src/app/shared/model/transaction.model';


@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.css']
})
export class ComponentsComponent implements OnInit {
  pageTitle:string='Disbursement'

  transactions: TransactionResponse[]=[{id:'123',customer:{firstName:'Mark',lastName:'Lee',id:'',dateOfBirth: new Date('2022-01-01'),phone:'',status:'',userId:''},nominal:250000,tenor:6,approvalStatus:'On Progress',transactionDate:new Date('2022-10-01')}];
  currentPaginate: { [key: string]: any } = {page: 1, size: 5};
  paginate?: Omit<PageResponse<any>, "content">

  constructor() { }

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
