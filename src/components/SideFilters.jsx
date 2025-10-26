import React, {useEffect} from "react";
import {getCategories} from "../services/api.js";
import {Form, Formik} from "formik";
import {MySelect, MyTextField} from "../formikFields/FieldsFormik.jsx";
import {ValidationOfFilters} from "../schemas/FilterValidation.js";

export const SideFilters = React.memo(({maxPrice}) => {
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

    return  <ul className="side-filters p-4 flex flex-col flex-wrap list-none col-start-1 col-end-1 relative">
        <span className={"absolute right-0 -top-5 shadow-sm shadow-black w-[1px] h-[100vh]"}></span>
        <li className={"pb-10 relative"}>
            <h4 className={"font-bold text-xl block uppercase text-center"}>Side Of Filters Options</h4>
            <span className={"absolute bottom-[20px] left-[50%] translate-x-[-50%] w-[60px] h-[3px] bg-orange-300"}></span>
        </li>
        <li>
            <Formik initialValues={
                    {
                        ctrFlr: '',
                        priceFlr: ''
                    }
                }
                validationSchema={validation}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 1000);
                }}>
                <Form className={"flex flex-col gap-4"}>
                    <MyTextField label={"Filter By Price :"} type={"range"} id={"priceFlr"} name={"priceFlr"} min={0} max={maxPrice} step={20} />
                    <MySelect label={"Filter By Category:"} name={"ctrFlr"} id={"ctrFlr"}>
                        <option value="" defaultValue={"Select Category"}>Select Category</option>
                        {
                            categories.map(c => (
                                <option key={c.id} value={c.name}>{c.name}</option>
                            ))
                        }
                    </MySelect>
                    <button type={"submit"} className={"w-full py-3 px-5 shadow-lg bg-orange-600 rounded text-white font-bold"}>Filter</button>
                </Form>
            </Formik>
        </li>

    </ul>
});


{/*<form className="side-filters-form flex flex-col gap-4">*/}
{/*     <div className={"group flex flex-col gap-4"}>*/}
{/*         <label htmlFor="cat-ftr" className={"font-bold text-gray-500"}>Filter By :</label>*/}
{/*         <select name="categorie-filter" id="cat-ftr"*/}
{/*                 className={"flex flex-col gap-2 py-3 px-2 rounded shadow-sm shadow-black border-none outline-none"}>*/}
{/*             <option value="" defaultValue={"Chose category :"} className={"font-bold text-gray-300"}>Chose category :</option>*/}
{/*             {*/}
{/*                 categories.map(category => (*/}
{/*                     <option key={category.id} value={category.name}>{category.name}</option>*/}
{/*                 ))*/}
{/*             }*/}
{/*         </select>*/}
{/*     </div>*/}
{/*    <div className={"group flex flex-col gap-4"}>*/}
{/*        <label htmlFor="price-ftr" className={"font-bold text-gray-500"}>Filter By Price</label>*/}
{/*        <input type="range" id={"price-ftr"} min={0} max={maxPrice} step={20} className={""}/>*/}
{/*    </div>*/}
{/*</form>*/}