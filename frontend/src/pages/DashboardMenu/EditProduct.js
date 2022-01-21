import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../../component/User/Sidebar';
import { useAppContext } from '../../context';
import Loading from '../../component/Loading';
import axios from 'axios';

function EditProduct() {
    const {editProduct, product} = useAppContext();
    const {id} = useParams();
    const navigate = useNavigate();
    const [success, setSuccess] = useState('');
    
    const [name, setName] = useState(() => {
        return product && product.name ? product.name : ''
    });
    const [price, setPrice] = useState(() => {
        return product && product.price ? product.price : ''
    });
    const [description, setDescription] =  useState(() => {
        return product && product.description ? product.description : ''
    });
    const [stock, setStock] =  useState(() => {
        return product && product.stock ? product.stock : ''
    });
    const [avatar, setAvatar] =  useState(() => {
        return product && product.avatar ? product.avatar : ''
    });
    const [category, setCategory] =  useState(() => {
        return product && product.category ? product.category : ''
    });
    const [sale, setSale] =  useState(() => {
        return product && product.sale ? product.sale : ''
    });
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false)
    const { message, addProduct, error: creatError } = useAppContext();

    const handleSubmit = (e) => {
        e.preventDefault();

        const editedProduct = {
           _id: id, name, stock, price, category, description, avatar
        }

        const bodyData = new FormData();
        bodyData.set('_id', id);
        bodyData.set('name', name)
        bodyData.set('stock', stock)
        bodyData.set('price', price)
        bodyData.set('category', category)
        bodyData.set('description', description)
        bodyData.set('avatar', avatar)

        if(avatar instanceof Object) {
            editProduct(bodyData);
        } else {
            editProduct(editedProduct);
        }
        setSuccess(true)
        setTimeout(() => {
            navigate(`/product/${id}`)
        }, 3000)
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

    useEffect(() => {
        if(!product) {
            navigate('/');
            document.location.reload('/');
        }
    })


    if(loading) {
        return <Loading />
    }

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
                                {success && <div className="alert alert-success">{message} You will be redirect soon.</div> }
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
                                        <img src={product && product.avatar ? `/images/products/${product.avatar}` : avatar} alt="" className='img-fluid mb-3' height={'200'} width={'200'} />    
                                        <input type="file" 
                                        name="avatar" 
                                        className="form-control" 
                                        
                                        onChange={e => setAvatar(e.target.files[0])} 
                                        />
                                        <label className="form-label" htmlFor="photo">Upload photo</label>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="form-label">Category</label>
                                        <select name="category" onChange={changeHandler}>
                                            <option value="">Choose category</option>
                                            {categories && categories.length > 0 && categories.map(cat => {
                                                const { category } = cat;
                                                return <option value={category._id} key={category._id} >
                                                    {category.name}
                                                </option>
                                            })}
                                        </select>
                                    </div>
                                    <button type="submit" className="btn btn-dark">Edit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProduct
