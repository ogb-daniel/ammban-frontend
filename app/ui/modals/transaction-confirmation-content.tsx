"use client";
import React from "react";

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

interface TransactionConfirmationContentProps {
  transactionDetails: TransactionDetails;
}

const TransactionConfirmationContent: React.FC<
  TransactionConfirmationContentProps
> = ({ transactionDetails }) => {
  return (
    <div className="text-left">
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
          {transactionDetails.logoText && (
            <div className="w-10 h-10 bg-blue-900 rounded flex items-center justify-center text-white font-bold text-xs">
              {transactionDetails.logoText}
            </div>
          )}
          <span className="font-medium text-gray-800">
            {transactionDetails.title}
          </span>
        </div>
        <span className="text-sm text-gray-600">{transactionDetails.date}</span>
      </div>

      {/* Transaction Details */}
      <div className="space-y-4">
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
    </div>
  );
};

export default TransactionConfirmationContent;

// Helper function to generate HTML string for SweetAlert2
export const generateTransactionConfirmationHTML = (
  transactionDetails: TransactionDetails
): string => {
  return `
    <div class="text-left">
      <!-- Header -->
      <div class="text-center mb-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-2">
          Are you sure?
        </h2>
        <p class="text-sm text-gray-600">
          Please confirm account details as this action can not be undone after you proceed.
        </p>
      </div>

      <!-- Transaction Header -->
      <div class="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
        <div class="flex items-center gap-3">
          ${
            transactionDetails.logoText
              ? `
            <div class="w-10 h-10 bg-blue-900 rounded flex items-center justify-center text-white font-bold text-xs">
              ${transactionDetails.logoText}
            </div>
          `
              : ""
          }
          <span class="font-medium text-gray-800">
            ${transactionDetails.title}
          </span>
        </div>
        <span class="text-sm text-gray-600">
          ${transactionDetails.date}
        </span>
      </div>

      <!-- Transaction Details -->
      <div class="space-y-4">
        <!-- Cost -->
        <div class="flex justify-between items-center">
          <span class="text-gray-600">Cost</span>
          <span class="font-semibold text-lg text-gray-800">
            ${transactionDetails.cost}
          </span>
        </div>

        <!-- Fee -->
        <div class="flex justify-between items-center">
          <span class="text-gray-600">Fee</span>
          <span class="font-semibold text-gray-800">
            ${transactionDetails.fee}
          </span>
        </div>

        <!-- Payment Type -->
        <div class="flex justify-between items-center">
          <span class="text-gray-600">Payment Type</span>
          <span class="font-medium text-gray-800">
            ${transactionDetails.paymentType}
          </span>
        </div>

        <!-- Seller -->
        <div class="flex justify-between items-center">
          <span class="text-gray-600">Debit from (Seller)</span>
          <span class="font-medium text-gray-800">
            ${transactionDetails.sellerName}
          </span>
        </div>

        <!-- Buyer -->
        <div class="flex justify-between items-center">
          <span class="text-gray-600">Beneficiary Details (Buyer)</span>
          <div class="text-right">
            <div class="font-medium text-gray-800">
              ${transactionDetails.buyerName}
            </div>
            ${
              transactionDetails.buyerReference
                ? `
              <div class="text-sm text-gray-600">
                ${transactionDetails.buyerReference}
              </div>
            `
                : ""
            }
          </div>
        </div>
      </div>
    </div>
  `;
};
