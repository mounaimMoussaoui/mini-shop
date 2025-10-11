import React from "react";

export const SideFilters = React.memo(() => {
    return  <ul className="side-filters p-4 flex flex-col flex-wrap list-none col-start-1 col-end-1 relative">
        <span className={"absolute right-0 -top-5 shadow-sm shadow-black w-[1px] h-[100vh]"}></span>
        <li className={"pb-10 relative"}>
            <h4 className={"font-bold text-xl block uppercase text-center"}>Side Of Filters Options</h4>
            <span className={"absolute bottom-[20px] left-[50%] translate-x-[-50%] w-[60px] h-[3px] bg-orange-300"}></span>
        </li>
        <li>
            <form className="side-filters-form flex flex-col gap-4">
                <div className={"group flex justify-between items-center"}>
                    <label htmlFor="menCheck" className={"font-bold text-gray-600"}>Men's</label>
                    <input type="checkbox" id="menCheck" name="filter"/>
                </div>
                <div className={"group flex justify-between items-center"}>
                    <label htmlFor="womanCheck" className={"font-bold text-gray-600"}>Woman's</label>
                    <input type="checkbox" id="womanCheck" name="filter"/>
                </div>
                <div className={"group flex justify-between items-center"}>
                    <label htmlFor="childrenCheck" className={"font-bold text-gray-600"}>Children's</label>
                    <input type="checkbox" id="childrenCheck" name="filter"/>
                </div>
            </form>
        </li>
    </ul>
});