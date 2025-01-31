import React, { useState } from "react";

const ShippingAddressModal = ({ ShippingInfo, setOrder,onClose }) => {
  const [ShippingInfoo, setShippingInfoo] = useState(ShippingInfo);
  console.log("shipping INfo ...........",ShippingInfoo);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('name ,,', name);
    console.log('value ......', value);
    setShippingInfoo((prev) => ({ ...prev, [name]: value }));
  };
  
  const onSave = (e) => {
    e.preventDefault(); // Ensure the event object is passed
    setOrder((prevOrder) => ({ ...prevOrder, ShippingInfo: ShippingInfoo }));
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
    <div className="bg-white p-8 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Shipping Details</h2>
      <form >
      <label className="block mb-2">
          name
          <input
            type="text"
            name="name"
            value={ShippingInfoo.name}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </label>
        <label className="block mb-2">
          Email
          <input
            type="text"
            name="email"
            value={ShippingInfoo.email}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </label>
        <label className="block mb-2">
          address
          <input
            type="text"
            name="address"
            value={ShippingInfoo.address}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </label>
        <label className="block mb-2">
          Phone Number
          <input
            type="number"
            name="phone"
            value={ShippingInfoo.phone}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </label>

      
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" onClick={onSave}>Save</button>
        <button type="button" onClick={onClose} className="ml-4">Cancel</button>
      </form>
    </div>
  </div>
  );
};

export default ShippingAddressModal;
