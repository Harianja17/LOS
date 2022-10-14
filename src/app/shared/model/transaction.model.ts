

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
    fullName: string,
    nominalLoan: number;
    installmentType:number;
    trxStatus: string;
    trxDate:Date;
    disbursementDate?:Date;
  }
  export interface TransactionDetailResponse {
    transactionDetailId: string;
    installmentDate: Date;
    installmentTotal: number;
    disbursementStatus: string;
  }