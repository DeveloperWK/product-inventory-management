const CreateBusinessOrder = () => {
  return (
    <>
      <h1>Create Business Order</h1>
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />
        <label htmlFor="supplierId">Supplier ID:</label>
        <select id="supplierId" name="supplierId" required>
          <option value="">Select a supplier</option>
          {/* Add options for suppliers */}
        </select>
        <label htmlFor="date">Date:</label>
        <input type="date" id="date" name="date" required />
        <label htmlFor="due">Due Date:</label>
        <input type="number" id="due" name="due" min="0" />
        <label htmlFor="payment">Payment Amount:</label>
        <input type="number" id="payment" name="payment" min="0" />
        <label htmlFor="total">Total Amount:</label>
        <input type="number" id="total" name="total" min="0" />
        <label htmlFor="discount">Discount Amount:</label>
        <input type="number" id="discount" name="discount" min="0" />
        <label htmlFor="quantity">Quantity:</label>
        <input type="number" id="quantity" name="quantity" required />
        <button type="submit">Create</button>
      </form>
    </>
  );
};
export default CreateBusinessOrder;
