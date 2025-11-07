import React, {useCallback, useEffect, useState} from 'react';
import { GrFormPrevious, GrFormNext  } from "react-icons/gr";

export const Pagination = React.memo(({countPrd, getCurrentPage}) => {
    const totalPages = Math.trunc(countPrd / 10);
    const [currentPage, setCurrentPage] = useState(1);

    const handlePreviousBtn = useCallback(() => {
        if (currentPage > 1) {
            setCurrentPage( prevPage => prevPage - 1 );
        }
    }, [currentPage]);

    const handleNextBtn = useCallback(() => {
        if (currentPage < totalPages) {
            setCurrentPage( prevPage => prevPage + 1 );
        }
    }, [currentPage, totalPages]);

    useEffect(() => {
        getCurrentPage(currentPage);
    }, [getCurrentPage, currentPage]);

    return <div className="pagination flex items-center w-fit ml-auto gap-x-5 p-5">
        <button type={"button"} onClick={handlePreviousBtn} className={"pagination__prev py-3 px-7 bg-black text-white rounded text-xl font-bold"} aria-label={"pagination previous button"}>
            <GrFormPrevious />
            <span className="sr-only">Previous</span>
        </button>
            <span className={"nbr-pages font-bold text-lg"}>{currentPage} - {totalPages}</span>
        <button type={"button"} onClick={handleNextBtn} className={"pagination__next  py-3 px-7 bg-black text-white rounded text-xl font-bold"} aria-label={"pagination next button"}>
            <GrFormNext />
            <span className="sr-only">Next</span>
        </button>
    </div>

});