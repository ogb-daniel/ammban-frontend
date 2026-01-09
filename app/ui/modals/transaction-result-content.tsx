"use client";
import React from "react";

export interface TransactionResultOptions {
  type: "success" | "failure";
  title?: string;
  message?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  showSecondaryButton?: boolean;
}

// Helper function to generate HTML string for SweetAlert2
export const generateTransactionResultHTML = (
  options: TransactionResultOptions
): string => {
  const {
    type,
    title,
    message,
    primaryButtonText,
    secondaryButtonText,
    showSecondaryButton = true,
  } = options;

  const isSuccess = type === "success";

  const defaultTitle = isSuccess
    ? "Successfully Purchased!"
    : "Transaction Failed!";
  const defaultMessage = isSuccess
    ? "AXA PASS has been successfully created. View details of this Transaction."
    : "Your transaction could not be completed. Please try again or contact support.";
  const defaultPrimaryText = isSuccess ? "Purchase New Policy" : "Try Again";
  const defaultSecondaryText = isSuccess ? "View Details" : "Contact Support";

  const iconSvg = isSuccess
    ? `<svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
       </svg>`
    : `<svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
       </svg>`;

  const iconBgColor = isSuccess ? "bg-green-100" : "bg-red-100";
  const primaryButtonColor = isSuccess
    ? "bg-primary text-white hover:bg-primary"
    : "bg-primary text-white hover:bg-primary";

  return `
    <div class="text-center">
      <!-- Icon -->
      <div class="mb-6">
        <div class="w-16 h-16 ${iconBgColor} rounded-full flex items-center justify-center mx-auto">
          ${iconSvg}
        </div>
      </div>

      <!-- Title -->
      <h2 class="text-xl font-semibold text-gray-800 mb-3">
        ${title || defaultTitle}
      </h2>

      <!-- Message -->
      <p class="text-sm text-gray-600 mb-8 leading-relaxed">
        ${message || defaultMessage}
      </p>

      <!-- Action Buttons -->
      <div class="space-y-3">
        ${
          showSecondaryButton
            ? `
          <button 
            id="secondary-action-btn"
            class="w-full px-6 py-3 border border-primary text-primary bg-white rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            ${secondaryButtonText || defaultSecondaryText}
          </button>
        `
            : ""
        }
        
        <button 
          id="primary-action-btn"
          class="w-full px-6 py-3 rounded-lg font-medium transition-colors ${primaryButtonColor}"
        >
          ${primaryButtonText || defaultPrimaryText}
        </button>
      </div>
    </div>
  `;
};

// React component version for direct use
const TransactionResultContent: React.FC<TransactionResultOptions> = (
  options
) => {
  const {
    type,
    title,
    message,
    primaryButtonText,
    secondaryButtonText,
    showSecondaryButton = true,
  } = options;

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
    <div className="text-center">
      {/* Icon */}
      <div className="mb-6">
        {isSuccess ? (
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
        ) : (
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
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
          <button className="w-full px-6 py-3 border border-gray-300 text-gray-700 bg-white rounded-lg font-medium hover:bg-gray-50 transition-colors">
            {secondaryButtonText || defaultSecondaryText}
          </button>
        )}

        <button
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

export default TransactionResultContent;
