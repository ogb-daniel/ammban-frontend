import Swal from "sweetalert2";
import {
  TransactionDetailsData,
  generateTransactionDetailsHTML,
  generateWalletDetailsHTML,
} from "@/app/ui/modals/transaction-details-content";
import { WalletAccountDetails } from "../definitions";

export interface TransactionDetailsOptions {
  transactionDetails: TransactionDetailsData;
  allowOutsideClick?: boolean;
  allowEscapeKey?: boolean;
  showCloseButton?: boolean;
}
export interface WalletDetailsOptions {
  accountDetails: WalletAccountDetails;
  allowOutsideClick?: boolean;
  allowEscapeKey?: boolean;
  showCloseButton?: boolean;
}

export const showTransactionDetails = async ({
  transactionDetails,
  allowOutsideClick = true,
  allowEscapeKey = true,
  showCloseButton = true,
}: TransactionDetailsOptions) => {
  const htmlContent = generateTransactionDetailsHTML(transactionDetails);

  const result = await Swal.fire({
    html: htmlContent,
    showConfirmButton: false,
    showCancelButton: false,
    showCloseButton,
    allowOutsideClick,
    allowEscapeKey,
    customClass: {
      popup: "!rounded-3xl !p-8",
      htmlContainer: "!p-0 !m-0",
      closeButton: "!text-gray-500 hover:!text-gray-700 !text-2xl !font-normal",
    },
    width: "500px",
  });

  return result;
};
export const showWalletDetails = async ({
  accountDetails,
  allowOutsideClick = true,
  allowEscapeKey = true,
  showCloseButton = true,
}: WalletDetailsOptions) => {
  const htmlContent = generateWalletDetailsHTML(accountDetails);

  const result = await Swal.fire({
    html: htmlContent,
    showConfirmButton: false,
    showCancelButton: false,
    showCloseButton,
    allowOutsideClick,
    allowEscapeKey,
    customClass: {
      popup: "!rounded-3xl !p-8",
      htmlContainer: "!p-0 !m-0",
      closeButton: "!text-gray-500 hover:!text-gray-700 !text-2xl !font-normal",
    },
    width: "500px",
  });

  return result;
};

// Predefined function for AXA transaction details
export const showAXATransactionDetails = async (
  cost: string,
  fee: string,
  sellerName: string,
  buyerName: string,
  buyerReference?: string,
  transactionId?: string,
  date?: string
) => {
  const transactionDetails: TransactionDetailsData = {
    title: "Purchase at AXA PASS",
    date: date || "",
    cost,
    fee,
    paymentType: "Pay by Transfer",
    sellerName,
    buyerName,
    buyerReference,
    logoText: "AXA",
    transactionId,
  };

  return showTransactionDetails({
    transactionDetails,
  });
};

// Generic function for insurance transaction details
export const showInsuranceTransactionDetails = async (
  policyType: string,
  cost: string,
  fee: string,
  agentName: string,
  customerName: string,
  policyNumber?: string,
  transactionId?: string,
  date?: string
) => {
  const transactionDetails: TransactionDetailsData = {
    title: `${policyType} Policy Purchase`,
    date:
      date ||
      new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    cost,
    fee,
    paymentType: "Electronic Transfer",
    sellerName: agentName,
    buyerName: customerName,
    buyerReference: policyNumber,
    logoText: "CC", // Cubecover
    transactionId,
  };

  return showTransactionDetails({
    transactionDetails,
  });
};

// Function to show transaction details from existing transaction data
export const showTransactionDetailsFromData = async (transaction: {
  id?: string | number;
  type?: string;
  amount?: number | string;
  fee?: number | string;
  seller?: string;
  buyer?: string;
  reference?: string;
  date?: string | Date;
  paymentMethod?: string;
}) => {
  const transactionDetails: TransactionDetailsData = {
    title: transaction.type || "Transaction",
    date: transaction.date
      ? typeof transaction.date === "string"
        ? transaction.date
        : transaction.date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
      : new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
    cost:
      typeof transaction.amount === "number"
        ? `₦${transaction.amount.toLocaleString()}`
        : transaction.amount?.toString() || "₦0.00",
    fee:
      typeof transaction.fee === "number"
        ? `₦${transaction.fee.toLocaleString()}`
        : transaction.fee?.toString() || "₦0.00",
    paymentType: transaction.paymentMethod || "Electronic Transfer",
    sellerName: transaction.seller || "N/A",
    buyerName: transaction.buyer || "N/A",
    buyerReference: transaction.reference,
    transactionId: transaction.id?.toString(),
    logoText: "CC",
  };

  return showTransactionDetails({
    transactionDetails,
  });
};

// Function to create transaction details modal with custom close action
export const showTransactionDetailsWithAction = async (
  transactionDetails: TransactionDetailsData,
  onClose?: () => void
) => {
  const result = await showTransactionDetails({
    transactionDetails,
    allowOutsideClick: true,
    allowEscapeKey: true,
    showCloseButton: true,
  });

  // Call custom close action if provided
  if (onClose && (result.isDismissed || result.isDenied)) {
    onClose();
  }

  return result;
};
