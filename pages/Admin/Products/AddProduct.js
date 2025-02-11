import Layout from '@/Components/AdminDashboard/Layout'
import React, { useState } from 'react'
import axios from 'axios'
import { useForm ,Controller} from 'react-hook-form'
import { useDropzone } from 'react-dropzone';
import Select from 'react-select';
const AddProduct = ({Categories}) => {
  console.log('Categories in map ......',Categories);
  const [imagePreview, setImagePreview] = useState(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control
  } = useForm()

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
  const handleChange = selectedOption => {
    console.log('Selected option:', selectedOption);
  };
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


  const onSubmit = async (data) => {
    console.log('selected file .....',selectedFile)
    console.log('data in form .......',data);
    try {
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('slug', data.slug)
      formData.append('desc', data.desc)
      formData.append('price', data.price)
      formData.append('img', selectedFile) 
      formData.append('category', data.category.value)
      formData.append('color', data.color.value)
      formData.append('size', data.size.value)
      formData.append('availableQuantity', data.availableQuantity)
      formData.append('isPremium', true)

      const response = await axios.post('http://localhost:3000/api/addProduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      console.log('Product added successfully:', response.data)
      alert('Product added successfully!')
    } catch (error) {
      console.error('Error adding product:', error)
      alert('Failed to add product. Please try again.')
    }
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 mx-auto mt-1 p-6 bg-white rounded-lg shadow-lg">
   
        <h1 className="text-center font-bold text-2xl text-gray-800 mb-6">Add New Product</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
          <div className="form-group">
            <label className="uppercase  text-sm text-black font-bold">Product Name</label>
            <input
              className="w-full p-1.5 mt-1 border border-gray-300 rounded-lg  focus:ring-pink-600"
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
              className="w-full p-1.5 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600"
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
              className="w-full p-1.5 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600"
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
              className="w-full p-1.5 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600"
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
              className="w-full p-1.5  mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600"
              {...register('price', {
                required: { value: true, message: 'Price is required.' },
              })}
            />
            {errors.price && (
              <p className="text-red-600 text-sm mt-1">{errors.price.message}</p>
            )}
          </div>

         
       

      <div className=" p-1 bg-white col-span-2">
      
      
      <div {...getRootProps()} className=" text-right rounded-lg cursor-pointer  border-2  py-2 border-pink-700 border-dashed">
        <input {...getInputProps()} />
        <h2 className="text-center text-xl font-bold text-black mb-4">Upload Your Image</h2>
      </div>

      {filePreview && (
        <div className="mt-4 flex justify-center">
          <img src={filePreview} alt="Preview" className="w-32 rounded-lg shadow-md" />
        </div>
      )}

   
    </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="w-1/4 p-3 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition-all"
          >
            Add Product
          </button>
        </div>
      </form>
    </Layout>
  )
}

export default AddProduct
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