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

  getAllTransactions(installment:string,nik:string,page:number,size:number,direction:string,sortBy:string):Observable<CommonResponse<PageResponse<TransactionResponse>>>{
    return this.http.get<CommonResponse<PageResponse<TransactionResponse>>>(`/api/transactions/customer?installment=${installment}&nik=${nik}&page=${page}&size=${size}&direction=${direction}&sortBy=${sortBy}`)
  }

  notify(): Observable<void> {
    return this.transactionSubject.asObservable()
  }
   getTransactiondetail(id:string):Observable<CommonResponse<CommonResponseList<TransactionDetailResponse>>>{
    return this.http.get<CommonResponse<CommonResponseList<TransactionDetailResponse>>>('/api/transaction-details/'+id)
  }




  }
  


  



  
