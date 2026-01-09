# Transaction Modal Components

A comprehensive set of reusable transaction modal components designed to work with SweetAlert2, matching the design specifications provided.

## Features

- ✅ Clean, modern design matching the provided mockups
- ✅ Fully customizable transaction details
- ✅ Success and failure result modals
- ✅ Consistent styling with the existing design system
- ✅ Easy integration with SweetAlert2
- ✅ TypeScript support
- ✅ Loading states and error handling
- ✅ Responsive design

## Files

### Confirmation Modals

- `transaction-confirmation-modal.tsx` - React component version
- `transaction-confirmation-content.tsx` - HTML content generator for SweetAlert2
- `../lib/utils/transaction-confirmation.ts` - Utility functions for easy usage

### Result Modals (Success/Failure)

- `transaction-result-modal.tsx` - React component for success/failure results
- `transaction-result-content.tsx` - HTML content generator for result modals
- `../lib/utils/transaction-result.ts` - Utility functions for result modals

### Details Modals (View Transaction)

- `transaction-details-modal.tsx` - React component for viewing transaction details
- `transaction-details-content.tsx` - HTML content generator for details modal
- `../lib/utils/transaction-details.ts` - Utility functions for details modal

### Shared

- `../types/transaction-confirmation.ts` - TypeScript definitions
- `examples/transaction-confirmation-example.tsx` - Confirmation modal examples
- `examples/transaction-result-example.tsx` - Result modal examples
- `examples/transaction-details-example.tsx` - Details modal examples

## Quick Start

### Transaction Confirmation Modals

#### 1. Basic AXA Transaction

```typescript
import { showAXATransactionConfirmation } from "@/app/lib/utils/transaction-confirmation";

const handlePurchase = async () => {
  const result = await showAXATransactionConfirmation(
    "₦47,000.12", // cost
    "₦200.00", // fee
    "Adekunle Mark", // seller name
    "Samuel Phillips", // buyer name
    "#019289378", // buyer reference (optional)
    async () => {
      // Your confirmation logic here
      await processPayment();
    }
  );

  if (result.isConfirmed) {
    toast.success("Transaction completed!");
  }
};
```

### 2. Custom Transaction

```typescript
import { showTransactionConfirmation } from "@/app/lib/utils/transaction-confirmation";
import { TransactionDetails } from "@/app/ui/modals/transaction-confirmation-content";

const customTransaction: TransactionDetails = {
  title: "Insurance Premium Payment",
  date: "26/05/2025 7:25 PM",
  cost: "₦25,500.00",
  fee: "₦150.00",
  paymentType: "Bank Transfer",
  sellerName: "Cubecover Insurance",
  buyerName: "John Doe",
  buyerReference: "#CC123456",
  logoText: "CC", // 2-3 character logo text
};

const result = await showTransactionConfirmation({
  transactionDetails: customTransaction,
  onConfirm: async () => {
    // Your confirmation logic
    await processInsurancePayment();
  },
  confirmButtonText: "Pay Now",
  cancelButtonText: "Cancel Payment",
});
```

### Transaction Result Modals (Success/Failure)

#### 1. AXA Success Modal

```typescript
import { showAXASuccessModal } from "@/app/lib/utils/transaction-result";

await showAXASuccessModal(
  async () => {
    // View Details action
    navigateToTransactionDetails();
  },
  async () => {
    // Purchase New Policy action
    navigateToNewPurchase();
  }
);
```

#### 2. AXA Failure Modal

```typescript
import { showAXAFailureModal } from "@/app/lib/utils/transaction-result";

await showAXAFailureModal(
  async () => {
    // Try Again action
    retryTransaction();
  },
  async () => {
    // Contact Support action
    openSupportChat();
  }
);
```

#### 3. Generic Success/Failure Modals

```typescript
import {
  showSuccessModal,
  showFailureModal,
} from "@/app/lib/utils/transaction-result";

// Success
await showSuccessModal(
  "Payment Successful!",
  "Your payment has been processed.",
  "Continue",
  async () => {
    /* action */
  }
);

// Failure
await showFailureModal(
  "Payment Failed!",
  "Please try again.",
  "Retry",
  async () => {
    /* action */
  }
);
```

#### 4. Insurance-Specific Modals

```typescript
import {
  showInsuranceSuccessModal,
  showInsuranceFailureModal,
} from "@/app/lib/utils/transaction-result";

// Success
await showInsuranceSuccessModal(
  "Health Insurance",
  async () => {
    /* View Policy */
  },
  async () => {
    /* Purchase New */
  }
);

// Failure
await showInsuranceFailureModal(
  "Auto Insurance",
  async () => {
    /* Try Again */
  },
  async () => {
    /* Contact Support */
  }
);
```

### Transaction Details Modals (View Only)

#### 1. AXA Transaction Details

```typescript
import { showAXATransactionDetails } from "@/app/lib/utils/transaction-details";

await showAXATransactionDetails(
  "₦47,000.12", // cost
  "₦200.00", // fee
  "Adekunle Mark", // seller
  "Samuel Phillips", // buyer
  "#019289378", // buyer reference
  "TXN-2025-001234", // transaction ID (optional)
  "26/05/2025 7:25 PM" // date (optional)
);
```

#### 2. Insurance Transaction Details

```typescript
import { showInsuranceTransactionDetails } from "@/app/lib/utils/transaction-details";

await showInsuranceTransactionDetails(
  "Health Insurance", // policy type
  "₦25,500.00", // cost
  "₦150.00", // fee
  "John Agent", // agent name
  "Jane Customer", // customer name
  "POL-2025-5678", // policy number (optional)
  "TXN-2025-001235", // transaction ID (optional)
  "26/05/2025 8:30 PM" // date (optional)
);
```

#### 3. From Transaction Data

```typescript
import { showTransactionDetailsFromData } from "@/app/lib/utils/transaction-details";

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
```

#### 4. React Component

```typescript
import TransactionDetailsModal from "@/app/ui/modals/transaction-details-modal";

<TransactionDetailsModal
  transactionDetails={transactionDetails}
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
/>;
```

## API Reference

### TransactionDetails Interface

```typescript
interface TransactionDetails {
  title: string; // Transaction title (e.g., "Purchase at AXA PASS")
  date: string; // Transaction date/time
  cost: string; // Main cost amount
  fee: string; // Transaction fee
  paymentType: string; // Payment method
  sellerName: string; // Seller/merchant name
  buyerName: string; // Buyer/customer name
  buyerReference?: string; // Optional buyer reference number
  logoText?: string; // Optional 2-3 character logo text
}
```

### showTransactionConfirmation Options

```typescript
interface TransactionConfirmationOptions {
  transactionDetails: TransactionDetails;
  onConfirm?: () => Promise<void> | void;
  confirmButtonText?: string; // Default: "Yes, Confirm"
  cancelButtonText?: string; // Default: "No, Cancel"
  showLoaderOnConfirm?: boolean; // Default: true
}
```

## Styling

The modal uses Tailwind CSS classes and follows the existing design system:

- Primary color: `#094794`
- Rounded corners: `rounded-3xl` for the modal, `rounded-lg` for buttons
- Consistent spacing and typography
- Responsive design with proper mobile support

## Integration with Existing Code

This modal can be easily integrated into existing SweetAlert2 usage patterns in the codebase. It follows the same styling conventions used in other parts of the application (see `users-table.tsx` and `products-table.tsx` for reference).

## Example Usage in Components

See `examples/transaction-confirmation-example.tsx` for complete working examples and integration patterns.
