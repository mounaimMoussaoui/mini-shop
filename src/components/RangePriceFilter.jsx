import React, {useEffect, useRef, useState} from "react";
import styles from "../styles/rangePriceFilter.module.scss";

export const RangePriceFilter = React.memo(()=> {
    const initialMinPrice = 0;
    const initialMaxPrice = 0;

    const [sliderMinValue] = useState(initialMinPrice);
    const [sliderMaxValue] = useState(initialMaxPrice);

    const [minValue, setMinValue] = useState(initialMinPrice);
    const [maxValue, setMaxValue] = useState(initialMaxPrice);
    const [minInputValue, setMinInputValue] = useState(initialMinPrice);
    const [maxInputValue, setMaxInputValue] = useState(initialMaxPrice);

    const [isDragging, setIsDragging] = React.useState(false);

    const minGap = 5;
    const didFetch = useRef(false);

    const slideMin = (e) => {
        const value = parseInt(e.target.value, 10);

        if(value >= sliderMinValue && ( maxValue - value ) >= minGap) {
            setMinValue(value);
            setMinInputValue(value);
        }
    }

    const slideMax = (e) => {
        const value = parseInt(e.target.value, 10);

        if (value <= sliderMaxValue && ( value - minValue ) >= minGap) {
            setMinValue(value);
            setMinInputValue(value);
        }
    }

    const setSliderTrack = () => {
        const range = document.querySelector(".slider-track");

        if(range) {
            const minPercent = ((minValue - sliderMinValue) / (sliderMaxValue - sliderMinValue)) * 100;
            const maxPercent = ((maxValue - sliderMinValue) / (sliderMaxValue - sliderMinValue)) * 100;

            range.style.left = `${minPercent}%`;
            range.style.right = `${100 - maxPercent}%`;
        }
    }

    useEffect(() => {
        if (didFetch.current)
            return;

        didFetch.current = true;
        setSliderTrack();

    }, [minValue, maxValue]);

    const handleMinInput = (e) => {
        const value = e.target.value === "" ? sliderMinValue : parseInt(e.target.value, 10);

        if (value > sliderMinValue && value < maxValue - minGap) {
            setMinValue(value);
            setMinInputValue(value);
        }

    }

    const handleMaxInput = (e) => {
        const value = e.target.value === "" ? sliderMaxValue : parseInt(e.target.value, 10);

        if (value <= sliderMaxValue && value > minValue + minGap) {
            setMaxValue(value);
            setMaxInputValue(value);
        }

    }

    const handleInputKeyDown = (e, type) => {
        if (e.key === "Enter") {
            const value = parseInt(e.target.value, 10);

            if(type === "min" && value >= sliderMinValue && value < maxValue - minGap) {
                setMinValue(value);
            } else if (type === "max" && value <= sliderMaxValue && value > maxValue + minGap) {
                setMaxValue(value);
            }

        }
    }

    const startDrag = () => {
        setIsDragging(true);
    }

    const stopDrag = () => {
        setIsDragging(false);
    }

    // return <article className="range-price-filter">
    //
    // </article>
    return (<div className={`double-slider-box ${styles.double_slider_box}`}>
                <div className={`input-box ${styles.input_box}`}>
                    <div className={`min-box ${styles.min_box}`}>
                        <input
                            type="number"
                            value={minInputValue}
                            onChange={handleMinInput}
                            onKeyDown={(e) => handleInputKeyDown(e, "min")}
                            className="min_input"
                            min={sliderMinValue}
                            max={maxValue - minGap}
                        />
                    </div>
                    <div className={`max_box ${styles.max_box}`}>
                        <input
                            type="number"
                            value={maxInputValue}
                            onChange={handleMaxInput}
                            onKeyDown={(e) => handleInputKeyDown(e, "max")}
                            className="max_input"
                            min={minValue + minGap}
                            max={sliderMaxValue}
                        />
                    </div>
                </div>
                <div className={`range_slider ${styles.range_slider}`}>
                    <div className={`slider_track ${styles.range_track}`}></div>
                    <input
                        type="range"
                        min={sliderMinValue}
                        max={sliderMaxValue}
                        value={minValue}
                        onChange={slideMin}
                        onMouseDown={startDrag}
                        onMouseUp={stopDrag}
                        onTouchStart={startDrag}
                        onTouchEnd={stopDrag}
                        className="min_val"
                    />
                    <input
                        type="range"
                        min={sliderMinValue}
                        max={sliderMaxValue}
                        value={maxValue}
                        onChange={slideMax}
                        onMouseDown={startDrag}
                        onMouseUp={stopDrag}
                        onTouchStart={startDrag}
                        onTouchEnd={stopDrag}
                        className="max_val"
                    />
                    {isDragging && <div className="min_tooltip">{minValue}</div>}
                    {isDragging && <div className="max_tooltip">{minValue}</div>}
                </div>
            </div>
    );
});