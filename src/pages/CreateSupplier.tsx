import React, { useState } from "react";

interface SupplierFormData {
  name: string;
  contact: string;
  address: string;
  notes: string;
}

const CreateSupplier: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [formData, setFormData] = useState<SupplierFormData>({
    name: "",
    contact: "",
    address: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Supplier Data:", formData);
    try {
      setIsLoading(true);
      await fetch(`${import.meta.env.VITE_API_URI}suppliers`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          paymentTerms: Number(0),
        }),
      });
    } catch (err) {
      console.error(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-2xl mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Create Supplier
      </h2>

      <form onSubmit={handleSubmit} className="grid gap-5">
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Supplier Name"
            value={formData.name}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="contact" className="mb-1 font-medium">
            Contact
          </label>
          <input
            type="tel"
            id="contact"
            name="contact"
            placeholder="Supplier Contact"
            value={formData.contact}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="address" className="mb-1 font-medium">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Supplier Address"
            value={formData.address}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="notes" className="mb-1 font-medium">
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            placeholder="Supplier Notes"
            value={formData.notes}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={4}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
        {isError && <p className="text-red-500">"Something went wrong"</p>}
      </form>
    </div>
  );
};

export default CreateSupplier;
