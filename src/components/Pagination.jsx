import React, {useCallback, useEffect, useState} from 'react';
import { GrFormPrevious, GrFormNext  } from "react-icons/gr";
import {motion} from "framer-motion";

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

    return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { type: 'spring' } }} className="pagination flex items-center w-fit ml-auto gap-x-5 p-5">
        <motion.button animate={{transition: { type: 'spring' } }} whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1  }} type={"button"} onClick={handlePreviousBtn} className={"pagination__prev py-3 px-7 bg-black text-white rounded text-xl font-bold"} aria-label={"pagination previous button"}>
            <GrFormPrevious />
            <span className="sr-only">Previous</span>
        </motion.button>
            <span className={"nbr-pages font-bold text-lg"}>{currentPage} - {totalPages}</span>
        <motion.button animate={{ transition: { type:"spring" }}}S whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1  }} type={"button"} onClick={handleNextBtn} className={"pagination__next  py-3 px-7 bg-black text-white rounded text-xl font-bold"} aria-label={"pagination next button"}>
            <GrFormNext />
            <span className="sr-only">Next</span>
        </motion.button>
    </motion.div>

});