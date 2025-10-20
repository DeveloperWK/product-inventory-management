import { FieldErrors, UseFormRegister } from "react-hook-form";
import { OrderFormData } from "../types/types";

interface CourierSectionProps {
  courier: boolean;
  handleCourierChange: () => void;
  register: UseFormRegister<OrderFormData>;
  errors: FieldErrors;
}

const CourierSection = ({
  courier,
  handleCourierChange,
  register,
  errors,
}: CourierSectionProps) => {
  return (
    <>
      <div className="border-t pt-6">
        <button
          onClick={handleCourierChange}
          className="w-full sm:w-auto text-lg font-semibold text-white bg-green-600 hover:bg-green-700 active:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 transition-colors duration-300 px-4 py-2 rounded-full mb-4 shadow-md"
        >
          Courier Info
        </button>

        {courier && (
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-semibold">Delivery Type</label>
              <select
                {...register("delivery_type", {
                  required: "Delivery type is required",
                })}
                className="w-full p-2 border rounded"
              >
                <option value="0">Home Delivery</option>
                <option value="1">Point Delivery</option>
              </select>
              {errors.delivery_type && (
                <p className="text-red-500 text-sm">
                  {errors.delivery_type.message as string}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Recipient Name
              </label>
              <input
                {...register("recipient_name", { required: "Name required" })}
                className="w-full border p-2 rounded"
                placeholder="John Doe"
              />
              {errors.recipient_name && (
                <p className="text-sm text-red-600">
                  {errors.recipient_name.message as string}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Recipient Phone
              </label>
              <input
                {...register("recipient_phone", {
                  required: "Phone required",
                })}
                className="w-full border p-2 rounded"
                placeholder="01XXXXXXXXX"
              />
              {errors.recipient_phone && (
                <p className="text-sm text-red-600">
                  {errors.recipient_phone.message as string}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Recipient Address
              </label>
              <textarea
                {...register("recipient_address", {
                  required: "Address required",
                })}
                className="w-full border p-2 rounded"
                rows={2}
                placeholder="Address..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Note</label>
              <input
                {...register("note")}
                className="w-full border p-2 rounded"
                placeholder="Optional note"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Invoice</label>
              <input
                {...register("invoice")}
                className="w-full border p-2 rounded bg-gray-100"
                readOnly
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CourierSection;
