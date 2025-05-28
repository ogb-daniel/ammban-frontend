"use client";
import React from "react";
import { showAXATransactionConfirmation } from "@/app/lib/utils/transaction-confirmation";
import { showAXASuccessModal, showAXAFailureModal } from "@/app/lib/utils/transaction-result";
import { toast } from "react-toastify";

const CompleteTransactionFlow: React.FC = () => {
  // Simulate API call for transaction processing
  const processTransaction = async (): Promise<{ success: boolean; error?: string }> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate random success/failure for demo
    const isSuccess = Math.random() > 0.3; // 70% success rate
    
    if (isSuccess) {
      return { success: true };
    } else {
      return { 
        success: false, 
        error: "Payment gateway timeout. Please try again." 
      };
    }
  };

  const handleCompleteAXAFlow = async () => {
    try {
      // Step 1: Show confirmation modal
      const confirmationResult = await showAXATransactionConfirmation(
        "₦47,000.12",
        "₦200.00",
        "Adekunle Mark",
        "Samuel Phillips",
        "#019289378",
        async () => {
          // This function runs when user confirms
          console.log("Processing AXA transaction...");
          return await processTransaction();
        }
      );

      // Step 2: Handle the result
      if (confirmationResult.isConfirmed) {
        const transactionResult = confirmationResult.value;
        
        if (transactionResult?.success) {
          // Step 3a: Show success modal
          await showAXASuccessModal(
            async () => {
              // View Details action
              toast.info("Viewing transaction details...");
              console.log("Navigating to transaction details page");
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
              handleCompleteAXAFlow(); // Recursive call to retry
            },
            async () => {
              // Contact Support action
              toast.info("Opening support chat...");
              console.log("Opening support contact form");
            }
          );
        }
      } else {
        // User cancelled the confirmation
        toast.info("Transaction cancelled by user");
      }
    } catch (error) {
      console.error("Transaction flow error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  const handleSimpleSuccessFlow = async () => {
    // Simulate a successful transaction flow
    const confirmationResult = await showAXATransactionConfirmation(
      "₦25,000.00",
      "₦150.00",
      "John Doe",
      "Jane Smith",
      "#TEST123",
      async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { success: true };
      }
    );

    if (confirmationResult.isConfirmed) {
      await showAXASuccessModal(
        async () => {
          toast.success("Viewing details...");
        },
        async () => {
          toast.success("Starting new purchase...");
        }
      );
    }
  };

  const handleSimpleFailureFlow = async () => {
    // Simulate a failed transaction flow
    const confirmationResult = await showAXATransactionConfirmation(
      "₦15,000.00",
      "₦100.00",
      "Test Seller",
      "Test Buyer",
      "#FAIL123",
      async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { success: false, error: "Insufficient funds" };
      }
    );

    if (confirmationResult.isConfirmed) {
      await showAXAFailureModal(
        async () => {
          toast.info("Retrying...");
        },
        async () => {
          toast.info("Contacting support...");
        }
      );
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Complete Transaction Flow Examples</h1>
      
      <div className="mb-8 p-6 bg-blue-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-3">How it works:</h2>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li><strong>Confirmation:</strong> User sees transaction details and confirms</li>
          <li><strong>Processing:</strong> Transaction is processed with loading indicator</li>
          <li><strong>Result:</strong> Success or failure modal is shown based on result</li>
          <li><strong>Actions:</strong> User can take appropriate next steps</li>
        </ol>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <button
          onClick={handleCompleteAXAFlow}
          className="px-6 py-4 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <div className="text-center">
            <div className="font-semibold">Complete AXA Flow</div>
            <div className="text-sm opacity-90">Random Success/Failure</div>
          </div>
        </button>

        <button
          onClick={handleSimpleSuccessFlow}
          className="px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <div className="text-center">
            <div className="font-semibold">Success Flow</div>
            <div className="text-sm opacity-90">Always Succeeds</div>
          </div>
        </button>

        <button
          onClick={handleSimpleFailureFlow}
          className="px-6 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <div className="text-center">
            <div className="font-semibold">Failure Flow</div>
            <div className="text-sm opacity-90">Always Fails</div>
          </div>
        </button>
      </div>

      <div className="bg-gray-100 rounded-lg p-6">
        <h3 className="font-semibold mb-4">Implementation Code:</h3>
        <pre className="bg-white p-4 rounded text-xs overflow-x-auto">
{`const handleCompleteAXAFlow = async () => {
  try {
    // Step 1: Show confirmation modal
    const confirmationResult = await showAXATransactionConfirmation(
      "₦47,000.12", "₦200.00", "Seller", "Buyer", "#REF123",
      async () => {
        return await processTransaction();
      }
    );

    // Step 2: Handle the result
    if (confirmationResult.isConfirmed) {
      const transactionResult = confirmationResult.value;
      
      if (transactionResult?.success) {
        // Step 3a: Show success modal
        await showAXASuccessModal(
          async () => { /* View Details */ },
          async () => { /* Purchase New */ }
        );
      } else {
        // Step 3b: Show failure modal
        await showAXAFailureModal(
          async () => { /* Try Again */ },
          async () => { /* Contact Support */ }
        );
      }
    }
  } catch (error) {
    console.error("Transaction flow error:", error);
  }
};`}
        </pre>
      </div>
    </div>
  );
};

export default CompleteTransactionFlow;
