import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Sidebar from '../../component/User/Sidebar';
import { useAppContext } from '../../context';
import Loading from '../../component/Loading';
import axios from 'axios';

function NewProduct() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [stock, setStock] = useState(0);
    const [avatar, setAvatar] = useState('');
    const [category, setCategory] = useState('');
    const [sale, setSale] = useState('');
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false)
    const { message, addProduct, success, error: creatError } = useAppContext();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name)
        formData.set('stock', stock)
        formData.set('price', price)
        formData.set('category', category)
        formData.set('description', description)
        formData.set('avatar', avatar)
     
        addProduct(formData);
    }

    const changeHandler = (e) => {
        setCategory(e.target.value)
    }

    useEffect(() => {
        const getCategories = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get('http://localhost:5000/api/category');
                setCategories(data.categories)
                setLoading(false)
            } catch (error) {
                setError(error.message);
                setLoading(false)
            }
        }
        getCategories()
    },[])


    // if(loading) {
    //     return <Loading />
    // }

    if(success) {
        console.log(success)
    }

    return (
        <div className="container bg-dark mt-5">
            <div className="row">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10">
                    <div className="container mt-3">
                        <div className="row d-flex justify-content-center align-items-center" >
                            <div className="col-6 text-white">
                                {creatError && <div className="alert alert-danger">{message}</div> }
                                {success && <div className="alert alert-success">{message}</div> }
                                <form onSubmit={handleSubmit} >
                                    <div className="mb-3">
                                        <label htmlFor='' className="form-label">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name='name'
                                            value={name}
                                            required
                                            onChange={e => setName(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor='' className="form-label">Description</label> <br />
                                        <textarea
                                            name="description"
                                            value={description}
                                            onChange={e => setDescription(e.target.value)}
                                            cols="30"
                                            rows="10"
                                            required className="form-control">

                                        </textarea>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="" className="form-label">Price</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={price}
                                            name='price'
                                            required
                                            onChange={e => setPrice(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="form-label">Stock</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={stock}
                                            required
                                            name='stock'
                                            onChange={e => setStock(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        {/* <label htmlFor="" class="form-label">Avatar</label>
                                        <input
                                            type="file"
                                            class="form-control"
                                            name='avatar'
                                            onChange={imageHandler} /> */}
                                        <input type="file" 
                                        name="avatar" 
                                        className="form-control" 
                                        required
                                        onChange={e => setAvatar(e.target.files[0])} 
                                        />
                                        <label className="form-label" htmlFor="photo">Upload photo</label>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="form-label">Category</label>
                                        <select name="category" onChange={changeHandler} required>
                                            <option value="">Choose category</option>
                                            {categories && categories.length > 0 && categories.map(cat => {
                                                const { category } = cat;
                                                return <option value={category._id} key={category._id} >
                                                    {category.name}
                                                </option>
                                            })}
                                        </select>
                                    </div>
                                    <button type="submit" className="btn btn-dark">Sign In</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewProduct
