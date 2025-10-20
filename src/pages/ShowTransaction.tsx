import { useEffect, useState } from "react";
import TransactionList from "../components/TransactionList";

const ShowTransaction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_URI}cash-transactions`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();

      if (res.ok) setTransactions(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <>
      {!isLoading && <TransactionList transactions={transactions} />}
      {!isLoading && transactions?.length === 0 && (
        <p>No transactions found.</p>
      )}
      {isLoading && <p>Loading...</p>}
    </>
  );
};

export default ShowTransaction;
