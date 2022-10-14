import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Disbursement, DisbursementResponseDTO } from 'src/app/shared/model/disbursement.model';
import { map, switchMap } from 'rxjs';
import { ServiceService } from '../../customer-trans-service.service';

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
    
  }
  disbursementData:Disbursement={ disbursementId: '',
    trxId: '',
    customerBank: '',
    customerAccountName: '',
    customerAccountNumber: ''};
  pageTitle:string='Disbursement'
  isUpdateButton: boolean = false;


  disbursementForm:FormGroup= new FormGroup({
    disbursementId:new FormControl(''),
    customerBank: new FormControl(''),
    customerAccountName: new FormControl(''),
    customerAccountNumber: new FormControl('')

  })

submitDisbursementData(disbursement:DisbursementResponseDTO){
  this.disbursementData.customerAccountName = this.disbursementForm.value.customerAccountName;
  this.disbursementData.customerAccountNumber = this.disbursementForm.value.customerAccountNumber;
  this.disbursementData.customerBank = this.disbursementForm.value.customerBank;

  this.transactionService.submitDisbursement(this.disbursementData).subscribe((val)=>{
    console.log(val.data);
    
  })
}

}