import React, { useEffect, useState } from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useAppContext } from '../context';
import Loading from '../component/Loading';
import Product from '../component/Product';
import { AuthConsumer } from '../AuthContext';
import FlashMsg from '../component/FlashMessage';
import { useCartContext } from '../CartContext';

function Home() {
    const { cart } = useAppContext();
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { message } = useCartContext();
    const {products, getProducts} = useAppContext(); 


    useEffect(() => {
        getProducts();
    }, [])


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
    }, [products])



    if (loading) {
        return <Loading />
    }

    return (
        <section className="container">
            <div className="row mt-5">
                {message && <FlashMsg type={'success'} msg={message} />}
                <div className="col-lg-3">
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
                                return <div key={category._id}>
                                    <input type="radio" name='category' />
                                    <label htmlFor="">{category.name}</label>
                                </div>
                            })}
                        </div>
                    </aside>
                </div>
                <div className="col-lg-9 d-flex justify-space-between">
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
