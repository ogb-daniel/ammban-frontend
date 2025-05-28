import Swal from "sweetalert2";
import {
  TransactionDetails,
  generateTransactionConfirmationHTML,
} from "@/app/ui/modals/transaction-confirmation-content";
import { TransactionConfirmationResult } from "@/app/types/transaction-confirmation";
import { SyncTransactionResponse } from "../definitions";

export interface TransactionConfirmationOptions {
  transactionDetails: TransactionDetails;
  onConfirm?: () => Promise<SyncTransactionResponse> | void;
  confirmButtonText?: string;
  cancelButtonText?: string;
  showLoaderOnConfirm?: boolean;
}

export const showTransactionConfirmation: (
  options: TransactionConfirmationOptions
) => Promise<TransactionConfirmationResult> = async ({
  transactionDetails,
  onConfirm,
  confirmButtonText = "Yes, Confirm",
  cancelButtonText = "No, Cancel",
  showLoaderOnConfirm = true,
}: TransactionConfirmationOptions) => {
  const htmlContent = generateTransactionConfirmationHTML(transactionDetails);

  const result = await Swal.fire({
    html: htmlContent,
    showCancelButton: true,
    cancelButtonText,
    confirmButtonColor: "#094794",
    confirmButtonText,
    reverseButtons: true,
    customClass: {
      popup: "!rounded-3xl !p-8",
      cancelButton:
        "text-primary bg-white border border-primary !rounded-lg !px-6 !py-3",
      confirmButton: "!rounded-lg !px-6 !py-3",
      actions: "flex-row gap-3 !mt-8",
      htmlContainer: "!p-0 !m-0",
    },
    buttonsStyling: true,
    showLoaderOnConfirm,
    preConfirm: onConfirm
      ? () => {
          return onConfirm();
        }
      : undefined,
    width: "500px",
  });

  return result;
};

// Example usage function
export const showAXATransactionConfirmation = async (
  cost: string,
  fee: string,
  sellerName: string,
  buyerName: string,
  buyerReference?: string,
  onConfirm?: () => Promise<SyncTransactionResponse> | void
) => {
  const transactionDetails: TransactionDetails = {
    title: "Purchase at AXA PASS",
    date: new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
    cost,
    fee,
    paymentType: "Electronic Scan Transfer",
    sellerName,
    buyerName,
    buyerReference,
    logoText: "AXA",
  };

  return showTransactionConfirmation({
    transactionDetails,
    onConfirm,
  });
};
