"use client";
import React from "react";
import ReactDOM from "react-dom/client";
import Swal from "sweetalert2";
export interface TransactionDetails {
  title: string;
  date: string;
  cost: string;
  fee: string;
  paymentType: string;
  sellerName: string;
  buyerName: string;
  buyerReference?: string;
  logo?: React.ReactNode;
}

interface TransactionConfirmationModalProps {
  transactionDetails: TransactionDetails;
  onConfirm: () => void;
  onCancel: () => void;
}

const TransactionConfirmationModal: React.FC<
  TransactionConfirmationModalProps
> = ({ transactionDetails, onConfirm, onCancel }) => {
  return (
    <div className="bg-white rounded-3xl p-8 max-w-md mx-auto shadow-lg">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Are you sure?
        </h2>
        <p className="text-sm text-gray-600">
          Please confirm account details as this action can not be undone after
          you proceed.
        </p>
      </div>

      {/* Transaction Header */}
      <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3">
          {transactionDetails.logo && (
            <div className="w-10 h-10 bg-primary rounded flex items-center justify-center text-white font-bold text-sm">
              {transactionDetails.logo}
            </div>
          )}
          <span className="font-medium text-gray-800">
            {transactionDetails.title}
          </span>
        </div>
        <span className="text-sm text-gray-600">{transactionDetails.date}</span>
      </div>

      {/* Transaction Details */}
      <div className="space-y-4 mb-8">
        {/* Cost */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Cost</span>
          <span className="font-semibold text-lg text-gray-800">
            {transactionDetails.cost}
          </span>
        </div>

        {/* Fee */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Fee</span>
          <span className="font-semibold text-gray-800">
            {transactionDetails.fee}
          </span>
        </div>

        {/* Payment Type */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Payment Type</span>
          <span className="font-medium text-gray-800">
            {transactionDetails.paymentType}
          </span>
        </div>

        {/* Seller */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Debit from (Seller)</span>
          <span className="font-medium text-gray-800">
            {transactionDetails.sellerName}
          </span>
        </div>

        {/* Buyer */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Beneficiary Details (Buyer)</span>
          <div className="text-right">
            <div className="font-medium text-gray-800">
              {transactionDetails.buyerName}
            </div>
            {transactionDetails.buyerReference && (
              <div className="text-sm text-gray-600">
                {transactionDetails.buyerReference}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 px-4 py-3 border border-primary text-primary bg-white rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          No, Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 px-4 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
        >
          Yes, Confirm
        </button>
      </div>
    </div>
  );
};

export default TransactionConfirmationModal;

// Helper function to create SweetAlert2 with this modal
export const showTransactionConfirmation = (
  transactionDetails: TransactionDetails,
  onConfirm: () => Promise<void> | void
) => {
  return Swal.fire({
    html: `<div id="transaction-confirmation-modal"></div>`,
    showConfirmButton: false,
    showCancelButton: false,
    customClass: {
      popup: "!p-0 !bg-transparent !shadow-none",
      htmlContainer: "!p-0 !m-0",
    },
    didOpen: () => {
      const container = document.getElementById(
        "transaction-confirmation-modal"
      );
      if (container) {
        const root = ReactDOM.createRoot(container);
        root.render(
          React.createElement(TransactionConfirmationModal, {
            transactionDetails,
            onConfirm: async () => {
              Swal.close();
              await onConfirm();
            },
            onCancel: () => {
              Swal.close();
            },
          })
        );
      }
    },
  });
};
