import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-costumer-approval',
  templateUrl: './costumer-approval.component.html',
  styleUrls: ['./costumer-approval.component.css']
})
export class CostumerApprovalComponent implements OnInit {
  display = "none";
  
  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }


  currentDetailID:string = ''

  collateralDataForm: FormGroup = new FormGroup({
    guaranteeObjectName : new FormControl(''),
    guaranteeObjectValue : new FormControl(''),
  })

  incomeForm: FormGroup = new FormGroup({
    salary : new FormControl(''),
    businessIncome : new FormControl(''),
    otherIncome : new FormControl('')
  })

  outcomeArray = new FormArray([new FormGroup({
    outcomeName : new FormControl(''),
    outcomeAmount : new FormControl(''),
  })]);

  ngOnInit() {
    this.test()
  }

  addInputControl() {
    this.outcomeArray.push(new FormGroup({
      outcomeName : new FormControl(''),
      outcomeAmount : new FormControl(''),
    }));
  }

  removeInputControl(idx: number) {
    this.outcomeArray.removeAt(idx);
  }

  submitForm(){
    console.log('Collateral Data : ',this.collateralDataForm.value);
    console.log('Income Data : ',this.incomeForm.value);
    console.log('Outcome Data : ', this.outcomeArray.value);

    this.resetAllForm()
  }

  resetAllForm(){
    this.collateralDataForm.reset()
    this.incomeForm.reset()
    this.outcomeArray.reset()
  }

  setCurrentDetailID(id:string){
    console.log(id);
    

    this.currentDetailID = id
    if(id=' ') {
      console.log('wiped');
      
      this.resetAllForm()}
  }

  ////////

  isLoading = true

  test(){
    setInterval(() => {
      console.log('test');
      
    }, 5000);
  }

}
