import React, { useEffect, useRef, useState } from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useAppContext } from '../context';
import Loading from '../component/Loading';
import Product from '../component/Product';
import { AuthConsumer } from '../AuthContext';
import FlashMsg from '../component/FlashMessage';
import { useCartContext } from '../CartContext';
import CategoryItem from '../component/CategoryItem';

function Home() {
    const { cart } = useAppContext();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { message } = useCartContext();
    const {products, getProducts, getCategories, categories} = useAppContext(); 
    const [categoryId, setCategoryId] = useState([]);
    const checkBoxRef = useRef();
    


    useEffect(() => {
        getProducts();
        getCategories()
    }, [])

    const clickHandler = (id) => {
        console.log('hell')
        setCategoryId([...categoryId, id])
        const niz = categoryId.filter(it => it._id !== id);
        console.log('niz', niz)
        console.log(checkBoxRef.current)
    }

    useEffect(() => {
        getProducts(categoryId)
    },[categoryId])



    if (loading) {
        return <Loading />
    }

    return (
        <section className="container">
            <div className="row mt-5">
                {message && <FlashMsg type={'success'} msg={message} />}
                <div className="col-lg-3 col-md-2">
                    <aside>
                        {error ? <div className="alert alert-danger">{error}</div> : ''}
                        <label className='title'>Order By</label>
                        <ul className="list-group">
                            <li>Default</li>
                            <li>Poplarity</li>
                            <li>Average Rating</li>
                            <li>Price: low to high</li>
                            <li>Price: high to low</li>
                        </ul>
                        <label className="title mt-5">Category</label>
                        <div className="list">
                            {categories && categories.length > 0 && categories.map(cat => {
                                const { category } = cat;
                               
                                return <CategoryItem category={category} categoryId={categoryId} setCategoryId={setCategoryId} />
                                // return <div key={category._id}>
                                //     <input type="radio" name='category' onChange={e => handleChange(category._id)} />
                                //     <label htmlFor="">{category.name}</label>
                                // </div>
                            })}
                        </div>
                    </aside>
                </div>
                <div className="col-lg-9 col-md-10 justify-space-between">
                    <div className="row">
                        {products.map(product => {
                            return <Product product={product} key={product._id} />
                        })}
                        {/* <div className="col-4 mb-3">
                            <div className="card" style={{ width: "18rem" }}>
                                <Link to="/product">
                                    <img src="images/products/ipad.jpg" className="card-img-top" alt="..." style={{ maxWidth: "18rem" }} />
                                    <div className="card-body">
                                        <h5 className="card-title">Card title</h5>
                                        <a href="#" className="btn btn-primary">Go somewhere</a>
                                    </div>
                                    <div className="card-footer bg-white">
                                        <p>560$</p>
                                    </div>
                                </Link>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home
