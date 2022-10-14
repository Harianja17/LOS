import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CommonResponse, CommonResponseList } from 'src/app/shared/model/CommonResponse';
import { Disbursement, DisbursementResponseDTO } from 'src/app/shared/model/disbursement.model';
import { PageResponse, PageResponseSingle } from 'src/app/shared/model/PageResponse';
import { TransactionDetailResponse, TransactionResponse } from 'src/app/shared/model/transaction.model';


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
    return this.http.get<CommonResponse<PageResponse<TransactionResponse>>>(`/api/transactions`)
  }

  
  setAccountList(data:Disbursement){
    
  }

  getAccountList():Disbursement[]{
    return this.accountList;
  }

  notify(): Observable<void> {
    return this.transactionSubject.asObservable()
  }

  updateTransactions(transaction: TransactionResponse): Observable<CommonResponse<PageResponse<TransactionResponse>>> {
    return this.http.put<CommonResponse<PageResponse<TransactionResponse>>>('api/transactions', transaction)
  }

  public getDisbursements(): Observable<CommonResponse<PageResponse<DisbursementResponseDTO>>>{
    let reqParams: any = {};

    // if (params){
    //   Object.keys(params).map(k => {
    //     reqParams[k] = params[k];
    //   })
    // }
    return this.http.get<CommonResponse<PageResponse<DisbursementResponseDTO>>>('/api/disbursements');
    // return this.http.get<Product[]>('/api/products', {headers: this.getToken()});
  }
  

  submitDisbursement(disburse: Disbursement): Observable<CommonResponse<Disbursement>> {
   return this.http.post<CommonResponse<Disbursement>>('api/disbursements', disburse)}

   getTransactiondetail(id:string):Observable<CommonResponse<CommonResponseList<TransactionDetailResponse>>>{
    return this.http.get<CommonResponse<CommonResponseList<TransactionDetailResponse>>>('/api/transaction-details/'+id)
  }
  }
  


  



  
