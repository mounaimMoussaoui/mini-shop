import { create } from "zustand"

export const useCartStore = create((Set) => ({
    cart: [],
    isAddingCart: false,

    addToCart: (product) => {Set((state) => ({
        cart: [...state.cart, product],
    }))},

    deleteCart: (productID) => { Set((state) => ({ cart: [...state.cart.filter((product) => product.id !== productID)] } )) },
    clearCart: () => { Set(() => ({ cart: [] })) },
    decrementPiecesTotal: (productID) => { Set((state) => ({ cart: state.cart.map((product) => {
            if(product.id === productID) {
                return { ...product, totalPieces:  product.totalPieces - 1 }
            }
            return product;
    })}))},
    incrementPiecesTotal: (productID) => Set((state) => ({
        cart: state.cart.map((product) =>
            product.id === productID
                ? { ...product, totalPieces: product.totalPieces + 1 }
                : product
        ),
    })),
    changeAddingState: () => { Set((state) => ({ isAddingCart: !state.isAddingCart }))}
}));
