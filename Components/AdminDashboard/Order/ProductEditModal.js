import React, { useState } from "react";

const ProductEditModal = ({ product, onClose,setOrder,order}) => {
  const [formData, setFormData] = useState(product);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log('formdata.....',formData);

  };
  const onSave = () => {
    console.log('onSave Function working............');
    // Find the index of the product to update
    const productIndex = order.Products.findIndex(p => p._id === product._id);
    console.log('product index ......', productIndex);

    // Calculate the new amount
    let Amount = 0;
    const updatedProducts = order.Products.map((p, index) => {
        // If this is the product to update, replace it with formData
        if (index === productIndex) {
            return formData;
        }
        // Otherwise, keep the product as is
        return p;
    });

    // Calculate the total amount after update
    Amount = updatedProducts.reduce((total, p) => total + (p.price * p.quantity), 0);

    // Update the entire order with the updated Products array and amount
    setOrder({ ...order, Products: updatedProducts, amount: Amount });

    // Close the modal
    onClose();
};


//  onSave={(updatedProduct) => handleProductEdit(showProductModal, updatedProduct)}
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
        <form onSubmit={(e) => { e.preventDefault(); onSave(); }}>
          <label className="block mb-2">
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </label>
          <label className="block mb-2">
            Quantity:
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </label>
          <label className="block mb-2">
            Color:
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </label>
          <label className="block mb-2">
            Size:
            <input
              type="text"
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </label>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
          <button type="button" onClick={onClose} className="ml-4">Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default ProductEditModal;
