import React, {useCallback, useEffect, useState} from "react";
import {getProducts} from "../services/api.js";
import {ProductCard} from "../components/ProductCard.jsx";
import { BiCommentError } from "react-icons/bi";
import {Pagination} from "../components/Pagination.jsx";
import {SideFilters} from "../components/SideFilters.jsx";
import {useCartStore} from "../store/cartStore.js";
import {AlertPopup} from "./AlertPopup.jsx";
import {FaCartPlus, FaExclamation} from "react-icons/fa";
import { motion }  from "framer-motion";
import "../styles/product.module.scss";
export const Home = React.memo(() => {
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(0);
    const [startElement, setStartElement] = React.useState(0);
    const { cart, isAddingCart, deleteCart, addToCart, changeAddingState } = useCartStore();
    const [newProd, setNewProduct] = React.useState({});
    const [msg, setMsg] = useState("");
    const [filters, setFilters] = React.useState({});
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
    }, [data]);
    const getValuesFlr = useCallback((values) => {
            setFilters(prevState => {
                return {...prevState, ...values};
            });
    }, []);
    const getData = () => {
        return filters?.ctrFlr === "" && filters?.priceFlr === 0 ? data : data.filter((item) => {

            if(filters.ctrFlr && filters.priceFlr) {
                if(filters?.ctrFlr === item.category.name && filters?.priceFlr <= item.price)  {
                    return item;
                }
            } else if(filters?.ctrFlr) {
                if(filters?.ctrFlr === item.category.name)  {
                    return item;
                }
            } else if(filters?.priceFlr) {
                if(filters?.priceFlr <= item.price)  {
                    return item;
                }
            } else {
                return item;
            }

        });
    }

    const containerProductsVariants = {
        hidden: {
            opacity: 0,
            x: -100,
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                staggerChildren: 0.5,
                durationChildren: 0.9,
            }
        }
    }

    const variantItemsProduct = {
        hidden: {
            opacity: 0,
            x: -100
        },
        visible: {
            opacity: 1,
            x: 0
        }
    }

    return <motion.div initial={{opacity: 0}} animate={{opacity: 1, transition: {type: "spring", delay: 0.3}}}>
            <section className={"relative flex flex-col sm:flex-row justify-between overflow-hidden sm:gap-2"}>
                <SideFilters maxPrice={maxPrice()} getValuesFlr={getValuesFlr} />
                <motion.ul variants={containerProductsVariants} initial={"hidden"} animate={"visible"} className={"p-4 sm:p-0 sm:pt-3 flex justify-start items-stretch flex-wrap gap-3 grow"}>
                    {
                        error
                        ? <span className={"font-bold py-5 sm:text-3xl w-full flex flex-col gap-5 items-center justify-center text-red-300 truncate lg:text-5xl"}><BiCommentError /> Problem When Data Loading</span>
                        : getData().length === 0 ?
                        <span className={"font-bold text-2xl py-5 flex flex-col gap-y-[25px] w-full items-center justify-center text-gray-200 truncate sm:text-5xl"}> <FaExclamation className={"text-xl font-bold sm:text-[100px] text-gray-200"} /> No Product Yet</span>
                        : loading
                        ? getData().slice(startElement, currentPage).map((item) => {
                            return <motion.li key={item.id} variants={variantItemsProduct} className={"product-sizing"}>
                                <ProductCard key={item.id} product={item} onAddToCart={(product) => {
                                    handleAddToCart(product)
                                }}/>
                            </motion.li>
                        }) : <span className={"font-bold text-2xl py-5 flex w-full items-center justify-center text-gray-200 truncate sm:text-5xl"}>Loading ...</span>
                    }
                    <li className={"min-w-full"}>
                        {getData().length && getData().length > 12 && loading && !error ? <Pagination countPrd={getData().length} getCurrentPage={getCurrentPage}/> : null }
                    </li>
                </motion.ul>
            </section>
            {/*<Suspense fallback={null}>*/}
            { isAddingCart && <AlertPopup isAddingCart={isAddingCart} bgColor={"bg-green-500"} message={msg}> <FaCartPlus className={"text-xl text-white"}/> </AlertPopup>}
            {/*</Suspense>*/}
    </motion.div>
});