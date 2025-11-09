import * as Yup from "yup";

export const ValidationOfFilters =(categories, maxPrice) => {
    return Yup.object({
        ctrFlr: Yup.string().oneOf(categories, "Category selected not valid"),
        priceFlr: Yup.number().min(0, "Must select a price greater then zero").max(maxPrice, `You Can't Select greater then maximum price ${maxPrice.maxPrice}`),
    })
}