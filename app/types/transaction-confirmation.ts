import { SyncTransactionResponse } from "../lib/definitions";

export interface TransactionDetails {
  title: string;
  date: string;
  cost: string;
  fee: string;
  paymentType: string;
  sellerName: string;
  buyerName: string;
  buyerReference?: string;
  logoText?: string;
}

export interface TransactionConfirmationOptions {
  transactionDetails: TransactionDetails;
  onConfirm?: () => Promise<void> | void;
  confirmButtonText?: string;
  cancelButtonText?: string;
  showLoaderOnConfirm?: boolean;
}

export interface TransactionConfirmationResult {
  isConfirmed: boolean;
  isDenied: boolean;
  isDismissed: boolean;
  value?: SyncTransactionResponse;
}

// Transaction Result Modal Types
export interface TransactionResultOptions {
  type: "success" | "failure";
  title?: string;
  message?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  showSecondaryButton?: boolean;
}

export interface TransactionResultModalOptions
  extends TransactionResultOptions {
  onPrimaryAction?: () => Promise<void> | void;
  onSecondaryAction?: () => Promise<void> | void;
  allowOutsideClick?: boolean;
  allowEscapeKey?: boolean;
}

// Transaction Details Modal Types
export interface TransactionDetailsData {
  title: string;
  date: string;
  cost: string;
  fee: string;
  paymentType: string;
  sellerName: string;
  buyerName: string;
  buyerReference?: string;
  logoText?: string;
  transactionId?: string;
}

export interface TransactionDetailsOptions {
  transactionDetails: TransactionDetailsData;
  allowOutsideClick?: boolean;
  allowEscapeKey?: boolean;
  showCloseButton?: boolean;
}
