import React from "react";
import { GrValidate } from "react-icons/gr";

export const SuccessPageCheckout = React.memo(() => {

    return <div className="page-success container min-w-full flex flex-col items-center justify-center text-center py-5 gap-5">
        <GrValidate className={"text-lg lg:text-5xl text-green-600"}/>
        <h1 className="text-lg lg:text-3xl font-bold text-green-500">
            Your Command Complete Successfully!
        </h1>
    </div>
});