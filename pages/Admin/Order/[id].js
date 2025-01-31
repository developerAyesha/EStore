import React,{useState} from "react";
import Link from "next/link";
import { FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";
import OrderDetailsModal from "@/Components/AdminDashboard/Order/OrderDetailsModal";
import ProductEditModal from "@/Components/AdminDashboard/Order/ProductEditModal";
import ShippingAddressModal from "@/Components/AdminDashboard/Order/ShippingAddressModal";
import axios from "axios";
const ViewOrder = ({ Userorder }) => {
 
  console.log('order aat client ',Userorder);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);

  const [editedOrder, setEditedOrder] = useState(Userorder);
  const [order,setOrder] = useState(Userorder);
  console.log('order .........',order);

  const handleOrderEdit = (updatedOrder) => {
    setEditedOrder(updatedOrder);
    setShowOrderModal(false);
  };
  const handleProductEdit = (index, updatedProduct) => {
    const updatedProducts = [...editedOrder.Products];
    updatedProducts[index] = updatedProduct;
    setEditedOrder({ ...editedOrder, Products: updatedProducts });
    setShowProductModal(null);
  };
  const handleAddressEdit = (updatedAddress) => {
    setEditedOrder({ ...editedOrder, address: updatedAddress });
    setShowAddressModal(false);
  };
  const deleteProduct = (id) => {
    console.log('Deleted product id ', id);
    
    // Filter out the product with the given id
    const updatedP = order.Products.filter((product) => product._id !== id);
    console.log('Updated products after deleting:', updatedP);
    
    // If there are no products left in the order, remove the entire order
    if (updatedP.length === 0) {
        setOrder({ ...order, Products: [], amount: 0 }); // Or set the order to null or an empty object as per your requirement
    } else {
        // Otherwise, just update the order with the new products array
        let Amount = updatedP.reduce((total, p) => total + (p.price * p.quantity), 0);
        setOrder({ ...order, Products: updatedP, amount: Amount });
    }
  }

    const saveOrder = async ( ) => {
      try {
        const res = await axios.put(`/api/Order/saveOrder`,order);
        if (res.status === 200) {
          console.log('Order saved successfully:', res.data);
        
         
        } else {
          console.error('Failed to save order:', res.data.message);
        }
      } catch (error) {
        console.error('Error saving order:', error.response?.data || error.message);
      }
 
    }

  return (

    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Order Header */}
        <div className="bg-white shadow-lg rounded-xl p-8 mb-8">
          <div className="flex justify-between align-middle">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Details</h1>
         
          </div>
          <div className="flex justify-between text-gray-700">
            <p className="text-lg"><strong>Order ID #:</strong> 1234</p>
            <div className="flex justify-center align-middle">
          <p className={`text-lg font-medium ${order.status === 'booked' ? 'text-green-600' : 'text-blue-600'}`}><strong>Status:</strong> {order.status}</p>
          <FaEdit className="mx-2 text-2xl cursor-pointer"  onClick={() => setShowOrderModal(true)} />
         
          </div>
          </div>
        
          <div className="flex justify-between mt-4 text-gray-600">
            <p className="text-lg"><strong>Order Amount:</strong> ${order.amount}</p>
            <p className="text-lg"><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Products List */}
        <div className="bg-white shadow-lg rounded-xl p-8 mb-8">
          <h2 className="text-3xl font-semibold text-gray-900">Ordered Products</h2>
          <table className="min-w-full mt-6 table-auto">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Product</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Quantity</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Color/Size</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Price</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.Products.map((product, index) => (
                <tr key={index} className="border-t hover:bg-gray-100">
                  <td className="px-6 py-4 text-gray-800">{product.title}</td>
                  <td className="px-6 py-4 text-gray-800">{product.quantity}</td>
                  <td className="px-6 py-4 text-gray-800">{product.color}/ {product.size}</td>
                  <td className="px-6 py-4 text-gray-800">${(product.price || 0).toFixed(2)}</td>
                  <td className="px-6 py-4 text-gray-800">${(product.quantity * (product.price || 0)).toFixed(2)}</td>
                  <td className="px-6 py-4 flex justify-center align-middle gap-3"> <FaEdit className="mr-2 text-2xl text-blue-600 cursor-pointer"  onClick={() => setShowProductModal(index)}/> <FaTrash className=" text-2xl  text-red-600 cursor-pointer" onClick={()=>{deleteProduct(product._id)}} /> </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Shipping Address */}
        <div className="bg-white shadow-lg rounded-xl p-8 mb-8">
        <div className="flex justify-between align-middle">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shipping Details</h1>
          <FaEdit className="mr-2 text-3xl cursor-pointer"  onClick={() => setShowAddressModal(true)}/>
          </div>
          <p className="mt-4 text-lg text-gray-600">{order.ShippingInfo.name}</p>
          <p className="mt-4 text-lg text-gray-600">{order.ShippingInfo.email}</p>
          <p className="mt-4 text-lg text-gray-600">{order.ShippingInfo.phone}</p>
          <p className="mt-4 text-lg text-gray-600">{order.ShippingInfo.address}</p>
          <p className="mt-4 text-lg text-gray-600">{order.ShippingInfo.city},{order.ShippingInfo.state}</p>
       
          
        </div>


        {showOrderModal && (
          <OrderDetailsModal
            order={editedOrder}
            setOrder={setOrder}
            onClose={() => setShowOrderModal(false)}
            onSave={handleOrderEdit}
          />
        )}
          {showProductModal !== null && (
          <ProductEditModal
            order = {order}
            product={order.Products[showProductModal]}
            setOrder ={setOrder}
            onClose={() => setShowProductModal(null)}
            onSave={(updatedProduct) => handleProductEdit(showProductModal, updatedProduct)}
          />
        )}
           {showAddressModal && (
          <ShippingAddressModal
            ShippingInfo={editedOrder.ShippingInfo}
            setOrder={setOrder}
            onClose={() => setShowAddressModal(false)}
            onSave={handleAddressEdit}
          />
        )}

        {/* Action Buttons */}
        <div className="flex justify-center space-x-6">
        
        
          
            <button className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-gray-700 transition" onClick={saveOrder}>
             Save Order
            </button>
      
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;

export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await fetch(`http://localhost:3000/api/Order/getOrder?id=${id}`);
  ;
  const { data } = await res.json();

  console.log(data);  // Check the structure of 'data' returned

  return {
    props: { Userorder: data || null },  // Ensure it's not undefined
  };
}

