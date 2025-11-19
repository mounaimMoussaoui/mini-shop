import React, {useEffect, useState} from "react";
import {useAuthContext} from "../authMangment/AuthContext.js";
import {collection, db, getDocs, query, where} from "../firebase.js";
import {FaExclamation} from "react-icons/fa";


export const Profile = React.memo(() => {
    const { authStateManagement } = useAuthContext();
    const [data, setData] = useState([]);

    const getAllDocuments = async (collectionName) => {
        try {
            // Get a reference to the collection
            // const querySnapshot = await getDocs(collection(db, collectionName).where("userID", "==", authStateManagement.user.uid));

            const qry = query(collection(db, collectionName), where("userID", "==", authStateManagement.user.uid));

            const querySnapshot = await getDocs(qry);
            // Iterate through the documents
            if(!querySnapshot.empty){
                await querySnapshot.forEach((doc) => {
                    // console.log(doc.id, " => ", doc.data());
                    setData( prevData => {
                        return [
                            ...prevData,
                            ...doc.data().items
                        ]
                    });
                    console.log(doc.data().items);

                });
            } else {
                setData({
                    message: "You don't have any documents",
                })
            }

        } catch (error) {
            console.error("Error fetching documents: ", error);
        }
    };

    useEffect( () => {
        authStateManagement.user && (async () => {
            await getAllDocuments("checkouts");
        })();

    }, [authStateManagement.user]);

    useEffect(() => {
        console.log(data);
    }, [data]);

    return <div className={"pb-5"}>
        <h1 className={"py-3 w-fit mr-auto ml-5 font-bold text-black text-5xl"}>Profile</h1>
        <div className={"w-fit mr-auto ml-5 text-sm text-gray-400 font-bold"}>Welcome {authStateManagement?.user?.email} this You List Of Products</div>
        <div className={"p-5"}>
            {
                !data?.message ? <table className="table table-striped table-bordered w-full overflow-x-auto">
                        <thead
                            className={"p-4 text-center border-t border-b border-gray-200 text-white uppercase bg-gray-600"}>
                        <tr>
                            <th className={"p-4 font-bold"}>ID</th>
                            <th className={"p-4 font-bold"}>Product Title</th>
                            <th className={"p-4 font-bold"}>Quantity</th>
                            <th className={"p-4 font-bold"}>Total Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            data && data.map((item, index) => (
                                <tr key={index} className={"text-center"}>
                                    <td className={"p-4 border-gray-200 border-r"}>{item.id}</td>
                                    <td className={"p-4 border-gray-200 border-r text-left flex gap-4 items-center"}>
                                        <img src={item?.images[0]} alt="Product Image" width="70" height="70"
                                             className="rounded-full max-w-[40px] max-h-[40px] md:max-w-[60px] md:max-h-[60px]"/>
                                        <p>{item.title}</p>
                                    </td>
                                    <td>
                                        {
                                            item.totalPieces
                                        }
                                    </td>
                                    <td className={"p-4"}>{(item.price * item.totalPieces).toFixed(2)} $</td>
                                </tr>
                            ))
                        }
                        </tbody>
                        <tfoot className={"border-t border-gray-200"}>
                        <tr className={"border-t border-b border-gray-200 bg-gray-100"}>
                            <td colSpan={3} className={"p-4 border-r border-gray-200"}>Total Products Price :</td>
                            <td className={"p-4 text-center"}><strong>{data.reduce((acc, item) => {
                                return acc * item.totalPieces * item.price
                            }, 1).toFixed(2)} $</strong></td>
                        </tr>
                        </tfoot>
                    </table> : <span className={"flex flex-col gap-y-[25px] items-center font-bold text-gray-200 text-lg md:text-5xl text-center mx-auto  py-10"}> <FaExclamation className={"text-xl font-bold sm:text-[100px] text-gray-200"} /> No Command Yet ...</span>
            }

        </div>
    </div>
});