import { WalletAccountDetails } from "@/app/lib/definitions";

export default function WalletContainer({
  account,
}: {
  account: WalletAccountDetails;
}) {
  return (
    <div className="text-xl">
      <p>
        <span className="font-medium">Account name:</span> {account.accountName}
      </p>
      <p>
        <span className="font-medium">Account number:</span>{" "}
        {account.accountNumber}
      </p>
      <p>
        <span className="font-medium">Bank name:</span> {account.bankName}
      </p>
      <p>
        <span className="font-medium">Bank code:</span> {account.bankCode}
      </p>
    </div>
  );
}
