import React from "react";

export const SideFilters = React.memo(() => {
    return  <ul className="side-filters p-4 flex flex-col flex-wrap list-none col-start-1 col-end-1 relative">
        <span className={"absolute right-0 -top-5 shadow-sm shadow-black w-[1px] h-[100vh]"}></span>
        <li className={"pb-7"}>
            <h4>Side Of Filters Options</h4>
        </li>
        <li>
            <form className="side-filters-form flex flex-col gap-4">
                <div className={"group flex justify-between items-center"}>
                    <label htmlFor="menCheck">Men's</label>
                    <input type="checkbox" id="menCheck" name="filter"/>
                </div>
                <div className={"group flex justify-between items-center"}>
                    <label htmlFor="womanCheck">Woman's</label>
                    <input type="checkbox" id="womanCheck" name="filter"/>
                </div>
                <div className={"group flex justify-between items-center"}>
                    <label htmlFor="childrenCheck">Children's</label>
                    <input type="checkbox" id="childrenCheck" name="filter"/>
                </div>
            </form>
        </li>
    </ul>
});