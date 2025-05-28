"use client";
import React from "react";
import { showTransactionConfirmation, showAXATransactionConfirmation } from "@/app/lib/utils/transaction-confirmation";
import { TransactionDetails } from "@/app/ui/modals/transaction-confirmation-content";
import { toast } from "react-toastify";

const TransactionConfirmationExample: React.FC = () => {
  const handleAXATransaction = async () => {
    try {
      const result = await showAXATransactionConfirmation(
        "₦47,000.12",
        "₦200.00",
        "Adekunle Mark",
        "Samuel Phillips",
        "#019289378",
        async () => {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 2000));
          console.log("Transaction confirmed!");
        }
      );

      if (result.isConfirmed) {
        toast.success("Transaction completed successfully!");
      }
    } catch (error) {
      console.error("Transaction failed:", error);
      toast.error("Transaction failed. Please try again.");
    }
  };

  const handleCustomTransaction = async () => {
    const customTransactionDetails: TransactionDetails = {
      title: "Insurance Premium Payment",
      date: "15/12/2024 3:45 PM",
      cost: "₦25,500.00",
      fee: "₦150.00",
      paymentType: "Bank Transfer",
      sellerName: "Cubecover Insurance",
      buyerName: "John Doe",
      buyerReference: "#CC123456",
      logoText: "CC",
    };

    try {
      const result = await showTransactionConfirmation({
        transactionDetails: customTransactionDetails,
        onConfirm: async () => {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1500));
          console.log("Custom transaction confirmed!");
        },
      });

      if (result.isConfirmed) {
        toast.success("Insurance premium paid successfully!");
      }
    } catch (error) {
      console.error("Payment failed:", error);
      toast.error("Payment failed. Please try again.");
    }
  };

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold mb-6">Transaction Confirmation Examples</h1>
      
      <div className="space-y-4">
        <button
          onClick={handleAXATransaction}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Show AXA Transaction Confirmation
        </button>

        <button
          onClick={handleCustomTransaction}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Show Custom Transaction Confirmation
        </button>
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-2">Usage Examples:</h3>
        <div className="text-sm text-gray-700 space-y-2">
          <p><strong>1. Simple AXA Transaction:</strong></p>
          <pre className="bg-white p-2 rounded text-xs overflow-x-auto">
{`import { showAXATransactionConfirmation } from "@/app/lib/utils/transaction-confirmation";

const result = await showAXATransactionConfirmation(
  "₦47,000.12",  // cost
  "₦200.00",     // fee
  "Adekunle Mark", // seller
  "Samuel Phillips", // buyer
  "#019289378",  // buyer reference
  async () => {
    // Your confirmation logic here
    await processPayment();
  }
);`}
          </pre>

          <p><strong>2. Custom Transaction:</strong></p>
          <pre className="bg-white p-2 rounded text-xs overflow-x-auto">
{`import { showTransactionConfirmation } from "@/app/lib/utils/transaction-confirmation";

const result = await showTransactionConfirmation({
  transactionDetails: {
    title: "Custom Transaction",
    date: "26/05/2025 7:25 PM",
    cost: "₦10,000.00",
    fee: "₦100.00",
    paymentType: "Card Payment",
    sellerName: "Your Company",
    buyerName: "Customer Name",
    buyerReference: "#REF123",
    logoText: "YC",
  },
  onConfirm: async () => {
    // Your confirmation logic
  },
});`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default TransactionConfirmationExample;
