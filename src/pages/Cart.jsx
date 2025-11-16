import React, {useCallback, useEffect} from "react";
import { useCartStore } from "../store/cartStore.js";
import { FaMinusCircle, FaPlusCircle, FaTrash } from "react-icons/fa"
import { FaCheckCircle } from "react-icons/fa";
import { IoIosRemoveCircle } from "react-icons/io";
import { AlertPopup } from "./AlertPopup.jsx";
import { auth, collection, addDoc, db } from "../firebase.js";
import { onAuthStateChanged } from "firebase/auth";
// import useLocalStorage from "../customsHooks/useLocalStorage.jsx";
import {useNavigate} from "react-router-dom";
// import { collection, addDoc, getDocs } from "firebase/firestore";
//Zustand use this tool to create a State Management

export const Cart = React.memo(() => {
    const {cart, isAddingCart, deleteCart, clearCart, decrementPiecesTotal, incrementPiecesTotal, changeAddingState} = useCartStore();
    const [userAuth, setUserAuth] = React.useState(null);
    const navigate = useNavigate();
    // const [storedCart, setStoredCart] = useLocalStorage("cartItemsStored", []);

    const handleChangePiecesIncrement = useCallback((id) => {
        const totalPieces = cart.find((item) => item.id === id).totalPieces;
        if(totalPieces < 10) {
            incrementPiecesTotal(id);
        }
    }, [incrementPiecesTotal, cart]);

    const handleChangePiecesDecrement = useCallback((id) => {
        const totalPieces = cart.find((item) => item.id === id).totalPieces;
        if(totalPieces > 1) {
            decrementPiecesTotal(id);
        }
    }, [decrementPiecesTotal, cart]);

    const handleTrashClick = useCallback((ID) => {
        deleteCart(ID);
        changeAddingState();

        setTimeout(() => {
            changeAddingState();
        }, 1000)

    }, [deleteCart, changeAddingState]);

    const handleClearAll = useCallback(() => {
        clearCart();
    }, [clearCart]);

    /***********************************************************************************************************/
    const authCatchChanges = (user) => {
        if(!user)
            return 0;

        if (user) {
            console.log("User signed in:", user.uid);
            setUserAuth(user);
        } else {
            console.log("No user is signed in.");
        }
    };

    useEffect(() => {
        // Get SignedIn User
        onAuthStateChanged(auth, authCatchChanges);
    }, []);


    // useEffect(() => {
    //     setStoredCart(cart);
    // }, [cart, setStoredCart]);

    /***********************************************************************************************************************************************************/

    const saveCheckout = async (checkoutData) => {
        try {
            console.log("Saving checkout data: ", checkoutData); // Log the data being passed in

            // Create a new document in the 'checkouts' collection
            const docRef = await addDoc(collection(db, ""));

            console.log("Saving logic!!!!!!!!!!", docRef.id);

        } catch (error) {
            console.error('Error saving checkout: ', error);
        }
    };


    const handleCheckOut = useCallback(async () => {
        navigate("/checkoutForm");

        const checkoutData = {
            userID: userAuth.uid,
            fullName: "xFlan",
            items: [
                ...cart.map(item => item),
            ],
            total: cart.reduce((acc, item) => { return  acc + item.totalPieces }, 0),
            shippingAddress: {
                street: '123 Main St',
                city: 'City-name',
                state: 'State',
                postalCode: '12345',
                country: 'Country'
            }
        };
        //
        // // console.log(JSON.stringify(checkoutData));
        await saveCheckout(checkoutData);


    }, [navigate, cart, userAuth]);

    const getDataCart = () => {
        // return storedCart.length ? storedCart : cart.length ? cart : [];
        return cart;
    }

    return <>
        <div className="cart p-5 relative">
            <h1 className={"py-5 uppercase text-xl font-bold"}>Your Cart Products</h1>
            {
                getDataCart().length > 0 ? <table className="table table-striped table-bordered w-full overflow-x-auto">
                    <thead className={"p-4 text-center border-t border-b border-gray-200 text-white uppercase bg-gray-600"}>
                        <tr>
                            <th className={"p-4 font-bold"}>ID</th>
                            <th className={"p-4 font-bold"}>Product Title</th>
                            <th className={"p-4 font-bold"}>Quantity</th>
                            <th className={"p-4 font-bold"}>Actions</th>
                            <th className={"p-4 font-bold"}>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        getDataCart().map((item, index) => (
                            <tr key={index} className={"text-center"}>
                                <td className={"p-4 border-gray-200 border-r"}>{item.id}</td>
                                <td className={"p-4 border-gray-200 border-r text-left flex gap-4 items-center"}>
                                    <img src={item.images[0]} alt="Product Image" width="70" height="70" className="rounded-full max-w-[40px] max-h-[40px] md:max-w-[60px] md:max-h-[60px]" />
                                    <p>{item.title}</p>
                                </td>
                                <td className={"p-4 border-gray-200 border-r"}>
                                    <form>
                                        <label htmlFor="totalProducts" className="flex items-center justify-between">
                                            <button type={"button"} onClick={() => {
                                                handleChangePiecesDecrement(item.id)
                                            }} className={"rounded-full w-[25px] h-[25px] relative overflow-hidden"}>
                                                <FaMinusCircle
                                                    className={"absolute top-0 left-0 w-[100%] h-[100%] transition ease-in hover:scale-75"}/>
                                            </button>
                                            <input type="text" id={"totalProducts"}
                                                   className={"border-none w-[20px] h-[20px] font-bold focus:outline-none"}
                                                   value={item.totalPieces} placeholder={"1"}
                                                   name={"nbrOfPieces"}
                                                   onChange={(e) => e.target.value}
                                                   title={"Number Of Pieces Added"}/>
                                            <button type={"button"} onClick={() => {
                                                handleChangePiecesIncrement(item.id)
                                            }} className={"rounded-full w-[25px] h-[25px] relative overflow-hidden"}>
                                                <FaPlusCircle
                                                    className={" absolute top-0 left-0 w-[100%] h-[100%] transition ease-in hover:scale-75"}/>
                                            </button>
                                        </label>
                                    </form>
                                </td>
                                <td className={"p-4 border-gray-200 border-r"}>
                                    <ul className={"flex items-center justify-center gap-4"}>
                                        <li onClick={() => {
                                            handleTrashClick(item.id)
                                        }}
                                            className={"text-red-500 cursor-pointer opacity-50 transition hover:opacity-100 hover:scale-125"}>
                                            <FaTrash/></li>
                                    </ul>
                                </td>
                                <td className={"p-4"}>{(item.price * item.totalPieces).toFixed(2)} $</td>
                            </tr>
                        ))
                    }
                    </tbody>
                    <tfoot className={"border-t border-gray-200"}>
                    <tr className={"border-t border-b border-gray-200 bg-gray-100"}>
                        <td colSpan={4} className={"p-4 border-r border-gray-200"}>Total Products Price :</td>
                        <td className={"p-4 text-center"}><strong>{(getDataCart().reduce((a, b) => {
                            return a + (b.price * b.totalPieces)
                        }, 0)).toFixed(2)} $</strong></td>
                    </tr>
                    <tr>
                        <td colSpan={5} className={"p-4"}>
                            <div className={"flex gap-4 ml-auto w-fit"}>
                                <button type={"button"} onClick={handleClearAll}
                                        className={"py-2 px-6 bg-red-600 flex items-center justify-between rounded text-white font-bold gap-4 shadow-lg transition ease-in-out hover:scale-90"}>
                                    CLear Cart <FaTrash className={"text-white"}/>
                                </button>
                                <button type={"button"} onClick={handleCheckOut}
                                        className={"py-2 px-6 bg-green-600 flex items-center justify-between rounded text-white font-bold gap-4 shadow-lg transition ease-in-out hover:scale-90"}>
                                    Buy Cart <FaCheckCircle className={"text-white"}/>
                                </button>
                            </div>
                        </td>
                    </tr>
                    </tfoot>
                </table> : <span className={"font-bold text-gray-200 text-lg md:text-5xl text-center mx-auto block py-10"}>No Product Yet ...</span>
            }
        </div>
        { isAddingCart && <AlertPopup isAddingCart={isAddingCart} bgColor={"bg-red-400"} message={"Product Delete Successfully"}> <IoIosRemoveCircle className={"text-xl text-white"} /> </AlertPopup> }
    </>
});















/***********************************************************************************************************************************************************/
/************************************************************************* check-out ***********************************************************************/
// Add checkout to Firestore
// const saveCheckout = async (checkoutData) => {
//         try {
//             const docRef = await addDoc(collection(db, "checkouts"), checkoutData);
//             console.log("Document written with ID: ", docRef.id);
//         } catch (error) {
//             console.error("Error adding document: ", error);
//         }
//     };
//
// // Call function to save all products of users
// await saveCheckout();
/***********************************************************************************************************************************************************/


/***********************************************************************************************************************************************************/
// // Example checkout data
// const checkoutData = {
//     userID: user.uid,
//     items: [
//         cart.map(item => item),
//     ],
//     total: cart.length,
//     shippingAddress: {
//         street: '123 Main St',
//         city: 'City-name',
//         state: 'State',
//         postalCode: '12345',
//         country: 'Country'
//     }
// };
//
// console.log("checkout data:", checkoutData);

// const saveCheckout = async () => {
//     try {
//         // Create a new document in the 'checkouts' collection
//         const docRef = await addDoc(collection(db, "checkouts"), checkoutData);
//
//         const checkoutRef = await db.collection('checkouts').add({
//             userID: checkoutData.userID,
//             items: checkoutData.items,
//             total: checkoutData.total,
//             timestamp: Date.now(),
//             paymentStatus: 'pending',
//             shippingAddress: checkoutData.shippingAddress
//         });
//
//         console.log("Saving logic!!!!!!!!!!");
//
//     } catch (error) {
//         console.error('Error saving checkout: ', error);
//     }
// };
//
//     // Call the function to save the checkout
//     await saveCheckout();
/***********************************************************************************************************************************************************/
