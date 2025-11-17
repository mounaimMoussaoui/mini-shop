import React from "react";
import {Formik, Form} from "formik";
import {CheckoutValidation} from "../schemas/checkoutValidation.js";
import {MySelect, MyTextField} from "../formikFields/FieldsFormik.jsx";
import { MdPermIdentity, MdStreetview, MdShoppingCartCheckout  } from "react-icons/md";
import { TbHttpPost, TbBuildingEstate  } from "react-icons/tb";


export const CheckoutForm = React.memo(() => {

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
            onSubmit={(values, {setSubmitting}) => {
                setSubmitting(false);
                console.log(values);
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