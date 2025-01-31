import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '@/Components/AdminDashboard/Layout';
import { toast } from 'react-toastify';

export default function ViewCategory({Categories}) {
   
    const [editingId, setEditingId] = useState(null);
    const [name, setName] = useState('');
    console.log('categorys',Categories)
    const [categories,setCategories]= useState(Categories);
    
       
    const handleEditCategory = async (id) => {
        try {
            const response = await axios.put(`http://localhost:3000/api/Category/EditCategory`, { id, name });
            console.log('res data of category .......',response.data.data)
            if (response.status === 200) {
                toast.success("Category updated successfully");
                saveEdit(response.data.data);
                setEditingId(null);
                setName('');
            }
        } catch (error) {
            console.error("Error updating category:", error);
            toast.warning("Failed to update category");
        }
    };
    
    const saveEdit = (Category) => {
        console.log('new category id .......',Category._id);

        const updatedCategories = categories.map((category) => {
            console.log('map Category id ',category._id)
            if (category._id === Category._id) {
                console.log('condition match .....')
                return Category ;
            }
            return category;
        });
        console.log('updated Categotys',updatedCategories);
        setCategories(updatedCategories);
    };
    

    const handleDeleteCategory = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/Category/DeleteCategory`, { data: { id } });
            if (response.status === 200) {
                toast.success("Category deleted successfully");
                DeleteCategory(id)
            }
        } catch (error) {
            console.error("Error deleting category:", error);
            toast.warning("Failed to delete category");
        }
    };
    const DeleteCategory = async (id)=>{
        console.log('id ',id);
        try {
            const updatedCategories = categories.filter((category)=>{
                return category._id !=id;
            })
            setCategories(updatedCategories);
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    }

    return (
        <Layout>
        <div className="max-w-2xl mx-auto mt-10 p-5 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-5 text-center">View Categories</h1>
            <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories && categories.map((category) => (
                        <tr key={category._id}>
                            <td className="border border-gray-300 px-4 py-2">
                                {editingId === category._id ? (
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-lg"
                                    />
                                ) : (
                                    category.name
                                )}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {editingId === category._id ? (
                                    <button
                                        onClick={() => handleEditCategory(category._id)}
                                        className="bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600 transition"
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => { setEditingId(category._id); setName(category.name); }}
                                        className="bg-yellow-500 text-white px-4 py-1 rounded-lg hover:bg-yellow-600 transition"
                                    >
                                        Edit
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDeleteCategory(category._id)}
                                    className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition ml-2"
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
}

export async function getServerSideProps() {
    const response = await axios.get('http://localhost:3000/api/Category/ViewCategory');
   const Categories =  response.data.Categories
    console.log("data in tshirt", Categories);
  
    return {
      props: {
       Categories
      },
    };
  }
