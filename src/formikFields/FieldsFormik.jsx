import {useField} from "formik";
import React from "react";

export const MyTextField = ({label, children, ...props}) => {

    const [field, meta] = useField(props);
    return  (<div className={`flex flex-col justify-center gap-2 ${props.hasContainer ? "basis-1/2" : "w-full min-w-full"}`}>
        <label htmlFor={props.id || props.name}
               className={"text-xl font-bold"}
        >{label}</label>
        <div className="relative w-full h-[50px] z-[1]">
            <span className={`absolute top-[50%] left-[8px] translate-y-[-50%] text-2xl z-10 ${meta.touched && meta.error ? "text-red-500" : meta.touched ? "text-green-500" : "text-black"}`}>{children}</span>
            {
                props.type === "range" && (<span className={"absolute top-[0px] right-0 text-blue-300-600 font-bold text-[10px]"}>{field.value || 0} $</span>)
            }
            <input
                className={`input-form${props.type !== "range" ? " py-3 px-[40px] shadow-lg rounded-sm absolute " : " "} min-w-full min-h-full transition ease-in-out focus:outline-none focus:border-b-2 ${meta.touched && meta.error ? 'focus:border-b-red-500' : meta.touched ? 'border-green-500' : 'text-black'}`}
                {...field} {...props} />
        </div>
        {
            meta.touched && meta.error ? ( <span className={"text-sm text-red-500 "}>{meta.error}</span> ) : null
        }
    </div>)
};


export const MySelect = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return (<div className={`flex flex-col justify-center gap-2 ${props.hasContainer ? "basis-1/2" : "w-full min-w-full"}`}>
            <label htmlFor={props.id || props.name}
                className={"text-xl font-bold"}
            >{label}</label>
            <select {...field} {...props} className={"w-full py-3 px-5 rounded shadow-sm shadow-black"}/>
            { meta.touched && meta.error ? ( <span className={"text-sm text-red-500"}>{meta.error}</span> ) : null }
        </div>
    )
}