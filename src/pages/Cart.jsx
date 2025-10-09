import React, {useCallback} from "react";
import {useCartStore} from "../store/cartStore.js";
import {FaCirclePlus, FaCircleMinus, FaTrash} from "react-icons/fa6"
import {FaCheckCircle} from "react-icons/fa";
//Zustand use this tool to create a State Management

export const Cart = React.memo(() => {
    const {cart, deleteCart, clearCart, decrementPiecesTotal, incrementPiecesTotal} = useCartStore();

    const handleChangePiecesIncrement = ((id) => {
        const totalPieces = cart.find((item) => item.id === id).totalPieces;
        if(totalPieces < 10) {
            incrementPiecesTotal(id);
        }
    });

    const handleChangePiecesDecrement = ((id) => {
        const totalPieces = cart.find((item) => item.id === id).totalPieces;
        if(totalPieces > 1) {
            decrementPiecesTotal(id);
        }
    });

    const handleTrashClick = useCallback((ID) => {
        deleteCart(ID);
    }, [deleteCart]);

    const handleClearAll = useCallback(() => {
        clearCart();
    }, [clearCart]);

    return <div className="cart">
        <h1 className={"py-5 uppercase text-xl font-bold"}>Your Cart Products</h1>
        <table className="table table-striped table-bordered w-full">
            <thead className={"p-4 text-center border-t border-b border-gray-200 text-white uppercase bg-gray-600"}>
                <tr>
                    <td className={"p-4 font-bold"}>ID</td>
                    <td className={"p-4 font-bold"}>Product Title</td>
                    <td className={"p-4 font-bold"}>Quantity</td>
                    <td className={"p-4 font-bold"}>Actions</td>
                    <td className={"p-4 font-bold"}>Total Price</td>
                </tr>
            </thead>
            <tbody>
                {
                    cart.length > 0 ? cart.map((item, index) => (
                        <tr key={index} className={"text-center"}>
                            <td className={"p-4 border-gray-200 border-r"}>{item.id}</td>
                            <td className={"p-4 border-gray-200 border-r text-left"}>{item.title}</td>
                            <td className={"p-4 border-gray-200 border-r"}>
                                {/*add a select here to manage the Quantity of product*/}
                                <form>
                                    <label htmlFor="totalProducts" className="flex items-center justify-between">
                                        <button type={"button"}  onClick={() => { handleChangePiecesDecrement(item.id) }} className={"rounded-full w-[25px] h-[25px] relative overflow-hidden"}><FaCircleMinus className={"absolute top-0 left-0 w-[100%] h-[100%] transition ease-in hover:scale-75"}/></button>
                                        <input type="text" id={"totalProducts"} className={"border-none w-[20px] h-[20px] font-bold focus:outline-none"}
                                               value={item.totalPieces} placeholder={"1"}
                                               name={"nbrOfPieces"}
                                               onChange={(e) => e.target.value }
                                               title={"Number Of Pieces Added"}/>
                                        <button type={"button"} onClick={() => { handleChangePiecesIncrement(item.id) }} className={"rounded-full w-[25px] h-[25px] relative overflow-hidden"}><FaCirclePlus className={" absolute top-0 left-0 w-[100%] h-[100%] transition ease-in hover:scale-75"}/></button>
                                    </label>
                                </form>
                            </td>
                            <td className={"p-4 border-gray-200 border-r"}><ul className={"flex items-center justify-center gap-4"}><li onClick={() => {handleTrashClick(item.id)}} className={"text-red-500 cursor-pointer opacity-50 transition hover:opacity-100 hover:scale-125"}><FaTrash/></li></ul></td>
                            <td className={"p-4"}>{(item.price * item.totalPieces).toFixed(2)} $</td>
                        </tr>
                    )) : <tr><td colSpan={4} className={"text-center font-bold text-gray-300 text-xl p-4"}>No Product Yet ...</td></tr>
                }
            </tbody>
            <tfoot className={"border-t border-gray-200"}>
                <tr className={"border-t border-b border-gray-200 bg-gray-100"}>
                    <td colSpan={4} className={"p-4 border-r border-gray-200"}>Total Products Price :</td>
                    <td className={"p-4 text-center"}><strong>{(cart.reduce((a, b) => {return a + b.price }, 0)).toFixed(2)} $</strong></td>
                </tr>
                <tr>
                    <td colSpan={5} className={"p-4"}>
                        <div className={"flex gap-4 ml-auto w-fit"}>
                            <button type={"button"} onClick={handleClearAll}
                                    className={"py-2 px-6 bg-red-600 flex items-center justify-between rounded text-white font-bold gap-4 shadow-lg transition ease-in-out hover:scale-90"}>
                                CLear Cart <FaTrash className={"text-white"}/>
                            </button>
                            <button type={"button"}
                                    className={"py-2 px-6 bg-green-600 flex items-center justify-between rounded text-white font-bold gap-4 shadow-lg transition ease-in-out hover:scale-90"}>
                                Buy Cart <FaCheckCircle className={"text-white"}/>
                            </button>
                        </div>
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
});


