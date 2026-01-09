import Swal from "sweetalert2";
import { TransactionResultOptions, generateTransactionResultHTML } from "@/app/ui/modals/transaction-result-content";

export interface TransactionResultModalOptions extends TransactionResultOptions {
  onPrimaryAction?: () => Promise<void> | void;
  onSecondaryAction?: () => Promise<void> | void;
  allowOutsideClick?: boolean;
  allowEscapeKey?: boolean;
}

export const showTransactionResult = async ({
  type,
  title,
  message,
  primaryButtonText,
  secondaryButtonText,
  showSecondaryButton = true,
  onPrimaryAction,
  onSecondaryAction,
  allowOutsideClick = true,
  allowEscapeKey = true,
}: TransactionResultModalOptions) => {
  const htmlContent = generateTransactionResultHTML({
    type,
    title,
    message,
    primaryButtonText,
    secondaryButtonText,
    showSecondaryButton,
  });

  const result = await Swal.fire({
    html: htmlContent,
    showConfirmButton: false,
    showCancelButton: false,
    allowOutsideClick,
    allowEscapeKey,
    customClass: {
      popup: "!rounded-3xl !p-8",
      htmlContainer: "!p-0 !m-0",
    },
    width: "400px",
    didOpen: () => {
      // Add event listeners for custom buttons
      const primaryBtn = document.getElementById("primary-action-btn");
      const secondaryBtn = document.getElementById("secondary-action-btn");

      if (primaryBtn) {
        primaryBtn.addEventListener("click", async () => {
          if (onPrimaryAction) {
            try {
              await onPrimaryAction();
            } catch (error) {
              console.error("Primary action failed:", error);
            }
          }
          Swal.close();
        });
      }

      if (secondaryBtn && onSecondaryAction) {
        secondaryBtn.addEventListener("click", async () => {
          try {
            await onSecondaryAction();
          } catch (error) {
            console.error("Secondary action failed:", error);
          }
          Swal.close();
        });
      }
    },
  });

  return result;
};

// Predefined success modal for AXA transactions
export const showAXASuccessModal = async (
  onViewDetails?: () => Promise<void> | void,
  onPurchaseNew?: () => Promise<void> | void
) => {
  return showTransactionResult({
    type: "success",
    title: "Successfully Purchased!",
    message: "AXA PASS has been successfully created. View details of this Transaction.",
    primaryButtonText: "Purchase New Policy",
    secondaryButtonText: "View Details",
    showSecondaryButton: true,
    onPrimaryAction: onPurchaseNew,
    onSecondaryAction: onViewDetails,
  });
};

// Predefined failure modal for AXA transactions
export const showAXAFailureModal = async (
  onTryAgain?: () => Promise<void> | void,
  onContactSupport?: () => Promise<void> | void
) => {
  return showTransactionResult({
    type: "failure",
    title: "Transaction Failed!",
    message: "Your AXA PASS purchase could not be completed. Please try again or contact our support team for assistance.",
    primaryButtonText: "Try Again",
    secondaryButtonText: "Contact Support",
    showSecondaryButton: true,
    onPrimaryAction: onTryAgain,
    onSecondaryAction: onContactSupport,
  });
};

// Generic success modal
export const showSuccessModal = async (
  title?: string,
  message?: string,
  primaryButtonText?: string,
  onPrimaryAction?: () => Promise<void> | void
) => {
  return showTransactionResult({
    type: "success",
    title,
    message,
    primaryButtonText: primaryButtonText || "Continue",
    showSecondaryButton: false,
    onPrimaryAction,
  });
};

// Generic failure modal
export const showFailureModal = async (
  title?: string,
  message?: string,
  primaryButtonText?: string,
  onPrimaryAction?: () => Promise<void> | void
) => {
  return showTransactionResult({
    type: "failure",
    title,
    message,
    primaryButtonText: primaryButtonText || "Try Again",
    showSecondaryButton: false,
    onPrimaryAction,
  });
};

// Insurance-specific success modal
export const showInsuranceSuccessModal = async (
  policyType: string,
  onViewPolicy?: () => Promise<void> | void,
  onPurchaseNew?: () => Promise<void> | void
) => {
  return showTransactionResult({
    type: "success",
    title: "Policy Created Successfully!",
    message: `Your ${policyType} policy has been successfully created and is now active. You can view your policy details or purchase additional coverage.`,
    primaryButtonText: "Purchase New Policy",
    secondaryButtonText: "View Policy Details",
    showSecondaryButton: true,
    onPrimaryAction: onPurchaseNew,
    onSecondaryAction: onViewPolicy,
  });
};

// Insurance-specific failure modal
export const showInsuranceFailureModal = async (
  policyType: string,
  onTryAgain?: () => Promise<void> | void,
  onContactSupport?: () => Promise<void> | void
) => {
  return showTransactionResult({
    type: "failure",
    title: "Policy Creation Failed!",
    message: `We couldn't create your ${policyType} policy at this time. This might be due to a temporary issue or missing information. Please try again or contact our support team.`,
    primaryButtonText: "Try Again",
    secondaryButtonText: "Contact Support",
    showSecondaryButton: true,
    onPrimaryAction: onTryAgain,
    onSecondaryAction: onContactSupport,
  });
};
