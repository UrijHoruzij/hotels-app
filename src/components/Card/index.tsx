import { FC } from 'react';
import { Rate, ConfigProvider, Button, Typography, Space } from 'antd';
import { Hotel } from '../../@types';
import styles from './Card.module.css';

const { Title } = Typography;

interface CardProps {
	hotel: Hotel;
}

const CalendarIcon: FC = () => {
	return (
		<svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				id="Vector"
				d="M1.575 0C0.70957 0 0 0.810937 0 1.8V10.2C0 11.1844 0.70957 12 1.575 12H13.125C13.9904 12 14.7 11.1891 14.7 10.2V1.8C14.7 0.810937 13.9863 0 13.125 0H1.575ZM1.575 1.2H13.125C13.4203 1.2 13.65 1.4625 13.65 1.8V2.4H1.05V1.8C1.05 1.45781 1.27559 1.2 1.575 1.2ZM1.05 3.6H13.65V10.2C13.65 10.5375 13.4203 10.8 13.125 10.8H1.575C1.27969 10.8 1.05 10.5375 1.05 10.2V3.6Z"
				fill="#6A53F5"
			/>
		</svg>
	);
};

const MapIcon: FC = () => {
	return (
		<svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g id="Group 318">
				<g id="Group 272">
					<g id="Vector (Stroke)">
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M5.25 1.54487C3.19201 1.54487 1.53125 3.24822 1.53125 5.35897C1.53125 7.1709 2.49117 9.2263 3.48319 10.8576C3.97541 11.667 4.46803 12.3601 4.83765 12.8508C5.00317 13.0706 5.14381 13.2495 5.2484 13.3797C5.35327 13.2472 5.49471 13.0648 5.66135 12.8407C6.03115 12.3434 6.52399 11.6424 7.01642 10.8276C8.00932 9.18467 8.96875 7.12966 8.96875 5.35897C8.96875 3.24822 7.30799 1.54487 5.25 1.54487ZM5.25 13.8045C5.05031 13.9841 5.05026 13.9841 5.0502 13.984L5.04931 13.983L5.04687 13.9801L5.03776 13.9693C5.02984 13.96 5.01826 13.9462 5.00327 13.9282C4.97329 13.8922 4.92965 13.8393 4.87431 13.7708C4.76364 13.6339 4.60607 13.4347 4.41724 13.184C4.03978 12.6828 3.53631 11.9746 3.03243 11.146C2.03227 9.50127 1 7.33391 1 5.35897C1 2.94729 2.89861 1 5.25 1C7.60139 1 9.5 2.94729 9.5 5.35897C9.5 7.29341 8.46725 9.46116 7.46796 11.1147C6.96429 11.9481 6.46103 12.6638 6.08376 13.1711C5.89502 13.4249 5.73755 13.6269 5.62696 13.7659C5.57166 13.8353 5.52806 13.889 5.49812 13.9256C5.48315 13.9439 5.47159 13.9579 5.46369 13.9674L5.4546 13.9783L5.45218 13.9812L5.4513 13.9822C5.45123 13.9823 5.45119 13.9824 5.25 13.8045ZM5.25 13.8045L5.45119 13.9824C5.40099 14.0421 5.32802 14.0766 5.25114 14.0769C5.17426 14.0773 5.10101 14.0434 5.05031 13.9841L5.25 13.8045Z"
							fill="#3A3A3A"
						/>
						<path
							d="M5.25 13.8045C5.05031 13.9841 5.05026 13.9841 5.0502 13.984L5.04931 13.983L5.04687 13.9801L5.03776 13.9693C5.02984 13.96 5.01826 13.9462 5.00327 13.9282C4.97329 13.8922 4.92965 13.8393 4.87431 13.7708C4.76364 13.6339 4.60607 13.4347 4.41724 13.184C4.03978 12.6828 3.53631 11.9746 3.03243 11.146C2.03227 9.50127 1 7.33391 1 5.35897C1 2.94729 2.89861 1 5.25 1C7.60139 1 9.5 2.94729 9.5 5.35897C9.5 7.29341 8.46725 9.46116 7.46796 11.1147C6.96429 11.9481 6.46103 12.6638 6.08376 13.1711C5.89502 13.4249 5.73755 13.6269 5.62696 13.7659C5.57166 13.8353 5.52806 13.889 5.49812 13.9256C5.48315 13.9439 5.47159 13.9579 5.46369 13.9674L5.4546 13.9783L5.45218 13.9812L5.4513 13.9822C5.45123 13.9823 5.45119 13.9824 5.25 13.8045ZM5.25 13.8045L5.45119 13.9824C5.40099 14.0421 5.32802 14.0766 5.25114 14.0769C5.17426 14.0773 5.10101 14.0434 5.05031 13.9841L5.25 13.8045ZM1.53125 5.35897C1.53125 3.24822 3.19201 1.54487 5.25 1.54487C7.30799 1.54487 8.96875 3.24822 8.96875 5.35897C8.96875 7.12966 8.00932 9.18467 7.01642 10.8276C6.52399 11.6424 6.03115 12.3434 5.66135 12.8407C5.49471 13.0648 5.35327 13.2472 5.2484 13.3797C5.14381 13.2495 5.00317 13.0706 4.83765 12.8508C4.46803 12.3601 3.97541 11.667 3.48319 10.8576C2.49117 9.2263 1.53125 7.1709 1.53125 5.35897Z"
							stroke="#3A3A3A"
							strokeWidth="0.4"
							strokeMiterlimit="10"
							strokeLinejoin="round"
						/>
					</g>
					<path
						id="Vector (Stroke)_2"
						fillRule="evenodd"
						clipRule="evenodd"
						d="M4.094 4.74805C4.40055 4.44151 4.81632 4.26929 5.24985 4.26929C5.68338 4.26929 6.09915 4.44151 6.4057 4.74805C6.71225 5.0546 6.88447 5.47038 6.88447 5.9039C6.88447 6.33743 6.71225 6.7532 6.4057 7.05975C6.09915 7.3663 5.68338 7.53852 5.24985 7.53852C4.81632 7.53852 4.40055 7.3663 4.094 7.05975C3.78745 6.7532 3.61523 6.33743 3.61523 5.9039C3.61523 5.47038 3.78745 5.0546 4.094 4.74805ZM5.24985 4.73632C4.94019 4.73632 4.64321 4.85933 4.42424 5.0783C4.20528 5.29726 4.08227 5.59424 4.08227 5.9039C4.08227 6.21356 4.20528 6.51054 4.42424 6.72951C4.64321 6.94847 4.94019 7.07148 5.24985 7.07148C5.55951 7.07148 5.85649 6.94847 6.07546 6.72951C6.29442 6.51054 6.41743 6.21356 6.41743 5.9039C6.41743 5.59424 6.29442 5.29726 6.07546 5.0783C5.85649 4.85933 5.55951 4.73632 5.24985 4.73632Z"
						fill="#3A3A3A"
						stroke="#3A3A3A"
						strokeWidth="0.4"
						strokeMiterlimit="10"
						strokeLinejoin="round"
					/>
				</g>
			</g>
		</svg>
	);
};

const declOfNum = (n: number) => {
	const text = ['отзыв', 'отзыва', 'отзывов'];
	n = Math.abs(n) % 100;
	const n1 = n % 10;
	if (n > 10 && n < 20) {
		return text[2];
	}
	if (n1 > 1 && n1 < 5) {
		return text[1];
	}
	if (n1 == 1) {
		return text[0];
	}
	return text[2];
};

const Card: FC<CardProps> = (props) => {
	const { hotel } = props;
	return (
		<div className={styles.card_wrapper}>
			<div className={styles.card_info}>
				<Title className={styles.card_title} level={4}>
					{hotel.name}
				</Title>
				<div>
					<Space className={styles.card_subtitle}>
						<Rate className={styles.rating} allowHalf disabled defaultValue={hotel.rating} />
						<Space className={styles.card_subtitle_info}>
							<span className={styles.card_type}>{hotel.type}</span>
							<div className={styles.card_dot}></div>
							<span className={styles.card_reviews}>
								{hotel.reviews_amount} {declOfNum(hotel.reviews_amount)}
							</span>
							<span className={styles.card_country}>
								<MapIcon />
								{hotel.country}
							</span>
						</Space>
					</Space>
				</div>
				<div className={styles.card_description}>{hotel.description}</div>
			</div>
			<div>
				<div className={styles.card_wrapper_price}>
					<span className={styles.card_price}>{hotel.min_price.toFixed(0)} ₽</span>
					<span className={styles.card_price_sub}>Цена за 1 ночь</span>
				</div>
				<div>
					<ConfigProvider
						theme={{
							token: {
								colorPrimary: '#6A53F5',
							},
						}}>
						<Button className={styles.card_btn} type="primary">
							<CalendarIcon /> Забронировать
						</Button>
					</ConfigProvider>
				</div>
			</div>
		</div>
	);
};

export default Card;
