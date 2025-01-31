import { set } from "mongoose";
import React, { useState } from "react";

const OrderDetailsModal = ({ order,setOrder, onClose }) => {
  const [status, setStatus] = useState(order.status);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('value of status....',value);
    setStatus(value);
  };
   const saveStatus = ()=>{
     setOrder({...order,status:status})
     onClose();
   }
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Order Details</h2>
        <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }}>
          <label className="block mb-2">
            Status:
            <select
              name="status"
              value={status}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              <option value="booked">Booked</option>
              <option value="Pending">Pending</option>
              <option value="Confirm">Confirm</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </label>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded " onClick={saveStatus}>Save</button>
          <button type="button" onClick={onClose} className="ml-4">Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
