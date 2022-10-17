

export interface CustomerResponse {
    id: string;
    fullName: string;
    dateOfBirth: Date;
    phone: string;
    status: string;
    userId: string;
  }
export interface TransactionResponse {
    trxId: string;
    fullName: string;
    installmentType:number;
    trxStatus: string;
    trxDate:Date;
    nik:string;
    disbursementDate?:Date;
    nominalLoan: string;
    isDelete:boolean;
  }
  export interface TransactionDetailResponse {
    transactionDetailId: string;
    installmentDate: Date;
    installmentTotal: number;
    disbursementStatus: string;
  }