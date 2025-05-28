"use client";
import React from "react";
import { X } from "lucide-react";

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

interface TransactionDetailsModalProps {
  transactionDetails: TransactionDetailsData;
  isOpen: boolean;
  onClose: () => void;
}

const TransactionDetailsModal: React.FC<TransactionDetailsModalProps> = ({
  transactionDetails,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-auto shadow-lg relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Transaction Details
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Transaction Header */}
        <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            {transactionDetails.logoText && (
              <div className="w-10 h-10 bg-primary rounded flex items-center justify-center text-white font-bold text-xs">
                {transactionDetails.logoText}
              </div>
            )}
            <span className="font-medium text-gray-800">
              {transactionDetails.title}
            </span>
          </div>
          <span className="text-sm text-gray-600">
            {transactionDetails.date}
          </span>
        </div>

        {/* Transaction Details */}
        <div className="space-y-4">
          {/* Cost */}
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600">Cost</span>
            <span className="font-semibold text-lg text-gray-800">
              {transactionDetails.cost}
            </span>
          </div>

          {/* Fee */}
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600">Fee</span>
            <span className="font-semibold text-gray-800">
              {transactionDetails.fee}
            </span>
          </div>

          {/* Payment Type */}
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600">Payment Type</span>
            <span className="font-medium text-gray-800">
              {transactionDetails.paymentType}
            </span>
          </div>

          {/* Seller */}
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600">Debit from (Seller)</span>
            <span className="font-medium text-gray-800">
              {transactionDetails.sellerName}
            </span>
          </div>

          {/* Buyer */}
          <div className="flex justify-between items-center py-2">
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

          {/* Transaction ID (if provided) */}
          {transactionDetails.transactionId && (
            <div className="flex justify-between items-center py-2 border-t border-gray-100 mt-4 pt-4">
              <span className="text-gray-600">Transaction ID</span>
              <span className="font-mono text-sm text-gray-800">
                {transactionDetails.transactionId}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailsModal;
