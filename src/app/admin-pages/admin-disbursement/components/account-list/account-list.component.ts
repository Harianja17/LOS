import { Component, OnInit } from '@angular/core';
import { Disbursement, DisbursementResponseDTO } from 'src/app/shared/model/disbursement.model';

import { ServiceService } from '../service/service.service';
import { map, switchMap } from 'rxjs';
import { ActivatedRoute, Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PageResponse } from 'src/app/shared/model/PageResponse';
import { TransactionResponse } from 'src/app/shared/model/transaction.model';
import { AuthService } from 'src/app/auth/service/auth.service';
@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

  constructor(private readonly service:ServiceService,private readonly route: ActivatedRoute, private readonly router: Router,
    private readonly authService:AuthService) { }
  disbursementList:DisbursementResponseDTO[] = []
  data:PageResponse<DisbursementResponseDTO>={
    totalPages:0,
    size:0,
    page:0,
    count:0,
    data:[]
  };
  pageNumber :number =0;
  totalPages: number = 0;
  dataNotDelete:number=0;
  
  ngOnInit(): void {
    this.loadAccounts();
    this.changeRole();
  }
  pageTitle:string='Disbursement';
  selectedOption: string='5';
  options = [
    { name: "5", value: 5 },
    { name: "10", value: 10 },
    { name: "20", value: 20 },
  ]
  
  loadAccounts(){
   this.service.getDisbursements(this.selectedOption,this.pageNumber).subscribe({
      next: ({data})=>{
        this.totalPages = data.totalPages
        this.data = data;
        this.disbursementList = data.data;  
        for(let i=0;i<this.disbursementList.length;i++){
        this.dataNotDelete+=1;
        }
      },
      error:console.error,
    })
  }

  isStaff:boolean=true;
  role:string=''
  changeRole(){
    this.authService.getUserFromToken().subscribe((val)=>{
      this.role= val.data.roleList[0];
      if(this.role !== 'ROLE_STAFF'){
        this.isStaff=false;
      }
    })
  }

  moveToForm(id: DisbursementResponseDTO) {
    this.router.navigateByUrl('/disbursement/disbursement-form/' + id.disbursementId)
  }

  deleteDisbursement(disbursement: DisbursementResponseDTO) {
    Swal.fire({
      title: 'Are you sure you want to delete the disbursement?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'The disbursement has been deleted.',
        );
        this.route.params.subscribe((params) => {
          if (disbursement && disbursement.disbursementId) {
            this.service.deleteDisbursement(disbursement).subscribe({
              next: ({data})=>{                
                this.loadAccounts();
              },
              error:console.error,
            })
    
          }
        })
  
      }
    })
  }

  onTableDataChange(){
    this.pageNumber+=1;
    this.loadAccounts();
  }
  onTableDataChangeNext(){
    this.pageNumber+=1;
    this.loadAccounts();
  }
  onTableDataChangePrev(){
    this.pageNumber-=1;
    this.loadAccounts();
  }
  searchText='';


}
