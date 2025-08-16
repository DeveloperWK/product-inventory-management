import { useEffect, useState } from "react";
import CashAccountShowcase from "../components/CashAccShowCase";
import { CashAccount } from "../types/types";

const CashAcc = () => {
  const [account, setAccount] = useState<CashAccount[]>([]);
  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URI}cash-accounts`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          },
        );
        const data = await response.json();
        setAccount(data);
      } catch (error) {
        console.error("Error fetching account data:", error);
      }
    };

    fetchAccountData();
  }, []);

  return (
    <>
      <div className=" bg-gray-100 p-4 flex flex-col gap-5 md:flex-row ">
        {account.map((acc) => (
          <CashAccountShowcase key={acc._id} account={acc} />
        ))}
      </div>
    </>
  );
};
export default CashAcc;
