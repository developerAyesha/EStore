import Layout from '@/Components/AdminDashboard/Layout';
import axios from 'axios';
import React, { useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useForm ,Controller} from 'react-hook-form'
import { useDropzone } from 'react-dropzone';
import Select from 'react-select';
const UpdateProducts = ({products,Categories}) => {
    console.log('user products .........',products.products);
    console.log('category .........',Categories)
    const [Products,setProducts]= useState(products.products);
    const [ProdutId,setProductId]= useState("");
     const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);     
    const categoryOptions = Categories.map(category => ({
      value: category.name,
      label: category.name
    }));
    const colorOptions = [
      { value: 'red', label: 'Red' },
      { value: 'yellow', label: 'Yellow' },
      { value: 'blue', label: 'Blue' },
      { value: 'green', label: 'Green' },
      { value: 'black', label: 'Black' },
      { value: 'white', label: 'White' },
      { value: 'grey', label: 'Grey' },
      { value: 'purple', label: 'Purple' },
      { value: 'orange', label: 'Orange' },
    ];
  
    const sizeOptions = [
      { value: 'XS', label: 'XS' },
      { value: 'S', label: 'S' },
      { value: 'M', label: 'M' },
      { value: 'L', label: 'L' },
      { value: 'XL', label: 'XL' },
      { value: 'XXL', label: 'XXL' },
    ];
     const [filePreview, setFilePreview] = useState(null)
      const [selectedFile, setSelectedFile] = useState(null)
    
      const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0]
        setSelectedFile(file)
        setFilePreview(URL.createObjectURL(file)) // Generate file preview
      }
    
      const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*', // Accept image files only
        multiple: false, // Only allow one file at a time
      })
    
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        control,
        formState: { errors },
    } = useForm();
    const handleEditClick = (item) => {
      setEditingProduct(item);
      setProductId(item._id)
      setValue('title', item.title);
      setValue('slug', item.slug);
      setValue('desc', item.desc);
      setValue('price', item.price);
      setValue('category', { value: item?.category?.name, label: item?.category?.name });
      setValue('color', { value: item.color, label: item.color });
      setValue('size', { value: item.size, label: item.size });
      setValue('img', item.img);
      setValue('availableQuantity', item.availableQuantity);
      setIsPopupOpen(true);
    };
  
    const closePopup = () => {
      setEditingProduct(null);
      setIsPopupOpen(false);
      reset();
    };
    const deleteProduct = async (slug) => {
        try {
            console.log('slug . in user interface .....', slug);
            const res = await axios.delete(`http://localhost:3000/api/deleteProduct?slug=${slug}`);
            console.log('response ....', res);

            if (res.status === 200) {
                // Update the state by removing the deleted product
                setProducts(prevProducts => prevProducts.filter(product => product.slug !== slug));
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setValue('img',files[0])
    };
    const submit = async (data) => {
      try {
        const formData = new FormData();
        formData.append('productId', ProdutId);
        formData.append('title', data.title);
        formData.append('slug', data.slug);
        formData.append('desc', data.desc);
        formData.append('price', data.price);
        
        // If a new file is selected, append it
        if (selectedFile) {
          formData.append('img', selectedFile);
        } else {
          // If no new image is selected, use the existing image URL
          formData.append('img', data.img);  // imgUrl contains the existing image URL
        }
        
        formData.append('category', data.category.value);
        formData.append('color', data.color.value);
        formData.append('size', data.size.value);
        formData.append('availableQuantity', data.availableQuantity);
    
        const response = await axios.put('http://localhost:3000/api/updateProduct', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
    
        console.log('Product updated successfully:', response.data);
        alert('Product updated successfully!');
        
        // Update the Products state with the updated product
        setProducts(prevProducts => 
          prevProducts.map(item => 
            item._id === ProdutId ? { ...item, ...response.data.product } : item
          )
        );
    
        closePopup();
      } catch (error) {
        console.error('Error updating product:', error);
        alert('Failed to update product. Please try again.');
      }
    };
    
    
  return (
 
     <Layout>
        <h1 className='text-center font-bold text-2xl my-3'>UPDATE PRODUCTS</h1>
        {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form
            onSubmit={handleSubmit(submit)}
            className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-2xl"
          >
            <h1 className="text-center font-bold text-xl mb-4">EDIT PRODUCT</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
          <div className="form-group">
            <label className="uppercase  text-sm text-black font-bold">Product Name</label>
            <input
              className="w-full p-1.5 mt-2 border border-gray-300 rounded-lg  focus:ring-pink-600"
              {...register('title', {
                required: { value: true, message: 'Product name is required.' },
              })}
            />
            {errors.title && (
              <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>
          <div className="form-group">
            <label className="uppercase font-bold text-sm text-black">Item Code</label>
            <input
              className="w-full p-1.5 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600"
              {...register('slug', {
                required: { value: true, message: 'Item Code is required.' },
              })}
            />
            {errors.slug && (
              <p className="text-red-600 text-sm mt-1">{errors.slug.message}</p>
            )}
          </div>
        
          <div className="form-group col-span-2">
        <label className="uppercase font-bold text-sm text-black">Category</label>
        <Controller
          name="category"
          control={control}
         
          rules={{ required: 'Category is required.' }}
          render={({ field }) => (
            <Select
              {...field}
              options={categoryOptions}
              classNamePrefix="react-select"
              placeholder="Select a category"
              isClearable
            />
          )}
        />
        {errors.category && (
          <p className="text-red-600 text-sm mt-1">{errors.category.message}</p>
        )}
      </div>

          <div className="form-group col-span-2">
            <label className="uppercase font-bold text-sm text-black">Description</label>
            <textarea
              className="w-full p-1.5 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600"
              {...register('desc', {
                required: { value: true, message: 'Description is required.' },
              })}
            ></textarea>
            {errors.desc && (
              <p className="text-red-600 text-sm mt-1">{errors.desc.message}</p>
            )}
          </div>

        

          <div className="form-group">
        <label className="uppercase font-bold text-sm text-black">Color</label>
        <Controller
          name="color"
          control={control}
          rules={{ required: 'Color is required.' }}
          render={({ field }) => (
            <Select
              {...field}
              options={colorOptions}
              classNamePrefix="custom-select"
            />
          )}
        />
        {errors.color && (
          <p className="text-red-600 text-sm mt-1">{errors.color.message}</p>
        )}
      </div>

      <div className="form-group">
        <label className="uppercase font-bold text-sm text-black">Size</label>
        <Controller
          name="size"
          control={control}
          rules={{ required: 'Size is required.' }}
          render={({ field }) => (
            <Select
              {...field}
              options={sizeOptions}
              classNamePrefix="custom-select"
            />
          )}
        />
        {errors.size && (
          <p className="text-red-600 text-sm mt-1">{errors.size.message}</p>
        )}
      </div>
          <div className="form-group">
            <label className="uppercase font-bold text-sm text-black">Quantity</label>
            <input
              className="w-full p-1.5 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600"
              {...register('availableQuantity', {
                required: { value: true, message: 'Quantity is required.' },
              })}
            />
            {errors.availableQuantity && (
              <p className="text-red-600 text-sm mt-1">{errors.availableQuantity.message}</p>
            )}
          </div>

          <div className="form-group">
            <label className="uppercase font-bold text-sm text-black">Price</label>
            <input
              className="w-full p-1.5  mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600"
              {...register('price', {
                required: { value: true, message: 'Price is required.' },
              })}
            />
            {errors.price && (
              <p className="text-red-600 text-sm mt-1">{errors.price.message}</p>
            )}
          </div>

         
       

 
      
      
      <div {...getRootProps()} className=" text-right rounded-lg cursor-pointer  border-2  py-2 border-pink-700 border-dashed">
        <input {...getInputProps()} />
        <h2 className="text-center text-xl font-bold text-black mb-4">Upload Your Image</h2>
      </div>

      {filePreview && (
        <div className="mt-4 flex justify-center">
          <img src={filePreview} alt="Preview" className="w-10 rounded-lg shadow-md" />
        </div>
      )}

 
        </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                className="bg-gray-400 text-white py-2 px-4 rounded"
                onClick={closePopup}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
        {Products.map((item,id)=>(
             <div className="container lg:px-52 sm:px-4 " id={id}>
             <div className="space-y-6">
               <div className="shadow-xl p-4">
                 <div className="mx-4 flex flex-col sm:flex-row gap-12 sm:gap-6">
                   <div className="flex-shrink-0 flex align-middle">
                     <img
                       src={item.img}
                     
                       className="w-48 h-auto max-h-28 object-cover rounded-lg shadow-lg"
                     />
                   </div>
                   <div className="ml-4 flex-grow">
                     <h2 className="text-xl mb-2 font-semibold text-gray-900">{item.title}</h2>
                     <h6>{item?.category?.name}</h6>
                     <div className="text-gray-700">
                       <p>Color:{item.color}</p>
                       <p>Size:{item.size} </p>
                       <div className="flex flex-col sm:flex-row sm:justify-between lg:justify-between gap-2 sm:gap-4">
                         <p>Qty: {item.availableQuantity}</p>
                         <p className="text-lg font-bold">${item.price}</p>
                       </div>
                       <div className='flex justify-start align-middle mt-3'>
                       <FaEdit  className=' text-2xl text-blue-700 mx-2 cursor-pointer'  onClick={() => handleEditClick(item)}/>
                       <MdDeleteForever className='text-2xl text-red-700 cursor-pointer' onClick={() => deleteProduct(item.slug)} />


                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           
           </div>
        ))}
   
                  </Layout>
   
  )
}


export async function getServerSideProps() {
  try {
    // Fetch products using axios
    const productResponse = await axios.get('http://localhost:3000/api/getAllProducts');
    const products = productResponse.data;

    // Fetch categories using axios
  
    const response = await axios.get('http://localhost:3000/api/Category/ViewCategory');
    const Categories =  response.data.Categories
    console.log("data in tshirt", Categories);
    // Return both as props
    return {
      props: {
        products,
        Categories,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);

    // Return empty props in case of an error
    return {
      props: {
        products: [],
        Categories: [],
      },
    };
  }
}

export default UpdateProducts