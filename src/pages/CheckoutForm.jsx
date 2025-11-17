import React, {useCallback, useEffect} from "react";
import {Formik, Form} from "formik";
import {CheckoutValidation} from "../schemas/checkoutValidation.js";
import {MySelect, MyTextField} from "../formikFields/FieldsFormik.jsx";
import { MdPermIdentity, MdStreetview, MdShoppingCartCheckout  } from "react-icons/md";
import { TbHttpPost, TbBuildingEstate  } from "react-icons/tb";
import {addDoc, auth, collection, db} from "../firebase.js";
import {useCartStore} from "../store/cartStore.js";
import {onAuthStateChanged} from "firebase/auth";
import {useNavigate} from "react-router-dom";


export const CheckoutForm = React.memo(() => {
    const { cart } = useCartStore();
    const [userAuth, setUserAuth] = React.useState(null);
    const navigate = useNavigate();

    const authCatchChanges = (user) => {
        if(!user)
            return 0;

        if (user) {
            // console.log("User signed in:", user.uid);
            setUserAuth(user);
        } else {
            console.log("No user is signed in.");
        }
    };

    useEffect(() => {
        // Get SignedIn User
        onAuthStateChanged(auth, authCatchChanges);
    }, []);
    const saveCheckout = async (checkoutData) => {
        try {
            console.log("Saving checkout data: ", checkoutData); // Log the data being passed in

            // Create a new document in the 'checkouts' collection
            const docRef = await addDoc(collection(db, "checkouts"), checkoutData);

            console.log("Saving logic!!!!!!!!!!", docRef.id);

            navigate("/successfullyCheckoutPage");

        } catch (error) {
            console.error('Error saving checkout: ', error);
        }
    };

    const handleSubmit = useCallback(async (values) => {
        const checkoutData = {
            userID: userAuth.uid,
            fullName: values.fullName,
            items: [
                ...cart.map(item => item),
            ],
            total: cart.reduce((acc, item) => { return  acc + item.totalPieces }, 0),
            shippingAddress: {
                street: values.street,
                city: values.city,
                state: values.state,
                postalCode: values.postalCode,
                country: values.country
            }
        };
        // console.log(JSON.stringify(checkoutData));
        await saveCheckout(checkoutData);

    }, [cart, userAuth]);

    return <div className="CheckoutForm container pb-5">
        <h1 className={"text-lg font-bold uppercase p-5 whitespace-nowrap text-gray-900"}>
            Information For Complete You Sell
        </h1>
        <Formik
            initialValues={{
                fullName: "",
                street: "",
                city: "",
                state: "",
                postalCode: "",
                country: "",
            }}
            validationSchema={CheckoutValidation}
            onSubmit={async (values, {setSubmitting}) => {
                setSubmitting(false);
                console.log(values);
                await handleSubmit(values);
            }}
        >
            <Form className="checkoutForm max-w-[500px] mx-auto mb-5 flex flex-col gap-4">
                <MyTextField label="Full Name :" name={"fullName"} id="fullName" type="text" placeholder="Full Name">
                    <MdPermIdentity />
                </MyTextField>
                <MyTextField label="Street :" name={"street"} id="Street" type="text" placeholder="Street Name">
                    <MdStreetview  />
                </MyTextField>
                <MyTextField label="State :" name={"state"} id="State" type="text" placeholder="State Name">
                    <TbBuildingEstate   />
                </MyTextField>
                <MySelect label={"City :"} name={"city"} id="city" type="text" placeholder="City">
                    <option value="">Select City Name</option>
                    <option value="Casablanca">Casablanca</option>
                    <option value="Rabat">Rabat</option>
                    <option value="Agadir">Agadir</option>
                </MySelect>
                <MySelect label={"Country :"} name={"country"} id="country" type="text" placeholder="Country Name">
                    <option value="">Select Country Name</option>
                    <option value="Maroc">Maroc</option>
                    <option value="Usa">Usa</option>
                    <option value="Qatar">Qatar</option>
                </MySelect>
                <MyTextField label="Code Postal :" name={"postalCode"} id="codePostal" type="text" placeholder="Code Postal">
                    <TbHttpPost  />
                </MyTextField>
                <button role="button" aria-label={"Sending Checkout Button"} type="submit"
                        className={"flex items-center justify-center gap-x-5 font-bold shadow-sm shadow-black rounded bg-black px-5 py-3 text-white w-fit text-sm lg:text-lg "}
                >
                    <MdShoppingCartCheckout />
                    Validate
                </button>
            </Form>
        </Formik>
    </div>

})