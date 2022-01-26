import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { AiFillStar } from 'react-icons/ai';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthConsumer } from '../AuthContext';
import { useAppContext } from '../context';
import FlashMsg from './FlashMessage';
import ReactStars from 'react-rating-stars-component'
import Loading from './Loading';

function ProductCard({ product }) {
    const { _id, name, price, avatar, category, stock, sale, description, rating } = product;
    const [loading, setLoading] = useState(true);
    const { isAdmin } = AuthConsumer();
    const { removeProduct, createReview } = useAppContext();
    const navigate = useNavigate('/');
    const [success, setSuccess] = useState(false)
    const starRef = useRef();
    const [stars, setStars] = useState(0);
    const [hover, setHover] = useState(null)
    const [ratingValue, setRatingValue] = useState(0)

    const removeHandler = () => {
        const hah = window.confirm('Are you sure?')
        if (hah) {
            setSuccess(true);
            removeProduct(_id);
            setTimeout(() => {
                navigate('/')
            }, 2000)
        }
    }

    const handleOut = (e) => {
        const el = e.target;
        el.style.color = 'orange'
        console.log(el)
    }

    const handleOver = (e) => {
        const el = e.target;
        el.style.color = 'gray'
        console.log(el)
    }



    const ratingChanged = (newRating) => {
        console.log(newRating);
        console.log(product);
        setStars(rating);
    };

    console.log('rating', rating)


    useEffect(() => {
        console.log('product', product);
        if (product) {
            setLoading(false)
            setStars(rating)
        }
        console.log(stars)
    }, [product, stars])

    if (loading) {
        return <Loading />
    }

    return (
        <div className="card mt-5">
            <div className="row">
                <div className="col-md-6">
                    <img
                        src={`/images/products/${avatar}`} alt="slika"
                        // src="/images/products/20221231642111881879-pc.jpg"
                        style={{ maxWidth: '100%', width: '100%' }}
                    />
                </div>
                <div className="col-md-5 mt-5">
                    {success && <FlashMsg type='danger' msg={'Product deleted successfully. You will be redirect soon.'} />}
                    <h2>{name}</h2>
                    <div className="rating">
                        {[...Array(5)].map((star, i) => {
                            const ratingValue = i + 1;

                            return (
                                <label htmlFor="rating">
                                    <input 
                                        type="radio" 
                                        name='rating'
                                        id='rating'
                                        style={{display: 'none'}}
                                        size={100}
                                        onMouseOver={() => setHover(null)}
                                        // style={{display: 'none'}} 
                                        value={ratingValue}
                                    />
                                    <AiFillStar color={ratingValue <= (hover || rating) ? '#ffc107' : 'gray'} />
                                </label>
                            )
                        })}
                    </div>
                    <span className='bg-danger text-white p-1 rounded '>bestseller</span>
                    {/* {isAvaliable ? <span className='bg-success text-white p-1 rounded '>avaliable</span>
                        : ''} */}
                    {stock === 0 ? <span className='bg-danger text-white ms-2 p-1 rounded '>selled</span> :
                        <span className='bg-success text-white p-1 rounded ms-2 '>avaliable</span>}

                    <p className='mt-3 h5 text-danger'>${price}</p>
                    <p className="mt-3 h4">{category}</p>
                    <div className="card-body mt-4">
                        <h4 className='mb-3'>Description</h4>
                        <p>
                            {description}
                        </p>
                    </div>
                    <button className="btn btn-primary rounded">Add To Cart</button>
                    {isAdmin && <div className="card-footer mt-5">
                        <Link to={`/dashboard/edit/${_id}`} className="btn btn-warning rounded me-2">Edit</Link>
                        <button className="btn btn-danger rounded" onClick={removeHandler}>Delete</button>
                    </div>}
                </div>

            </div>
        </div>
    )
}

export default ProductCard
