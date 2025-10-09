import React from "react";
import PropTypes from "prop-types";
import { FaCartPlus } from "react-icons/fa6";

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
        <article className="product-card shadow-sm shadow-gray-500 overflow-hidden rounded relative flex flex-col">
            <header className="w-full" aria-label={`${product.title} images carousel`}>
                <ul className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar w-full">
                    {product.images.map((image, index) => (
                        <li key={index} className="image min-w-full snap-center">
                            <img
                                src={image}
                                className="w-full h-full object-contain"
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

            <span className="price absolute top-2 left-2 rounded-full bg-black text-white w-[50px] h-[50px] flex items-center justify-center font-bold">
        {formatPrice(product.price)}
      </span>

            <button
                type="button"
                onClick={() => {onAddToCart?.(product);}}
                className="btn bg-amber-500 rounded mx-auto mt-auto flex items-center justify-center gap-x-5 font-bold text-white text-md uppercase my-3 py-[15px] px-[25px]"
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
