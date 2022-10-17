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

  
 



  notify(): Observable<void> {
    return this.transactionSubject.asObservable()
  }
  approved(trxId:string): Observable<CommonResponse<TransactionResponse>> {
    return this.http.put<CommonResponse<TransactionResponse>>(`/api/transactions/?transactionId=${trxId}`,null);
  }

  getTransactiondetail(id:String):Observable<CommonResponse<CommonResponseList<TransactionDetailResponse>>>{
    return this.http.get<CommonResponse<CommonResponseList<TransactionDetailResponse>>>('/api/transaction-details/'+id);
  }

  createDisbursement(data:Disbursement):Observable<CommonResponse<Disbursement>>{
    return this.http.post<CommonResponse<Disbursement>>('api/disbursements',data)
  }
  updateTransactions(transaction: TransactionResponse): Observable<CommonResponse<PageResponse<TransactionResponse>>> {
    return this.http.put<CommonResponse<PageResponse<TransactionResponse>>>('api/transactions', transaction)
  }
  public getDisbursements(option:String,page:number): Observable<CommonResponse<PageResponse<DisbursementResponseDTO>>>{
    let reqParams: any = {};

    // if (params){
    //   Object.keys(params).map(k => {
    //     reqParams[k] = params[k];
    //   })
    // }
    console.log(option);
    console.log('page to string : '+page.toString());
    
    
    return this.http.get<CommonResponse<PageResponse<DisbursementResponseDTO>>>('/api/disbursements?size='+option+'&page='+page.toString());
    // return this.http.get<Product[]>('/api/products', {headers: this.getToken()});
  }
  
  getDisbursementById(id: string): Observable<CommonResponse<Disbursement>>{
    return this.http.get<CommonResponse<Disbursement>>('api/disbursements/' + id)
  }

  addDisbursement(disburse: DisbursementResponseDTO): Observable<CommonResponse<DisbursementResponseDTO>> {
    console.log('CREATE');
    return this.http.post<CommonResponse<DisbursementResponseDTO>>('api/disbursements', disburse)
    
  }
  
  updateDisbursement(disburse: Disbursement): Observable<CommonResponse<Disbursement>> {
   console.log('service');
  //  if(disburse.disbursementId) 
   
   console.log('disbursement id : '+disburse.disbursementId);
   console.log("name account : "+disburse.customerAccountName);
   
    return this.http.put<CommonResponse<Disbursement>>('api/disbursements', disburse)
  }

  deleteDisbursement(disburse: DisbursementResponseDTO): Observable<CommonResponse<Disbursement>> {
    console.log('disbursement id: '+ disburse.disbursementId);
    return this.http.put<CommonResponse<Disbursement>>('api/disbursements/'+ disburse.disbursementId, disburse)
  }



}
