import Link from 'next/link';
import { useState } from 'react';

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState('');

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? '' : menu);
  };

  return (
    <div className="bg-gray-800 text-white  w-64 flex flex-col">
      <h2 className="text-2xl font-bold p-4">Admin Dashboard</h2>
      <ul className="space-y-4 mt-4">
        <li>
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-700"
            onClick={() => toggleMenu('product')}
          >
            Product Management
          </button>
          {activeMenu === 'product' && (
            <ul className="pl-6 space-y-2">
              <li>
                <Link href="/Products/AddProduct" className="block hover:underline">
                  Add Product
                </Link>
              </li>
              <li>
                <Link href="/Products/UpdateProducts" className="block hover:underline">
                  View Product
                </Link>
              </li>
            
            </ul>
          )}
        </li>
        <li>
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-700"
            onClick={() => toggleMenu('category')}
          >
            Category Management
          </button>
          {activeMenu === 'category' && (
            <ul className="pl-6 space-y-2">
              <li>
                <Link href="/Category/AddCategory" className="block hover:underline">
                  Add Category
                </Link>
              </li>
              <li>
                <Link href="/Category/ViewCategory" className="block hover:underline">
                  View  Category
                </Link>
              </li>
             
            </ul>
          )}
        </li>
        <li>
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-700"
            onClick={() => toggleMenu('order')}
          >
            Order Management
          </button>
          {activeMenu === 'order' && (
            <ul className="pl-6 space-y-2">
              <li>
                <Link href="/Admin/Order/ViewOrder" className="block hover:underline">
                  View Orders
                </Link>
              </li>
            
            </ul>
          )}
        </li>
        <li>
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-700"
            onClick={() => toggleMenu('user')}
          >
            User Management
          </button>
          {activeMenu === 'user' && (
            <ul className="pl-6 space-y-2">
              <li>
                <Link href="/users/add" className="block hover:underline">
                  Add User
                </Link>
              </li>
              <li>
                <Link href="/users/edit" className="block hover:underline">
                  Edit User
                </Link>
              </li>
              <li>
                <Link href="/users/delete" className="block hover:underline">
                  Delete User
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
