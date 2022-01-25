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
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
