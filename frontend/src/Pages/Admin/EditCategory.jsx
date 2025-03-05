import React, { useEffect, useState } from 'react'
import { editCategory, getCategoryDetails } from '../../api/categoryApi'
import { Link, useParams } from 'react-router-dom'

const EditCategory = () => {
    const { id } = useParams()

    let [category, setCategory] = useState('')

    useEffect(()=>{
        getCategoryDetails(id)
        .then(data=>{
            if (data.error) {
                console.log(error)
            }
            else {
                setCategory(data.category_name)
            }
        })
    },[])

    const handleSubmit = (e) => {
        e.preventDefault()
        editCategory(id,category)
        .then(data=>{
            if(data.error){
                alert(data.error)
            }
            else{
                alert("Category updated successfully.")
            }
        })
    }

  return (
    <>
        <form className='w-50 p-5 shadow-lg my-5 mx-auto bg-blue-900'>
            <h1 className='text-decoration-underline text-center h3'>Add Category</h1>
            <label htmlFor="category_name">Category Name</label>
            <input type="text" className='form-control'
                onChange={(e)=>{
                    setCategory(e.target.value)
                }}
                value={category}
            />
            <button className='btn btn-warning w-100 mt-2' onClick={handleSubmit}>Edit Category</button>
            <Link to={"/admin/category"} className="btn btn-danger mt-2 w-full">
                Go Back
            </Link>
        </form>
    </>
  )
}

export default EditCategory