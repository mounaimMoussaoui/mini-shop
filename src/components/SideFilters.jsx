import React, {useEffect} from "react";
import {getCategories} from "../services/api.js";
import {Form, Formik} from "formik";
import {MySelect, MyTextField} from "../formikFields/FieldsFormik.jsx";
import {ValidationOfFilters} from "../schemas/FilterValidation.js";

export const SideFilters = React.memo(({maxPrice, getValuesFlr}) => {
    const [categories, setCategories] = React.useState([]);

    useEffect( () => {
         getCategories().then((res) => {
             setCategories(res);
        }).catch(() => {
            throw new Error("Error getting categories list");
        });
    }, []);

    const validation  = ()  => {
        const categoriesNames = categories.map((item) => { return item.name }) || [];
        return ValidationOfFilters(categoriesNames, maxPrice);
    }

    return  <ul className="side-filters p-4 flex flex-col list-none bg-white sm:min-w-[300px] sm:min-h-[90vh] after:hidden sm:after:block shadow-sm shadow-black sm:shadow-none sm:relative sm:after:shadow-sm sm:after:bg-black sm:after:shadow-black sm:after:min-w-[1px] sm:after:h-[100%] sm:after:top-0 sm:after:absolute sm:after:right-0">
        <li className={"pb-10 relative"}>
            <h4 className={"font-bold text-xl block uppercase sm:text-center"}>Side Of Filters Options</h4>
            <span className={"absolute bottom-[20px] sm:left-[50%] sm:translate-x-[-50%] w-[60px] h-[3px] bg-orange-300"}></span>
        </li>
        <li>
            <Formik initialValues={
                {
                    ctrFlr: '',
                    priceFlr: ''
                }
            }
                    validationSchema={validation}
                    onSubmit={(values, {setSubmitting}) => {
                        setTimeout(() => {
                            getValuesFlr(values);
                            setSubmitting(false);
                        }, 1000);
                    }}>
                <Form
                    id={"filter-form"}
                    className={"filter-form-sizing flex gap-5 p-4 justify-between items-end overflow-hidden overflow-x-scroll sm:overflow-hidden sm:flex-col sm:gap-4"}>
                    <MyTextField label={"Filter By Price :"} type={"range"} id={"priceFlr"} name={"priceFlr"} min={0}
                                 max={maxPrice} step={30}/>
                    <MySelect label={"Filter By Category:"} name={"ctrFlr"} id={"ctrFlr"}>
                        <option value="" defaultValue={"Select Category"}>Select Category</option>
                        {
                            categories.map(c => (
                                <option key={c.id} value={c.name}>{c.name}</option>
                            ))
                        }
                    </MySelect>
                </Form>
            </Formik>

            <button type={"submit"}
                    form={"filter-form"}
                    className={"block py-3 px-5 shadow-lg bg-orange-600 rounded text-white font-bold sm:ml-auto sm:w-full transition ease-in-out scale-90 hover:scale-100"}>Filter
            </button>

        </li>

    </ul>
});
