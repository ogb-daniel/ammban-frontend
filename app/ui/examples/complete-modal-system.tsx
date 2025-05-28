"use client";
import React from "react";
import { showAXATransactionConfirmation } from "@/app/lib/utils/transaction-confirmation";
import { showAXASuccessModal, showAXAFailureModal } from "@/app/lib/utils/transaction-result";
import { showAXATransactionDetails } from "@/app/lib/utils/transaction-details";
import { toast } from "react-toastify";

const CompleteModalSystem: React.FC = () => {
  // Sample transaction data
  const sampleTransaction = {
    cost: "₦47,000.12",
    fee: "₦200.00",
    seller: "Adekunle Mark",
    buyer: "Samuel Phillips",
    reference: "#019289378",
    transactionId: "TXN-2025-001234",
    date: "26/05/2025 7:25 PM",
  };

  // Simulate transaction processing
  const processTransaction = async (): Promise<{ success: boolean; transactionId?: string; error?: string }> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const isSuccess = Math.random() > 0.3; // 70% success rate
    
    if (isSuccess) {
      return { 
        success: true, 
        transactionId: `TXN-${Date.now()}` 
      };
    } else {
      return { 
        success: false, 
        error: "Payment processing failed. Please try again." 
      };
    }
  };

  const handleCompleteFlow = async () => {
    try {
      // Step 1: Show confirmation modal
      const confirmationResult = await showAXATransactionConfirmation(
        sampleTransaction.cost,
        sampleTransaction.fee,
        sampleTransaction.seller,
        sampleTransaction.buyer,
        sampleTransaction.reference,
        async () => {
          console.log("Processing transaction...");
          return await processTransaction();
        }
      );

      // Step 2: Handle confirmation result
      if (confirmationResult.isConfirmed) {
        const transactionResult = confirmationResult.value;
        
        if (transactionResult?.success) {
          // Step 3a: Show success modal
          await showAXASuccessModal(
            async () => {
              // View Details action - show transaction details
              await showAXATransactionDetails(
                sampleTransaction.cost,
                sampleTransaction.fee,
                sampleTransaction.seller,
                sampleTransaction.buyer,
                sampleTransaction.reference,
                transactionResult.transactionId || sampleTransaction.transactionId,
                sampleTransaction.date
              );
            },
            async () => {
              // Purchase New Policy action
              toast.info("Starting new policy purchase...");
              console.log("Navigating to new policy purchase");
            }
          );
        } else {
          // Step 3b: Show failure modal
          await showAXAFailureModal(
            async () => {
              // Try Again action - restart the flow
              toast.info("Retrying transaction...");
              handleCompleteFlow(); // Recursive call to retry
            },
            async () => {
              // Contact Support action
              toast.info("Opening support chat...");
              console.log("Opening support contact form");
            }
          );
        }
      } else {
        toast.info("Transaction cancelled by user");
      }
    } catch (error) {
      console.error("Complete flow error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  const handleViewExistingTransaction = async () => {
    // Simulate viewing an existing transaction
    await showAXATransactionDetails(
      sampleTransaction.cost,
      sampleTransaction.fee,
      sampleTransaction.seller,
      sampleTransaction.buyer,
      sampleTransaction.reference,
      sampleTransaction.transactionId,
      sampleTransaction.date
    );
  };

  const handleSuccessDemo = async () => {
    // Demo success flow
    await showAXASuccessModal(
      async () => {
        await showAXATransactionDetails(
          sampleTransaction.cost,
          sampleTransaction.fee,
          sampleTransaction.seller,
          sampleTransaction.buyer,
          sampleTransaction.reference,
          sampleTransaction.transactionId,
          sampleTransaction.date
        );
      },
      async () => {
        toast.success("Starting new purchase...");
      }
    );
  };

  const handleFailureDemo = async () => {
    // Demo failure flow
    await showAXAFailureModal(
      async () => {
        toast.info("Retrying...");
      },
      async () => {
        toast.info("Contacting support...");
      }
    );
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Complete Transaction Modal System</h1>
      
      <div className="mb-8 p-6 bg-blue-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-3">Complete Transaction Flow:</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white p-4 rounded-lg text-center">
            <div className="font-semibold text-blue-600">1. Confirmation</div>
            <div>User reviews and confirms transaction details</div>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <div className="font-semibold text-yellow-600">2. Processing</div>
            <div>Transaction is processed with loading indicator</div>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <div className="font-semibold text-green-600">3. Result</div>
            <div>Success or failure modal based on outcome</div>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <div className="font-semibold text-purple-600">4. Details</div>
            <div>View transaction details if successful</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <button
          onClick={handleCompleteFlow}
          className="px-6 py-4 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <div className="text-center">
            <div className="font-semibold">Complete Flow</div>
            <div className="text-sm opacity-90">All Modals</div>
          </div>
        </button>

        <button
          onClick={handleViewExistingTransaction}
          className="px-6 py-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <div className="text-center">
            <div className="font-semibold">View Details</div>
            <div className="text-sm opacity-90">Details Only</div>
          </div>
        </button>

        <button
          onClick={handleSuccessDemo}
          className="px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <div className="text-center">
            <div className="font-semibold">Success Demo</div>
            <div className="text-sm opacity-90">Success + Details</div>
          </div>
        </button>

        <button
          onClick={handleFailureDemo}
          className="px-6 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <div className="text-center">
            <div className="font-semibold">Failure Demo</div>
            <div className="text-sm opacity-90">Failure Only</div>
          </div>
        </button>
      </div>

      <div className="bg-gray-100 rounded-lg p-6">
        <h3 className="font-semibold mb-4">Modal System Features:</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div>
            <h4 className="font-medium text-blue-600 mb-2">Confirmation Modal</h4>
            <ul className="space-y-1 text-gray-700">
              <li>• Transaction details review</li>
              <li>• User confirmation required</li>
              <li>• Loading state during processing</li>
              <li>• Error handling</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-green-600 mb-2">Result Modals</h4>
            <ul className="space-y-1 text-gray-700">
              <li>• Success/failure variants</li>
              <li>• Contextual actions</li>
              <li>• Consistent design</li>
              <li>• Customizable messages</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-purple-600 mb-2">Details Modal</h4>
            <ul className="space-y-1 text-gray-700">
              <li>• Read-only transaction view</li>
              <li>• Complete transaction info</li>
              <li>• Close button</li>
              <li>• Responsive design</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteModalSystem;
