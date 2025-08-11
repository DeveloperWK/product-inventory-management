import {
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { OrderFormData, Product } from "../types/types";

interface ItemsOrderProps {
  fields: FieldArrayWithId[];
  register: UseFormRegister<OrderFormData>;
  setSearchTerms: React.Dispatch<React.SetStateAction<string[]>>;
  setShowSuggestionsIndex: (value: number | null) => void;
  searchTerms: string[];
  showSuggestionsIndex: number | null;
  handleSuggestion: (value: string) => Product[];
  setValue: UseFormSetValue<OrderFormData>;
  remove: UseFieldArrayRemove;
  append: UseFieldArrayAppend<OrderFormData, "items">;
  errors: FieldErrors<OrderFormData>;
}
const ItemsOrder = ({
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
}: ItemsOrderProps) => {
  return (
    <>
      <div>
        <label className="block mb-2 font-semibold">Items</label>
        {fields.map((field, index) => (
          <div key={field.id} className="mb-6 space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-start">
              {/* Product Input + Suggestions */}
              <div className="sm:col-span-5 relative suggestion-container">
                <input
                  type="text"
                  placeholder="Product ID"
                  {...register(`items.${index}.product`, {
                    required: "Product ID is required",
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
                            setValue(`items.${index}.product`, suggestion._id!);
                            setSearchTerms((prev) => {
                              const updated = [...prev];
                              updated[index] = suggestion._id!;
                              return updated;
                            });
                            setShowSuggestionsIndex(null);
                          }}
                        >
                          {suggestion.name}
                        </div>
                      ),
                    )}
                  </div>
                )}
              </div>

              {/* Quantity */}
              <div className="sm:col-span-2">
                <input
                  type="number"
                  placeholder="Qty"
                  {...register(`items.${index}.quantity`, {
                    required: "Quantity is required",
                    min: { value: 1, message: "Min quantity is 1" },
                    valueAsNumber: true,
                  })}
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* Unit Price */}
              <div className="sm:col-span-3">
                <input
                  type="number"
                  placeholder="Unit Price"
                  {...register(`items.${index}.unitPrice`, {
                    required: "Unit price is required",
                    min: { value: 0, message: "Min price is 0" },
                    valueAsNumber: true,
                  })}
                  className="w-full p-2 border rounded"
                  step="0.01"
                />
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
              {errors.items?.[index]?.product?.message}
              {errors.items?.[index]?.quantity?.message && (
                <div>{errors.items[index].quantity?.message}</div>
              )}
              {errors.items?.[index]?.unitPrice?.message && (
                <div>{errors.items[index].unitPrice?.message}</div>
              )}
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => {
            append({ product: "", quantity: 1, unitPrice: 0 });
            setSearchTerms((prev) => [...prev, ""]);
          }}
          className="text-blue-600 hover:underline text-sm"
        >
          + Add Item
        </button>
      </div>
    </>
  );
};

export default ItemsOrder;
