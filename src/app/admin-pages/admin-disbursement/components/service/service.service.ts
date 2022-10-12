import { Injectable } from '@angular/core';
import { Disbursement } from 'src/app/shared/model/disbursement.model';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  accountList:Disbursement[]=[{customerBank:'Some Bank',customerAccountName:'Some Name',customerAccountNumber:'Some Number'}];

  constructor() { }
  setAccountList(data:Disbursement){
 
  }

  getAccountList():Disbursement[]{
    return this.accountList;
  }

  
}
