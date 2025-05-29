import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../Contexts/CartContext";


import productsData from "../assets/products.json";
import SaleBadge from "./SaleBadege";
const Producthtml = (props) => {
    const { addToCart } = useCart();

    const { id, name, image, salePrice, price, variants } = props.productInfo; 

    let hasVariants = Object.keys(variants).length > 0;
    let button_text = hasVariants ? "View Product" : 'Add to Cart';
    
    return (
        <div className="group relative">
             <Link  to={`/product/${id}`}> 
         <img src={require(`../assets/images/products/${image}-324x324.jpg`)} alt={name} className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80" />
         </Link>
        <div className="mt-4 flex justify-between">
            
            
        <Link  to={`/product/${id}`}> 
                <h3 className="text-sm text-gray-700"> 
                
                 {name}   
                
                </h3>
        </Link>            
          
                <button type="button" className="px-4 py-2 bg-blue-500 text-white font-semibold rounded" onClick={() => addToCart(props.productInfo)}>{button_text}</button>

            
            {salePrice !== '' ? <SaleBadge /> : ""}

            <div className="flex items-center space-x-2">
            {salePrice !== '' ? <span className="text-gray-500 line-through">{price}</span> : ""}
                
                <span className="text-red-500 font-bold">{salePrice}</span>
            </div>
        </div>
    </div>
    )
};
function Product() {
    const {category} = useParams();
    const [ productcatlist, setProductCatlist ] = useState([]);
    const [ product, setProduct ] = useState([]);

    const [visibleCount, setVisibleCount] = useState(4);
    const [loading, setLoading ] = useState(false);
    const productc = productsData.filter((p) => p.category.toString() === category);

    useEffect(() => {
        setProduct(productsData.slice(0, visibleCount));
       // setProductCatlist(productsData.slice(0, visibleCount));
    },[visibleCount] );

    const loadMore = () => {
        setLoading(true);
        setTimeout(() => {
            setVisibleCount((prevCount) => prevCount + 4 );
            setLoading(false);
        }, 1000);
    };
    useEffect(()=> {
       // setProductCatlist(productc);
       setProductCatlist(productc.slice(0, visibleCount));

    }, [category,visibleCount]);
    if( productcatlist.length === 0 ) {
        return (
            <>
                { product.map((product) => {
                const commonProps = product;
            return ( <Producthtml key={product.id} productInfo={commonProps}></Producthtml> )
            })  }  
            {visibleCount < productsData.length && (
            <button onClick={loadMore}  className="font-bold" disabled={loading}>
            {loading ? "Loading..." : "Load More"}
            </button>
            )}
            </>
        );
    }else{
        return (            
            <>
                { productcatlist.map((product) => {
                const commonProps = product;
            return ( <Producthtml productInfo={commonProps}></Producthtml> )

            })  }  

            {visibleCount < productc.length && (
            <button onClick={loadMore} className="font-bold" disabled={loading}>
            {loading ? "Loading..." : "Load More"}
            </button>
            )}
            </>
        );
    }
        
   
};
export default Product;