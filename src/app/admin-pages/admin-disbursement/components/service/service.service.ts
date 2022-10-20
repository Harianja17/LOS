import { HttpClient } from '@angular/common/http';
import { CompilerOptions, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CommonResponse, CommonResponseList } from 'src/app/shared/model/CommonResponse';
import { Disbursement, DisbursementResponseDTO } from 'src/app/shared/model/disbursement.model';
import { PageResponse } from 'src/app/shared/model/PageResponse';
import { TransactionDetailResponse, TransactionResponse } from 'src/app/shared/model/transaction.model';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private transactionSubject = new Subject<void>();

  constructor(private readonly http: HttpClient) { }
  accountList:Disbursement[]=[];
   nameCustomer:String ='';
   loanCredit:String='';
   disbursementStatus :String ='';
   tenor:String=''

  getAllTransactions(params:any,page:any,size:any,direction:any,sortBy:any):Observable<CommonResponse<PageResponse<TransactionResponse>>>{
    return this.http.get<CommonResponse<PageResponse<TransactionResponse>>>(`/api/transactions/?installment=${params}&page=${page}&size=${size}&direction=${direction}&sortBy=${sortBy}`)
  }
  notify(): Observable<void> {
    return this.transactionSubject.asObservable()
  }
  approved(trxId:string): Observable<CommonResponse<TransactionResponse>> {
    return this.http.put<CommonResponse<TransactionResponse>>(`/api/transactions/?transactionId=${trxId}`,null);
  }

  getTransactiondetail(id:String):Observable<CommonResponse<CommonResponseList<TransactionDetailResponse>>>{
    return this.http.get<CommonResponse<CommonResponseList<TransactionDetailResponse>>>('/api/transaction-details/'+id);
  }


  public getDisbursements(option:String,page:number,sort:string,direction:string): Observable<CommonResponse<PageResponse<DisbursementResponseDTO>>>{
    return this.http.get<CommonResponse<PageResponse<DisbursementResponseDTO>>>('/api/disbursements?size='+option+'&page='+page.toString()+'&sortBy='+sort+'&direction='+direction);
  }
  
  getDisbursementById(id: string): Observable<CommonResponse<Disbursement>>{
    return this.http.get<CommonResponse<Disbursement>>('api/disbursements/' + id)
  }

  addDisbursement(disburse: DisbursementResponseDTO): Observable<CommonResponse<DisbursementResponseDTO>> {
    return this.http.post<CommonResponse<DisbursementResponseDTO>>('api/disbursements', disburse)
    
  }
  
  updateDisbursement(disburse: Disbursement): Observable<CommonResponse<Disbursement>> {

    return this.http.put<CommonResponse<Disbursement>>('api/disbursements', disburse)
  }

  deleteDisbursement(disburse: DisbursementResponseDTO): Observable<CommonResponse<Disbursement>> {
    return this.http.put<CommonResponse<Disbursement>>('api/disbursements/'+ disburse.disbursementId, disburse)
  }

  getDisbursementByTrxID(id:string):Observable<CommonResponse<Disbursement>>{
    return this.http.get<CommonResponse<Disbursement>>('api/disbursements/trx/'+id)
  }



}
