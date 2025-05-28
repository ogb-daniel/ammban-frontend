"use client";
import React from "react";
import {
  showAXASuccessModal,
  showAXAFailureModal,
  showSuccessModal,
  showFailureModal,
  showInsuranceSuccessModal,
  showInsuranceFailureModal,
} from "@/app/lib/utils/transaction-result";
import { toast } from "react-toastify";

const TransactionResultExample: React.FC = () => {
  const handleAXASuccess = async () => {
    await showAXASuccessModal(
      async () => {
        // View Details action
        toast.info("Viewing transaction details...");
        console.log("Navigating to transaction details");
      },
      async () => {
        // Purchase New Policy action
        toast.info("Starting new policy purchase...");
        console.log("Navigating to new policy purchase");
      }
    );
  };

  const handleAXAFailure = async () => {
    await showAXAFailureModal(
      async () => {
        // Try Again action
        toast.info("Retrying transaction...");
        console.log("Retrying AXA purchase");
      },
      async () => {
        // Contact Support action
        toast.info("Opening support chat...");
        console.log("Opening support contact");
      }
    );
  };

  const handleGenericSuccess = async () => {
    await showSuccessModal(
      "Payment Successful!",
      "Your payment has been processed successfully. Thank you for your business.",
      "Continue Shopping",
      async () => {
        toast.success("Continuing to shop...");
        console.log("Navigating to shopping");
      }
    );
  };

  const handleGenericFailure = async () => {
    await showFailureModal(
      "Payment Failed!",
      "We couldn't process your payment. Please check your payment details and try again.",
      "Retry Payment",
      async () => {
        toast.info("Retrying payment...");
        console.log("Retrying payment");
      }
    );
  };

  const handleInsuranceSuccess = async () => {
    await showInsuranceSuccessModal(
      "Health Insurance",
      async () => {
        // View Policy action
        toast.info("Viewing policy details...");
        console.log("Viewing health insurance policy");
      },
      async () => {
        // Purchase New action
        toast.info("Starting new policy purchase...");
        console.log("Starting new insurance purchase");
      }
    );
  };

  const handleInsuranceFailure = async () => {
    await showInsuranceFailureModal(
      "Auto Insurance",
      async () => {
        // Try Again action
        toast.info("Retrying policy creation...");
        console.log("Retrying auto insurance creation");
      },
      async () => {
        // Contact Support action
        toast.info("Contacting insurance support...");
        console.log("Opening insurance support");
      }
    );
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Transaction Result Modal Examples</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Success Modals */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-green-600">Success Modals</h2>
          
          <button
            onClick={handleAXASuccess}
            className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Show AXA Success Modal
          </button>

          <button
            onClick={handleGenericSuccess}
            className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Show Generic Success Modal
          </button>

          <button
            onClick={handleInsuranceSuccess}
            className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Show Insurance Success Modal
          </button>
        </div>

        {/* Failure Modals */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-red-600">Failure Modals</h2>
          
          <button
            onClick={handleAXAFailure}
            className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Show AXA Failure Modal
          </button>

          <button
            onClick={handleGenericFailure}
            className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Show Generic Failure Modal
          </button>

          <button
            onClick={handleInsuranceFailure}
            className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Show Insurance Failure Modal
          </button>
        </div>
      </div>

      <div className="mt-8 p-6 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-4">Usage Examples:</h3>
        
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-medium text-green-600 mb-2">Success Modal Examples:</h4>
            <pre className="bg-white p-3 rounded text-xs overflow-x-auto">
{`// AXA Success
await showAXASuccessModal(
  async () => { /* View Details */ },
  async () => { /* Purchase New */ }
);

// Generic Success
await showSuccessModal(
  "Payment Successful!",
  "Your payment has been processed.",
  "Continue",
  async () => { /* Continue action */ }
);

// Insurance Success
await showInsuranceSuccessModal(
  "Health Insurance",
  async () => { /* View Policy */ },
  async () => { /* Purchase New */ }
);`}
            </pre>
          </div>

          <div>
            <h4 className="font-medium text-red-600 mb-2">Failure Modal Examples:</h4>
            <pre className="bg-white p-3 rounded text-xs overflow-x-auto">
{`// AXA Failure
await showAXAFailureModal(
  async () => { /* Try Again */ },
  async () => { /* Contact Support */ }
);

// Generic Failure
await showFailureModal(
  "Payment Failed!",
  "Please check your details.",
  "Retry",
  async () => { /* Retry action */ }
);

// Insurance Failure
await showInsuranceFailureModal(
  "Auto Insurance",
  async () => { /* Try Again */ },
  async () => { /* Contact Support */ }
);`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionResultExample;
