import React, { useCallback, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import CourierSection from "../components/CourierSection";
import ItemsOrder from "../components/ItemsOrder";
import OrderResponse from "../components/OrderResponse";
import { useProduct } from "../hooks/useProduct";
import { OrderFormData } from "../types/types";

const CreateOrder: React.FC = () => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<OrderFormData>({
    defaultValues: {
      orderType: "purchase",
      items: [{ product: "", quantity: 1, unitPrice: 0 }],
      totalAmount: 0,
      deliveryCharge: 0,
      status: "processing",
      paymentStatus: "pending",
      transaction: "",
      recipient_name: "",
      recipient_phone: "",
      recipient_address: "",
      note: "",
      invoice: `INV-${Date.now().toString().slice(-5)}`,
      delivery_type: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const [isTotalEditable, setIsTotalEditable] = useState(false);
  const [showSuggestionsIndex, setShowSuggestionsIndex] = useState<
    number | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [courier, setCourier] = useState(false);
  const [searchTerms, setSearchTerms] = useState<string[]>([""]);
  const [response, setResponse] = useState({
    courierId: 0,
    trackingCode: "",
  });
  const { products } = useProduct();
  const handleSuggestion = (searchTerm: string) => {
    return products?.filter(({ name }) =>
      name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleCourierChange = () => {
    setCourier(!courier);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".suggestion-container")) {
        setShowSuggestionsIndex(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (!isTotalEditable && name?.startsWith("items")) {
        const items = value.items || [];
        const itemTotal = items.reduce(
          (sum, item) => sum + (item?.quantity || 0) * (item?.unitPrice || 0),
          0
        );
        setValue("totalAmount", itemTotal);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, isTotalEditable, setValue]);
  console.log();
  const onSubmit = useCallback(
    async (data: OrderFormData) => {
      try {
        setIsLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_URI}orders`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        if (response.ok) {
          setIsSuccess(true);
          setResponse({
            courierId: result.courierId,
            trackingCode: result.trackingCode,
          });
        }
        reset();
        setValue("invoice", `INV-${Date.now().toString().slice(-5)}`);
      } catch (error) {
        console.error("Error creating order:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [setResponse, setIsLoading, setIsSuccess, setIsError, reset, setValue]
  );

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 max-w-3xl mx-auto bg-white rounded-lg shadow-md space-y-6"
      >
        <div>
          <label className="block mb-1 font-semibold">Order Type</label>
          <select
            {...register("orderType", { required: "Order type is required" })}
            className="w-full p-2 border rounded"
          >
            <option value="purchase">Purchase</option>
            <option value="sale">Sale</option>
          </select>
          {errors.orderType && (
            <p className="text-red-500 text-sm">{errors.orderType.message}</p>
          )}
        </div>
        <ItemsOrder
          append={append}
          errors={errors}
          fields={fields}
          handleSuggestion={handleSuggestion}
          register={register}
          remove={remove}
          searchTerms={searchTerms}
          setSearchTerms={setSearchTerms}
          setShowSuggestionsIndex={setShowSuggestionsIndex}
          setValue={setValue}
          showSuggestionsIndex={showSuggestionsIndex}
        />
        <div>
          <div>
            <label className="block font-semibold mb-1">Delivery Charge</label>
            <input
              type="number"
              {...register("deliveryCharge", {
                required: "Delivery charge is required",
                valueAsNumber: true,
                onChange: (e) => {
                  const items = watch("items") || [];
                  const itemTotal = items.reduce(
                    (sum, item) =>
                      sum + (item.quantity || 0) * (item.unitPrice || 0),
                    0
                  );
                  const charge = parseFloat(e.target.value) || 0;
                  if (!isTotalEditable)
                    setValue("totalAmount", itemTotal + charge);
                },
              })}
              className="w-full p-2 border rounded"
            />
            {errors.deliveryCharge && (
              <p className="text-red-500 text-sm">
                {errors.deliveryCharge.message}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between mb-1">
            <label className="font-semibold">Total Amount</label>
            <label className="text-sm flex items-center gap-2">
              <input
                type="checkbox"
                checked={isTotalEditable}
                onChange={() => setIsTotalEditable((prev) => !prev)}
              />
              Edit manually
            </label>
          </div>
          <input
            type="number"
            {...register("totalAmount", {
              required: "Total amount is required",
              valueAsNumber: true,
            })}
            className="w-full p-2 border rounded"
            readOnly={!isTotalEditable}
          />
          {errors.totalAmount && (
            <p className="text-red-500 text-sm">{errors.totalAmount.message}</p>
          )}
        </div>

        {/* Status & Payment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Status</label>
            <input
              type="text"
              {...register("status", { required: "Status is required" })}
              className="w-full p-2 border rounded"
            />
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">Payment Status</label>
            <select
              {...register("paymentStatus", {
                required: "Payment status is required",
              })}
              className="w-full p-2 border rounded"
            >
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="partial">Partial</option>
            </select>
            {errors.paymentStatus && (
              <p className="text-red-500 text-sm">
                {errors.paymentStatus.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Transaction ID</label>
          <input
            type="text"
            {...register("transaction")}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Courier Section */}
        <CourierSection
          handleCourierChange={handleCourierChange}
          register={register}
          errors={errors}
          courier={courier}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white font-semibold p-3 rounded hover:bg-blue-700 transition"
        >
          {isLoading ? "Creating order..." : "Submit Order"}
        </button>
        {isError && (
          <p className="text-sm text-red-600">
            An error occurred while creating the order.
          </p>
        )}
        {isSuccess && (
          <p className="text-sm text-green-600">Order created successfully!</p>
        )}
      </form>
      {isSuccess && (
        <OrderResponse
          order={{
            courierId: response?.courierId,
            trackingCode: response?.trackingCode,
          }}
        />
      )}
    </>
  );
};

export default CreateOrder;
