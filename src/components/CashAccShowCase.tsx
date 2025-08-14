import React from "react";
import { CashAccount } from "../types/types";

interface CashAccountShowcaseProps {
  account: CashAccount;
}

const CashAccountShowcase: React.FC<CashAccountShowcaseProps> = ({
  account,
}) => {
  const formatBalance = (balance: number): string => {
    return balance.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const getTypeDisplay = (type: string) => {
    switch (type) {
      case "bank":
        return "🏦";
      case "cash":
        return "💵";
      case "mobile":
        return "📱";
      default:
        return "💳";
    }
  };

  const getTypeBgColor = (type: string) => {
    switch (type) {
      case "bank":
        return "bg-blue-100";
      case "cash":
        return "bg-green-100";
      case "mobile":
        return "bg-purple-100";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div className="max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-md">
      {/* Header Section */}
      <div className="mb-6 flex items-center border-b border-gray-100 pb-4">
        <div className="mr-4 text-3xl">{getTypeDisplay(account.type)}</div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">{account.name}</h2>
          <span
            className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-medium ${getTypeBgColor(account.type)} text-gray-700 capitalize`}
          >
            {account.type}
          </span>
        </div>
      </div>

      {/* Balance Section */}
      <div className="mb-6 rounded-lg bg-gray-50 p-4 text-center">
        <p className="text-sm font-medium text-gray-600">Current Balance</p>
        <p className="text-3xl font-bold text-gray-900">
          {account.currency} {formatBalance(account.balance!)}
        </p>
      </div>

      {/* Details Section */}
      <div className="space-y-4">
        {account.institution && (
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
              Institution
            </p>
            <p className="text-gray-900">{account.institution}</p>
          </div>
        )}

        {account.accountNumber && (
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
              Account Number
            </p>
            <p className="font-mono text-gray-900 break-all">
              {account.accountNumber}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CashAccountShowcase;
