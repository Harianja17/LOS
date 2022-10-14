export interface Disbursement {
  disbursementId: string;
    trxId: string;
    customerBank: string;
    customerAccountName: string;
    customerAccountNumber: string;
  }
  export interface DisbursementResponseDTO  {
    disbursementId:string;
    disbursementDate: Date;
    customerBank: string;
    customerAccountName: string;
    customerAccountNumber: string;
  }
  export interface Banks{
    name: string,
    code: string
}