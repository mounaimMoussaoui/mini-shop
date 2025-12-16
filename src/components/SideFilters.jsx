import React, {useEffect, useRef} from "react";
import {getCategories} from "../services/api.js";
import {Form, Formik} from "formik";
import {MySelect, MyTextField} from "../formikFields/FieldsFormik.jsx";
import {ValidationOfFilters} from "../schemas/FilterValidation.js";
import {RangePriceFilter} from "./RangePriceFilter.jsx";
import {motion} from "framer-motion";

export const SideFilters = React.memo(({maxPrice, getValuesFlr}) => {
    const [categories, setCategories] = React.useState([]);
    const fetchedCategories = useRef(false);

    useEffect( () => {
        if(fetchedCategories.current) return

        fetchedCategories.current = true;

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

    return  <motion.ul initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0, transition: { type: "spring" } }} className="side-filters p-4 flex flex-col list-none bg-white sm:min-w-[300px] sm:min-h-[90vh] after:hidden sm:after:block shadow-sm shadow-black sm:shadow-none sm:relative sm:after:shadow-sm sm:after:bg-black sm:after:shadow-black sm:after:min-w-[1px] sm:after:h-[100%] sm:after:top-0 sm:after:absolute sm:after:right-0">
        <motion.li initial={{ scale: 0.5 }} animate={{ scale: 1, transition: { type: "spring" } }} className={"pb-10 relative"}>
            <h4 className={"font-bold text-xl block uppercase sm:text-center"}>Side Of Filters Options</h4>
            <span className={"absolute bottom-[20px] sm:left-[50%] sm:translate-x-[-50%] w-[60px] h-[3px] bg-orange-300"}></span>
        </motion.li>
        <motion.li initial={{ scale: 0.5 }} animate={{ scale: 1, transition: { type: "spring" } }}>
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
                    {/*Work on the crucial range slider more used in e-commerce shops*/}
                    <RangePriceFilter />

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

            <motion.button initial={{opacity: 0, scale:0.9}} animate={{opacity: 1, transition: {type: "spring", delay: 0.3}}} type={"submit"}
                   whileHover={{ scale: 1, transition: {type: "spring" } }}
                   whileTap={{ scale: 0.7 }}
                   form={"filter-form"}
                    className={"block py-3 px-5 shadow-lg bg-orange-600 rounded text-white font-bold sm:ml-auto sm:w-full"}>Filter
            </motion.button>

        </motion.li>

    </motion.ul>
});
