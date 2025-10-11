import React, {useEffect} from "react";
import {getProducts, getCategories} from "../services/api.js";
import {ProductCard} from "../components/ProductCard.jsx";
import { BiCommentError } from "react-icons/bi";
import {Pagination} from "../components/Pagination.jsx";
import {SideFilters} from "../components/SideFilters.jsx";
import {useCartStore} from "../store/cartStore.js";
export const Home = React.memo(() => {
    const [data, setData] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(0);
    const [startElement, setStartElement] = React.useState(0);
    const { cart, addToCart } = useCartStore();
    const [newProd, setNewProduct] = React.useState({});

    useEffect(() => {
        getProducts().then((res) => {
            setData(res);
            setError(false);
        }).catch(() => {
            setError(true);
            throw new Error("Error getting products list");
        });
        getCategories().then((res) => {
           setCategories(res);
            setError(false);
        }).catch(() => {
            setError(true);
            throw new Error("Error getting categories list");
        });

        setTimeout(() => setLoading(true), 500);

    }, []);

    useEffect(() => {
        console.log(`Data List From API: ${ data[0]}`);
        console.log(`Categories List From API: ${ categories[0] }`);
    }, [data, categories]);

    const getCurrentPage = (currentPage) => {
        const totalElements = 12;
        setCurrentPage(currentPage  * totalElements);
        setStartElement( (currentPage * totalElements ) - totalElements );
    }

    useEffect(() => {

        const existProduct = cart.filter((item) => { return item.id === newProd.id })[0];
        if (existProduct) {

            existProduct.totalPieces += 1;

        } else if(Object.hasOwn(newProd, "id")) {

            newProd.totalPieces = 0;
            addToCart(newProd);

        }

    }, [newProd, cart, addToCart])


    const handleAddToCart = (product) => {
        setNewProduct(product);
    }


    return <section className={"grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4"}>
        <SideFilters />
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
    </section>

});