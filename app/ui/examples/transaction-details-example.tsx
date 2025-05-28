"use client";
import React, { useState } from "react";
import {
  showAXATransactionDetails,
  showInsuranceTransactionDetails,
  showTransactionDetailsFromData,
  showTransactionDetailsWithAction,
} from "@/app/lib/utils/transaction-details";
import { TransactionDetailsData } from "@/app/ui/modals/transaction-details-content";
import TransactionDetailsModal from "@/app/ui/modals/transaction-details-modal";
import { toast } from "react-toastify";

const TransactionDetailsExample: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sampleTransactionDetails: TransactionDetailsData = {
    title: "Purchase at AXA PASS",
    date: "26/05/2025 7:25 PM",
    cost: "₦47,000.12",
    fee: "₦200.00",
    paymentType: "Electronic Scan Transfer",
    sellerName: "Adekunle Mark",
    buyerName: "Samuel Phillips",
    buyerReference: "#019289378",
    logoText: "AXA",
    transactionId: "TXN-2025-001234",
  };

  const handleAXADetails = async () => {
    await showAXATransactionDetails(
      "₦47,000.12",
      "₦200.00",
      "Adekunle Mark",
      "Samuel Phillips",
      "#019289378",
      "TXN-2025-001234",
      "26/05/2025 7:25 PM"
    );
  };

  const handleInsuranceDetails = async () => {
    await showInsuranceTransactionDetails(
      "Health Insurance",
      "₦25,500.00",
      "₦150.00",
      "John Agent",
      "Jane Customer",
      "POL-2025-5678",
      "TXN-2025-001235",
      "26/05/2025 8:30 PM"
    );
  };

  const handleTransactionFromData = async () => {
    const transactionData = {
      id: "TXN-2025-001236",
      type: "Auto Insurance Purchase",
      amount: 35000,
      fee: 175,
      seller: "Mike Agent",
      buyer: "Sarah Customer",
      reference: "POL-2025-9012",
      date: new Date(),
      paymentMethod: "Bank Transfer",
    };

    await showTransactionDetailsFromData(transactionData);
  };

  const handleCustomDetails = async () => {
    const customDetails: TransactionDetailsData = {
      title: "Life Insurance Premium",
      date: "26/05/2025 9:15 PM",
      cost: "₦50,000.00",
      fee: "₦250.00",
      paymentType: "Credit Card",
      sellerName: "Cubecover Insurance",
      buyerName: "Robert Johnson",
      buyerReference: "POL-2025-3456",
      logoText: "CC",
      transactionId: "TXN-2025-001237",
    };

    await showTransactionDetailsWithAction(
      customDetails,
      () => {
        toast.info("Transaction details modal closed");
      }
    );
  };

  const handleReactModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Transaction Details Modal Examples</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={handleAXADetails}
          className="px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <div className="text-center">
            <div className="font-semibold">AXA Transaction Details</div>
            <div className="text-sm opacity-90">SweetAlert2 Modal</div>
          </div>
        </button>

        <button
          onClick={handleInsuranceDetails}
          className="px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <div className="text-center">
            <div className="font-semibold">Insurance Details</div>
            <div className="text-sm opacity-90">Health Insurance</div>
          </div>
        </button>

        <button
          onClick={handleTransactionFromData}
          className="px-6 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <div className="text-center">
            <div className="font-semibold">From Transaction Data</div>
            <div className="text-sm opacity-90">Auto Insurance</div>
          </div>
        </button>

        <button
          onClick={handleCustomDetails}
          className="px-6 py-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          <div className="text-center">
            <div className="font-semibold">Custom Details</div>
            <div className="text-sm opacity-90">With Close Action</div>
          </div>
        </button>

        <button
          onClick={handleReactModal}
          className="px-6 py-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <div className="text-center">
            <div className="font-semibold">React Modal</div>
            <div className="text-sm opacity-90">Direct Component</div>
          </div>
        </button>
      </div>

      {/* React Modal Example */}
      <TransactionDetailsModal
        transactionDetails={sampleTransactionDetails}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <div className="mt-8 p-6 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-4">Usage Examples:</h3>
        
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-medium text-blue-600 mb-2">AXA Transaction Details:</h4>
            <pre className="bg-white p-3 rounded text-xs overflow-x-auto">
{`await showAXATransactionDetails(
  "₦47,000.12",        // cost
  "₦200.00",           // fee
  "Adekunle Mark",     // seller
  "Samuel Phillips",   // buyer
  "#019289378",        // buyer reference
  "TXN-2025-001234",   // transaction ID
  "26/05/2025 7:25 PM" // date
);`}
            </pre>
          </div>

          <div>
            <h4 className="font-medium text-green-600 mb-2">Insurance Transaction Details:</h4>
            <pre className="bg-white p-3 rounded text-xs overflow-x-auto">
{`await showInsuranceTransactionDetails(
  "Health Insurance",  // policy type
  "₦25,500.00",       // cost
  "₦150.00",          // fee
  "John Agent",       // agent name
  "Jane Customer",    // customer name
  "POL-2025-5678",    // policy number
  "TXN-2025-001235",  // transaction ID
  "26/05/2025 8:30 PM" // date
);`}
            </pre>
          </div>

          <div>
            <h4 className="font-medium text-purple-600 mb-2">From Transaction Data:</h4>
            <pre className="bg-white p-3 rounded text-xs overflow-x-auto">
{`const transactionData = {
  id: "TXN-2025-001236",
  type: "Auto Insurance Purchase",
  amount: 35000,
  fee: 175,
  seller: "Mike Agent",
  buyer: "Sarah Customer",
  reference: "POL-2025-9012",
  date: new Date(),
  paymentMethod: "Bank Transfer",
};

await showTransactionDetailsFromData(transactionData);`}
            </pre>
          </div>

          <div>
            <h4 className="font-medium text-gray-600 mb-2">React Component:</h4>
            <pre className="bg-white p-3 rounded text-xs overflow-x-auto">
{`<TransactionDetailsModal
  transactionDetails={transactionDetails}
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
/>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailsExample;
