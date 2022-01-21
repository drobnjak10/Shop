import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loading from '../component/Loading';
import ProductCard from '../component/ProductCard';
import { useAppContext } from '../context'

function ProductDetails() {
    const {getProduct, product} = useAppContext();
    const [loading, setLoading] = useState(false);
    const {id} = useParams();


    useEffect(() => {
        getProduct(id);
        if(product) {
            setLoading(false);
        }
        // console.log(params)
    }, []);

    if(loading) {
        return <Loading />
    }
    
    return (
        <div className='container'>
            <div className="row">
                <div className="col-10">
                    { product && <ProductCard product={product} /> }
                    {/* <div className="card mt-5">
                       <div className="row">
                           <div className="col-md-6">
                               <img 
                               src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/17.jpg"
                                alt="slika" 
                                style={{ maxWidth: '100%', width: '100%' }}
                                />
                           </div>
                           <div className="col-md-5 mt-5">
                               <h2>Sony Headphones</h2>
                               <span className='bg-danger text-white p-1 rounded '>bestseller</span>
                               <span className='bg-success text-white p-1 rounded ms-2'>avaliable</span>
                               <p className='mt-3 h5 text-danger'>$49</p>
                               <p className="mt-3 h4">Laptop</p>
                               <div className="card-body mt-4">
                                   <h4 className='mb-3'>Description</h4>
                                   <p>
                                       Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
                                   </p>
                               </div>
                               <button className="btn btn-primary rounded">Add To Cart</button>
                           </div>
                       </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
