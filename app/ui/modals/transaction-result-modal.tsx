"use client";
import React from "react";
import { CheckCircle, XCircle } from "lucide-react";

export interface TransactionResultOptions {
  type: "success" | "failure";
  title?: string;
  message?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  showSecondaryButton?: boolean;
}

const TransactionResultModal: React.FC<TransactionResultOptions> = ({
  type,
  title,
  message,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryAction,
  onSecondaryAction,
  showSecondaryButton = true,
}) => {
  const isSuccess = type === "success";

  const defaultTitle = isSuccess
    ? "Successfully Purchased!"
    : "Transaction Failed!";
  const defaultMessage = isSuccess
    ? "AXA PASS has been successfully created. View details of this Transaction."
    : "Your transaction could not be completed. Please try again or contact support.";
  const defaultPrimaryText = isSuccess ? "Purchase New Policy" : "Try Again";
  const defaultSecondaryText = isSuccess ? "View Details" : "Contact Support";

  return (
    <div className="bg-white rounded-3xl p-8 max-w-md mx-auto shadow-lg text-center">
      {/* Icon */}
      <div className="mb-6">
        {isSuccess ? (
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        ) : (
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
        )}
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 mb-3">
        {title || defaultTitle}
      </h2>

      {/* Message */}
      <p className="text-sm text-gray-600 mb-8 leading-relaxed">
        {message || defaultMessage}
      </p>

      {/* Action Buttons */}
      <div className="space-y-3">
        {showSecondaryButton && (
          <button
            onClick={onSecondaryAction}
            className="w-full px-6 py-3 border border-gray-300 text-gray-700 bg-white rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            {secondaryButtonText || defaultSecondaryText}
          </button>
        )}

        <button
          onClick={onPrimaryAction}
          className={`w-full px-6 py-3 rounded-lg font-medium transition-colors ${
            isSuccess
              ? "bg-primary text-white hover:bg-primary-700"
              : "bg-red-600 text-white hover:bg-red-700"
          }`}
        >
          {primaryButtonText || defaultPrimaryText}
        </button>
      </div>
    </div>
  );
};

export default TransactionResultModal;
