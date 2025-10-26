import React, {useCallback, useEffect, useState} from "react";
import {getProducts} from "../services/api.js";
import {ProductCard} from "../components/ProductCard.jsx";
import { BiCommentError } from "react-icons/bi";
import {Pagination} from "../components/Pagination.jsx";
import {SideFilters} from "../components/SideFilters.jsx";
import {useCartStore} from "../store/cartStore.js";
import {AlertPopup} from "./AlertPopup.jsx";
import {FaCartPlus} from "react-icons/fa";
// const AlertPopup = React.lazy(() => import("./AlertPopup.jsx"))

export const Home = React.memo(() => {
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(0);
    const [startElement, setStartElement] = React.useState(0);
    const { cart, isAddingCart, deleteCart, addToCart, changeAddingState } = useCartStore();
    const [newProd, setNewProduct] = React.useState({});
    const [msg, setMsg] = useState("");
    // const [maxPrice, setMaxPrice] = React.useState(0);

    useEffect(() => {
        getProducts().then((res) => {
            setData(res);
            setError(false);
        }).catch(() => {
            setError(true);
            throw new Error("Error getting products list");
        });
        setTimeout(() => setLoading(true), 500);
    }, []);

    const getCurrentPage = (currentPage) => {
        const totalElements = 12;
        setCurrentPage(currentPage  * totalElements);
        setStartElement( (currentPage * totalElements ) - totalElements );
    }


    useEffect(() => {

        let existProduct;
        existProduct = cart.find((item) => {  return item.id === newProd.id }) || null;

        if (existProduct) {
            const editProd  = {...existProduct, totalPieces: existProduct.totalPieces + 1 };
             deleteCart(existProduct.id);
             addToCart(editProd);
            setMsg(`Product Quantity Changed - ${editProd.totalPieces}`);
        } else if(Object.hasOwn(newProd, "id")) {
             setNewProduct(  (prevState) =>  { return prevState.totalPieces = 1 });
             addToCart(newProd);
             setMsg("Product Added To cart Successfully");
        }


    }, [newProd, addToCart, deleteCart]);

    const handleAddToCart = (product) => {
        setNewProduct( prevState => { return {...prevState ,...product} } );
        changeAddingState();
        setTimeout(() => {
            changeAddingState();
        }, 1000);
    }

    const maxPrice = useCallback(() => {
        let max;
            max = Math.max(...data.map((product) => { return product.price; }));
       return  max;
    }, [data])

    return <section className={"relative grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4"}>
        <SideFilters maxPrice={maxPrice()} />
        <ul className={loading && !error ? "items-center p-5 col-start-2 col-end-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4" : "grid col-start-2 col-end-5 gap-5"}>
            {
                error
                ? <span className={"font-bold py-5 sm:text-3xl flex flex-col gap-5 items-center justify-center text-red-300 truncate lg:text-5xl col-start-1 col-end-5"}><BiCommentError /> Problem When Data Loading</span>
                : loading
                ? data.slice(startElement, currentPage).map((item) => {
                    return <li key={item.id}>
                        <ProductCard key={item.id} product={item} onAddToCart={(product) => {handleAddToCart(product)}} />
                    </li>
                }) : <span className={"font-bold text-2xl py-5 flex w-full items-center justify-center text-gray-200 truncate sm:text-5xl"}>Loading ...</span>
            }
            <li className={"col-start-1 col-end-5"}>
                { loading && !error ? <Pagination countPrd={data.length} getCurrentPage={getCurrentPage}/> : null }
            </li>
        </ul>
        {/*<Suspense fallback={null}>*/}
        { isAddingCart && <AlertPopup isAddingCart={isAddingCart} bgColor={"bg-green-500"} message={msg}> <FaCartPlus className={"text-xl text-white"}/> </AlertPopup>}
        {/*</Suspense>*/}
    </section>

});