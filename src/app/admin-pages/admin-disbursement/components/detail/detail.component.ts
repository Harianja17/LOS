import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Banks, Disbursement } from 'src/app/shared/model/disbursement.model';
import allBank from 'src/assets/allBank.json'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  disbursementData:Disbursement[]=[];
  pageTitle:string='Disbursement'
  bankName: Banks[] = allBank
  getBankName(){
    this.bankName
  }

  disbursementForm:FormGroup= new FormGroup({
    customerBank: new FormControl(),
    customerAccountName: new FormControl(),
    customerAccountNumber: new FormControl()

  })

  setDisbursementData(data:Disbursement){
    this.disbursementForm.controls['customerBank'].setValue(data.customerBank)
    this.disbursementForm.controls['customerAccountName'].setValue(data.customerAccountName)
    this.disbursementForm.controls['customerAccountNumber'].setValue(data.customerAccountNumber)
  }
  submitData(data:any){
    this.disbursementData.push(data);
    console.log(this.disbursementData);
    
  }

  getDetail(){
    console.log(this.disbursementData);
    
  }


 

}
