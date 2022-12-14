import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Banks, Disbursement, DisbursementResponseDTO } from 'src/app/shared/model/disbursement.model';
import { ServiceService } from '../service/service.service';
import { map, switchMap } from 'rxjs';
import allBank from 'src/assets/allBank.json'
import Swal from 'sweetalert2';
import { TransactionResponse } from 'src/app/shared/model/transaction.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private transactionService: ServiceService,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.getDisbursementData()
  }
  bankName: Banks[] = allBank
  getBankName(){
    this.bankName
  }
  disbursementData:Disbursement={ 
    disbursementId: '',
    trxId: '',
    customerBank: '',
    customerAccountName: '',
    customerAccountNumber: ''};
  disbursementData2:DisbursementResponseDTO={     
    disbursementId: '',
    disbursementDate: new Date(),
    customerBank: '',
    customerAccountName: '',
    customerAccountNumber: '',
    delete:false};
  pageTitle:string='Disbursement'
  isUpdateButton: boolean = false;


  disbursementForm:FormGroup= new FormGroup({
    disbursementId:new FormControl(''),
    customerBank: new FormControl(null, Validators.required),
    customerAccountName: new FormControl(null, Validators.required),
    customerAccountNumber: new FormControl(null, Validators.required)

  })

  date:Date=new Date();
  
  getDisbursementData(){
    this.route.params.subscribe((params) => {
      if (params && params['id']) {
        this.route.queryParamMap.pipe(
          switchMap((val)=>{
            return this.transactionService.getDisbursementById(params['id']).pipe(map(({data})=>{
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
            this.disbursementData = data;
            this.setDisbursementData(this.disbursementData);
          },
          error:console.error,
        })

      }
    })

 
  }

  addUpdateDisbursement(disbursement: Disbursement) {

this.disbursementData.customerAccountName = this.disbursementForm.value.customerAccountName;
this.disbursementData.customerAccountNumber = this.disbursementForm.value.customerAccountNumber;
this.disbursementData.customerBank = this.disbursementForm.value.customerBank;

this.disbursementData2.customerAccountName = this.disbursementForm.value.customerAccountName;
this.disbursementData2.customerAccountNumber = this.disbursementForm.value.customerAccountNumber;
this.disbursementData2.customerBank = this.disbursementForm.value.customerBank;
console.log('method');
    this.route.params.subscribe((params) => {
      if (true) {
        console.log('params');
        
        this.isUpdateButton = true;
        if(this.disbursementData.disbursementId){
       this.transactionService.updateDisbursement(this.disbursementData).subscribe({
          next: ({data})=>{
            console.log(data);
        this.getDisbursementData();
        this.router.navigateByUrl('/disbursement/account-list');
            // this.paginate=data;
            
          },
          error:console.error,
        })

      }
      else{
        this.route.queryParamMap.pipe(
          switchMap((val)=>{
            console.log("DATA:" + this.disbursementData);
            return this.transactionService.addDisbursement(this.disbursementData2).pipe(map(({data})=>{
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
        this.getDisbursementData();
        this.router.navigateByUrl('/disbursement/account-list');
            // this.paginate=data;
            
          },
          error:console.error,
        })
      }
  }})

   
  }

  setDisbursementData(data:Disbursement){
    this.disbursementForm.controls['customerBank'].setValue(data.customerBank)
    this.disbursementForm.controls['customerAccountName'].setValue(data.customerAccountName)
    this.disbursementForm.controls['customerAccountNumber'].setValue(data.customerAccountNumber)
  }


  getDetail(){
    console.log(this.disbursementData);
    
  }
  form(property:string):FormGroup{
    return this.disbursementForm.get(property) as FormGroup;
  }
  clearForm(){
    this.disbursementForm.reset();
  }
  

}
