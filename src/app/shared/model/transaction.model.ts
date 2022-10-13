

export interface CustomerResponse {
    id: string;
    fullName: string;
    dateOfBirth: Date;
    phone: string;
    status: string;
    userId: string;
  }
export interface TransactionResponse {
    id: string;
    fullName: string,
    nominalLoan: number;
    installmentType:number;
    trxStatus: string;
    trxDate:Date;
    disbursementDate?:Date;
  }
  export interface TransactionDetailResponse {
    id: string;
    transactionDate: number;
    nominalData: number;
    loanStatus: string;
    createdAt: number;
    updatedAt: number;
  }