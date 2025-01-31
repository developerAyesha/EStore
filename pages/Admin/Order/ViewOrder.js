import axios from 'axios';
import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import Layout from '@/Components/AdminDashboard/Layout';

const AdminOrderView = ({ orders: initialOrders }) => {
  const [orders, setOrders] = useState(initialOrders);

  const DeleteOrder = async (id) => {
    console.log('Order ID:', id);
    try {
      const res = await axios.delete(`http://localhost:3000/api/Order/DeleteOrder?id=${id}`);
      console.log('Response:', res);
      if (res.status === 200) {
        setOrders(orders.filter((order) => order._id !== id));
        toast.success("order is deleted successfully");
      }
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <Layout>
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="border px-4 py-2">Order ID</th>
            {/* <th className="border px-4 py-2">User Email</th> */}
            <th className="border px-4 py-2">Amount</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="border px-4 py-2">{order._id}</td>
              {/* <td className="border px-4 py-2">{order.ShippingInfo.address}</td> */}
              <td className="border px-4 py-2">${order.amount}</td>
              <td className="border px-4 py-2">{order.status}</td>
              <td className="border px-4 py-2">
                <Link href={`${order._id}`}>
                  <span className="text-blue-500 hover:underline mx-2">View/Edit</span>
                </Link>
                <button
                  className="ml-2 text-red-500 hover:underline"
                  onClick={() => DeleteOrder(order._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </Layout>
  );
};

export default AdminOrderView;

export async function getServerSideProps() {
  try {
    const res = await axios.get('http://localhost:3000/api/Order/getAllOrders');
    const data = res.data.data;
    return {
      props: { orders: data },
    };
  } catch (error) {
    console.error('Error fetching orders:', error);
    return {
      props: { orders: [] },
    };
  }
}
