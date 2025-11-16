import React from "react";
import {Formik, Form} from "formik";
// import {checkoutValidation} from "../schemas/checkoutValidation.js";
import {MySelect, MyTextField} from "../formikFields/FieldsFormik.jsx";
import { MdPermIdentity, MdStreetview  } from "react-icons/md";
import { TbHttpPost, TbBuildingEstate  } from "react-icons/tb";


export const CheckoutForm = React.memo(() => {

    return <>
        <h1 className={"text-lg font-bold uppercase p-5 whitespace-nowrap text-gray-900"}>
            Information For Complete You Sell
        </h1>
        <Formik
            initialValues={{
                fullName: "",
                shippingAddress: {
                    street: "",
                    city: "",
                    state: "",
                    postalCode: "",
                    country: "",
                }
            }}
            // validationSchema={checkoutValidation}
            onSubmit={(values, {setSubmitting}) => {
                setSubmitting(false);
            }}
        >
            <Form className="checkoutForm max-w-[500px] mx-auto mb-5 flex flex-col gap-4">
                <MyTextField label="Full Name :" name={"fullName"} id="fullName" type="text" placeholder="Full Name">
                    <MdPermIdentity />
                </MyTextField>
                <MyTextField label="Street :" name={"Street"} id="Street" type="text" placeholder="Street Name">
                    <MdStreetview  />
                </MyTextField>
                <MyTextField label="State :" name={"State"} id="State" type="text" placeholder="State Name">
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
                <MyTextField label="Code Postal :" name={"codePostal"} id="codePostal" type="text" placeholder="Code Postal">
                    <TbHttpPost  />
                </MyTextField>
            </Form>
        </Formik>
    </>

})