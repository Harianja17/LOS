import { Component, OnInit } from '@angular/core';
import { Disbursement, DisbursementResponseDTO } from 'src/app/shared/model/disbursement.model';

import { ServiceService } from '../service/service.service';
import { map, switchMap } from 'rxjs';
import { ActivatedRoute, Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PageResponse } from 'src/app/shared/model/PageResponse';
@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

  constructor(private readonly service:ServiceService,private readonly route: ActivatedRoute, private readonly router: Router) { }
  disbursementList:DisbursementResponseDTO[] = []
data:any;
  // disbursementData:DisbursementResponseDTO={ disbursementId: '',
  
  //   customerBank: '',
  //   customerAccountName: '',
  //   customerAccountNumber: '',
  // isDelete:false};
  
  pageNumber :number =0;
  totalPages: number = 0;
  dataNotDelete:number=0;
    ngOnInit(): void {
    this.loadAccounts();
  }
  pageTitle:string='Disbursement';
  selectedOption: string='5';
  options = [
    { name: "5", value: 5 },
    { name: "10", value: 10 },
    { name: "20", value: 20 },
  ]
  currentPaginate: { [key: string]: any } = {page: 1, size: 5};


  loadAccounts(){
    this.route.queryParamMap.pipe(
      switchMap((val)=>{
        return this.service.getDisbursements(this.selectedOption,this.pageNumber).pipe(map(({data})=>{
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
        // console.log('fullname'+data.data[0]);
        this.totalPages = data.totalPage
        this.data = data;
        this.disbursementList = data.data;  
        console.log('LIST: '+this.disbursementList);
        for(let i=0;i<this.disbursementList.length;i++){
this.dataNotDelete+=1;
        }
        // this.paginate=data;
        
      },
      error:console.error,
    })
  }

  moveToForm(id: DisbursementResponseDTO) {
 //   console.log('id : '+id.id);
    
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
        console.log('disburseId1: '+disbursement.disbursementId);
        this.route.params.subscribe((params) => {
          if (disbursement && disbursement.disbursementId) {
            
            this.route.queryParamMap.pipe(
               switchMap((val)=>{
                return this.service.deleteDisbursement(disbursement).pipe(map(({data})=>{
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
            this.loadAccounts();
            // this.router.navigateByUrl('/disbursement/account-list');
                // this.paginate=data;
                
              },
              error:console.error,
            })
    
          }
        })
        // this.service.deleteDisbursement(this.disbursementData).subscribe({
        //   next: (res) => this.loadAccounts(),
        //   error: (err) => alert(err.error.message)
        // })
      }
    })
  }

  onTableDataChange(){
    // console.log('PAGE: '+page);
    // this.currentPaginate = {...this.currentPaginate, page: page}
    // this.router.navigateByUrl(`/disbursement/account-list?page=${this.currentPaginate['page']}&size=${this.currentPaginate['size']}`)
    // // this.service.getDisbursements(page)
this.pageNumber+=1;


    this.loadAccounts();
  }
  onTableDataChangeNext(){
    // console.log('PAGE: '+page);
    // this.currentPaginate = {...this.currentPaginate, page: page}
    // this.router.navigateByUrl(`/disbursement/account-list?page=${this.currentPaginate['page']}&size=${this.currentPaginate['size']}`)
    // // this.service.getDisbursements(page)
this.pageNumber+=1;


    this.loadAccounts();
  }
  onTableDataChangePrev(){
    // console.log('PAGE: '+page);
    // this.currentPaginate = {...this.currentPaginate, page: page}
    // this.router.navigateByUrl(`/disbursement/account-list?page=${this.currentPaginate['page']}&size=${this.currentPaginate['size']}`)
    // // this.service.getDisbursements(page)
this.pageNumber-=1;


    this.loadAccounts();
  }
  searchText='';


}
