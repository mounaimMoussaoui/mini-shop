import React from "react";
import PropTypes from "prop-types";
import { FaCartPlus } from "react-icons/fa";
import "../styles/product.module.scss"

const formatPrice = (value) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
        Number(value)
    );

const areEqual = (prev, next) =>
    prev.product.id === next.product.id &&
    prev.product.title === next.product.title &&
    Number(prev.product.price) === Number(next.product.price);

export const ProductCard = React.memo(function ProductCard({ product, onAddToCart }) {

    return (
        <article className="product-card shadow-sm shadow-gray-500 overflow-hidden rounded relative flex flex-col min-h-full min-w-full product-sizing">
            <header className="w-full" aria-label={`${product.title} images carousel`}>
                <ul className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar min-h-[200px] bg-black w-full">
                    {product.images.map((image, index) => (
                        <li key={index} className="image min-w-full snap-center max-h-[200px]">
                            <img
                                src={image}
                                className="w-full h-full object-cover"
                                alt={`${product.title} — image ${index + 1}`}
                                loading="lazy"
                            />
                        </li>
                    ))}
                </ul>
            </header>

            <div className="content p-5">
                <h2 className="card-title font-bold text-xl truncate">{product.title}</h2>
                <p className="text-gray-500 text-sm md:text-lg py-5 leading-[1.7] line-clamp-3">
                    {product.description}
                </p>
            </div>

            <span className="price absolute top-0 left-0 bg-black text-white min-w-[40px] sm:min-w-[50px] p-4 flex items-center justify-center font-bold">
        {formatPrice(product.price)}
      </span>

            <button
                type="button"
                onClick={() => {onAddToCart(product);}}
                className="btn bg-amber-500 rounded mx-auto mt-auto flex items-center justify-center gap-x-2 lg:gap-x-5 font-bold text-white text-sm lg:text-md text-nowrap uppercase my-3 py-[10px] px-[15px] lg:py-[15px] lg:px-[25px] transition ease-in hover:bg-amber-600 hover:scale-90"
                role="button"
                aria-label="Add product to cart"
            >
                <FaCartPlus /> Add To Cart
            </button>
        </article>
    );
}, areEqual);

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    onAddToCart: PropTypes.func,
};
