import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Banks, Disbursement, DisbursementResponseDTO } from 'src/app/shared/model/disbursement.model';
import { map, switchMap } from 'rxjs';
import { ServiceService } from '../../customer-trans-service.service';
import allBank from 'src/assets/allBank.json'
import Swal from 'sweetalert2';


@Component({
  selector: 'app-disburse-form',
  templateUrl: './disbursement-form.component.html',
  styleUrls: ['./disbursement-form.component.css']
})
export class DetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private transactionService: ServiceService,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.disbursementForm.reset();
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
    customerBank: new FormControl(''),
    customerAccountName: new FormControl(''),
    customerAccountNumber: new FormControl('')

  })

  getDisbursementData(){
    this.route.params.subscribe((params) => {
      if (params && params['id']) {
        this.isUpdateButton = true;
        // this.transactionService.getDisbursementById(params['id']).subscribe((response) => {
        //   this.setDisbursementData(response.data);
        // })

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
           
            // this.transactions=data.data;
            // this.paginate=data;
            
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
        this.route.queryParamMap.pipe(
          switchMap((val)=>{
            console.log("DATA:" + this.disbursementData);
            return this.transactionService.updateDisbursement(this.disbursementData).pipe(map(({data})=>{
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
        Swal.fire("Successfully Submit Data")
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
        Swal.fire("Successfully Submit Data");
        this.disbursementForm.reset();
        
        
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
  // submitData(data:any){
  //   this.disbursementData.push(data);
  //   console.log(this.disbursementData);
    
  // }

  getDetail(){
    console.log(this.disbursementData);
    
  }

}