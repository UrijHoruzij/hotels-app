import { ChangeEvent, FC, useCallback, useEffect, useState, useRef } from 'react';
import styles from './MultiRangeSlider.module.css';

interface MultiRangeSliderProps {
	min: number;
	max: number;
	onChange: Function;
	valueMin: number | null;
	valueMax: number | null;
}

const MultiRangeSlider: FC<MultiRangeSliderProps> = ({ min, max, onChange, valueMin, valueMax }) => {
	const [minVal, setMinVal] = useState(min);
	const [maxVal, setMaxVal] = useState(max);
	const minValRef = useRef<HTMLInputElement>(null);
	const maxValRef = useRef<HTMLInputElement>(null);
	const range = useRef<HTMLDivElement>(null);
	const getPercent = useCallback((value: number) => Math.round(((value - min) / (max - min)) * 100), [min, max]);
	useEffect(() => {
		if (maxValRef.current) {
			const minPercent = getPercent(minVal);
			const maxPercent = getPercent(+maxValRef.current.value);
			if (range.current) {
				range.current.style.left = `${minPercent}%`;
				range.current.style.width = `${maxPercent - minPercent}%`;
			}
		}
	}, [minVal, getPercent]);
	useEffect(() => {
		if (minValRef.current) {
			const minPercent = getPercent(+minValRef.current.value);
			const maxPercent = getPercent(maxVal);
			if (range.current) {
				range.current.style.width = `${maxPercent - minPercent}%`;
			}
		}
	}, [maxVal, getPercent]);
	useEffect(() => {
		onChange({ min: minVal, max: maxVal });
	}, [minVal, maxVal]);
	useEffect(() => {
		if (valueMin !== null) setMinVal(valueMin);
		if (valueMax !== null) setMaxVal(valueMax);
	}, [valueMax, valueMin]);
	return (
		<div className={styles.container}>
			<input
				type="range"
				min={min}
				max={max}
				value={minVal}
				ref={minValRef}
				step={1000}
				onChange={(event: ChangeEvent<HTMLInputElement>) => {
					const value = Math.min(+event.target.value, maxVal - 1);
					setMinVal(value);
					event.target.value = value.toString();
				}}
				className={[styles.thumb, styles.thumb_zindex_3, minVal > max - 100 ? styles.thumb_zindex_5 : ''].join(' ')}
			/>
			<input
				type="range"
				min={min}
				max={max}
				value={maxVal}
				ref={maxValRef}
				step={1000}
				onChange={(event: ChangeEvent<HTMLInputElement>) => {
					const value = Math.max(+event.target.value, minVal + 1);
					setMaxVal(value);
					event.target.value = value.toString();
				}}
				className={[styles.thumb, styles.thumb_zindex_4].join(' ')}
			/>
			<div className={styles.slider}>
				<div className={styles.slider_track}></div>
				<div ref={range} className={styles.slider_range}></div>
			</div>
		</div>
	);
};

export default MultiRangeSlider;
