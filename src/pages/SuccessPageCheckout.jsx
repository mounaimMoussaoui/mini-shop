import React from "react";
import { GrValidate } from "react-icons/gr";

export const SuccessPageCheckout = React.memo(() => {

    return <div className="page-success container min-w-full flex flex-col items-center justify-center text-center py-5 gap-y-[25px] mt-[150px]">
        <GrValidate className={"text-xl lg:text-[100px] text-green-300 transition duration-200 hover:text-green-500"}/>
        <h1 className="text-lg lg:text-3xl font-bold text-green-300 transition duration-200 hover:text-green-500">
            Your Command Complete Successfully!
        </h1>
    </div>
});