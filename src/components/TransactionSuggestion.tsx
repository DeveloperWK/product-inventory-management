import {
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { BusinessOrderForm, Transaction } from "../types/types";

interface TransactionSuggestionProps {
  fields: FieldArrayWithId[];
  register: UseFormRegister<BusinessOrderForm>;
  setSearchTerms: React.Dispatch<React.SetStateAction<string[]>>;
  setShowSuggestionsIndex: (value: number | null) => void;
  searchTerms: string[];
  showSuggestionsIndex: number | null;
  handleSuggestion: (value: string) => Transaction[];
  setValue: UseFormSetValue<BusinessOrderForm>;
  remove: UseFieldArrayRemove;
  append: UseFieldArrayAppend<BusinessOrderForm, "transactions">;
  errors: FieldErrors<BusinessOrderForm>;
}
const TransactionSuggestion = ({
  fields,
  register,
  setSearchTerms,
  setShowSuggestionsIndex,
  searchTerms,
  showSuggestionsIndex,
  handleSuggestion,
  setValue,
  remove,
  append,
  errors,
}: TransactionSuggestionProps) => {
  return (
    <>
      <div>
        <label className="block mb-2 font-semibold">Transaction</label>
        {fields.map((field, index) => (
          <div key={field.id} className="mb-6 space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-start">
              {/* Product Input + Suggestions */}
              <div className="sm:col-span-5 relative suggestion-container">
                <input
                  type="text"
                  placeholder="Product ID"
                  {...register(`transactions.${index}.transactionId`, {
                    required: "Transaction ID is required",
                    onChange: (e) => {
                      const value = e.target.value;
                      setSearchTerms((prev) => {
                        const updated = [...prev];
                        updated[index] = value;
                        return updated;
                      });
                      setShowSuggestionsIndex(index);
                    },
                  })}
                  value={searchTerms[index] || ""}
                  onFocus={() => setShowSuggestionsIndex(index)}
                  className="w-full p-2 border rounded"
                />
                {showSuggestionsIndex === index && (
                  <div className="absolute z-20 bg-white border rounded mt-1 shadow w-full max-h-40 overflow-y-auto">
                    {handleSuggestion(searchTerms[index] || "")?.map(
                      (suggestion, i) => (
                        <div
                          key={i}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setValue(
                              `transactions.${index}.transactionId`,
                              suggestion._id!,
                            );
                            setSearchTerms((prev) => {
                              const updated = [...prev];
                              updated[index] = suggestion._id!;
                              return updated;
                            });
                            setShowSuggestionsIndex(null);
                          }}
                        >
                          {suggestion.transactionId}
                        </div>
                      ),
                    )}
                  </div>
                )}
              </div>

              {/* Remove Button */}
              <div className="sm:col-span-2 text-right">
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500 text-sm mt-1 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>

            {/* Field-level errors */}
            <div className="text-sm text-red-500">
              {errors.transactions?.[index]?.transactionId?.message}
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => {
            append({ transactionId: "" });
            setSearchTerms((prev) => [...prev, ""]);
          }}
          className="text-blue-600 hover:underline text-sm"
        >
          + Add Transaction
        </button>
      </div>
    </>
  );
};

export default TransactionSuggestion;
