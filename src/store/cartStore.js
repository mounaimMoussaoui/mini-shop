import { create } from "zustand"


export const useCartStore = create((Set) => ({
    cart: [
        {
            id: 100,
            title: "XXL-Sport Coat For Winter Season",
            description: "This Coat For Winter Season Take It's In The Sold If You Want More Than 3 Coats",
            price: 199.99,
            images: [
                "asserts/react.svg",
                "asserts/react.svg",
                "asserts/react.svg"
            ],
            totalPieces: 1,
        },
        {
            id: 300,
            title: "Lg-Boots For Winter Season",
            description: "This Coat For Winter Season Take It's In The Sold If You Want More Than 3 Coats",
            price: 19.99,
            images: [
                "asserts/react.svg",
                "asserts/react.svg",
                "asserts/react.svg"
            ],
            totalPieces: 3,
        },
    ],
    addToCart: (product) => {Set((state) => ({cart: [...state.cart, product]}))},
    deleteCart: (productID) => { Set((state) => ({ cart: state.cart.filter((product) => product.id !== productID) } )) },
    clearCart: () => { Set(() => ({ cart: [] })) },
    decrementPiecesTotal: (productID) => { Set((state) => ({ cart: state.cart.map((product) => {
            if(product.id === productID) {
                product.totalPieces -=  1;
            }
            return product;
    })}))},
    incrementPiecesTotal: (productID) => { Set((state) => ({ cart: state.cart.map((product) => {
            if(product.id === productID) {
                product.totalPieces +=  1;
            }
            return product;
        })}))}
}));

