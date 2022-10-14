import { HttpClient } from '@angular/common/http';
import { CompilerOptions, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CommonResponse, CommonResponseList } from 'src/app/shared/model/CommonResponse';
import { Disbursement } from 'src/app/shared/model/disbursement.model';
import { PageResponse } from 'src/app/shared/model/PageResponse';
import { TransactionDetailResponse, TransactionResponse } from 'src/app/shared/model/transaction.model';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private transactionSubject = new Subject<void>();

  constructor(private readonly http: HttpClient) { }
  accountList:Disbursement[]=[];
  getAllTransactions(params:any):Observable<CommonResponse<PageResponse<TransactionResponse>>>{
    console.log(params);
    
    let reqParams : any={};
    if (params){
      Object.keys(params).map(k=>{
        reqParams[k]=params[k];
      })
    }
    return this.http.get<CommonResponse<PageResponse<TransactionResponse>>>(`/api/transactions/?installment=${params}`)
  }

  
  setAccountList(data:Disbursement){
    
  }

  getAccountList():Disbursement[]{
    return this.accountList;
  }

  notify(): Observable<void> {
    return this.transactionSubject.asObservable()
  }
  approved(trxId:string): Observable<CommonResponse<TransactionResponse>> {
    return this.http.put<CommonResponse<TransactionResponse>>(`/api/transactions/?transactionId=${trxId}`,null);
  }

  getTransactiondetail(id:string):Observable<CommonResponse<CommonResponseList<TransactionDetailResponse>>>{
    return this.http.get<CommonResponse<CommonResponseList<TransactionDetailResponse>>>('/api/transaction-details/'+id)
  }


  
}
