

export interface CustomerResponse {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    phone: string;
    status: string;
    userId: string;
  }
export interface TransactionResponse {
    id: string;
    customer: CustomerResponse,
    nominal: number;
    tenor:number;
    approvalStatus: string;
    transactionDate:Date;
    disbursementDate?:Date;
    transactionDetailResponses?: TransactionDetailResponse[];
  }
  export interface TransactionDetailResponse {
    id: string;
    transactionDate: number;
    nominalData: number;
    loanStatus: string;
    createdAt: number;
    updatedAt: number;
  }