import { useState } from 'react';
import axios from 'axios';
import Layout from '@/Components/AdminDashboard/Layout';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
export default function AddCategory() {

    const {
            register,
            handleSubmit,
            reset,
            formState: { errors },
          } = useForm();
    const [name, setName] = useState('');

    const handleAddCategory = async (data) => {
    
        const {name}=data;
        try {
            const response = await axios.post('http://localhost:3000/api/Category/AddCategory', { name });
            if (response.status === 200) {
                toast.success("Category added successfully");
                reset()
            }
        } catch (error) {
            console.error("Error adding category:", error);
            toast.warning("Failed to add category");
        }
    };

    return (
        <Layout>
           <form onSubmit={handleSubmit(handleAddCategory)} >
        <div className="max-w-md mx-auto mt-10 p-5 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-5 text-center">Add Category</h1>
            <input
                type="text"
                placeholder="Category Name"
                {...register('name',{
                    required:{
                        value:true,
                        message:'Category Name is Required'
                    }
                })}
                className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (<p className='text-red-700 mb-1'>{errors.name.message}</p>)}
            <button
               type='submit'
                className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
            >
                Add Category
            </button>
        </div>
        </form>
        </Layout>
    );
}
