import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CommonResponse } from 'src/app/shared/model/CommonResponse';
import { Disbursement } from 'src/app/shared/model/disbursement.model';
import { PageResponse } from 'src/app/shared/model/PageResponse';
import { TransactionResponse } from 'src/app/shared/model/transaction.model';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private transactionSubject = new Subject<void>();

  constructor(private readonly http: HttpClient) { }
  accountList:Disbursement[]=[];
  getAllTransactions(params:any):Observable<CommonResponse<PageResponse<TransactionResponse>>>{
    let reqParams : any={};
    if (params){
      Object.keys(params).map(k=>{
        reqParams[k]=params[k];
      })
    }
    return this.http.get<CommonResponse<PageResponse<TransactionResponse>>>(`/api/transactions?installment=THREE_MONTHS`)
  }

  
  setAccountList(data:Disbursement){
    
  }

  getAccountList():Disbursement[]{
    return this.accountList;
  }

  notify(): Observable<void> {
    return this.transactionSubject.asObservable()
  }

  
}
