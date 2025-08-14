import CashAccountShowcase from "../components/CashAccShowCase";
import { CashAccount } from "../types/types";

const CashAcc = () => {
  const sampleAccount: CashAccount = {
    _id: "1234567890",
    name: "Main Savings Account",
    type: "bank",
    balance: 12500.75,
    currency: "Tk",
    accountNumber: "1234567890",
    institution: "ABC Bank Ltd",
  };
  return (
    // <div>
    //   <h1>Cash Account Services</h1>
    //   <p>Manage your cash account services here.</p>
    // </div>
    <div className="min-h-screen bg-gray-100 p-4">
      <CashAccountShowcase account={sampleAccount} />
    </div>
  );
};
export default CashAcc;
