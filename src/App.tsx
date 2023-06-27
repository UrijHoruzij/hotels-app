import { FC, useState, useEffect, ChangeEvent } from 'react';
import {
	Col,
	Row,
	Button,
	Space,
	ConfigProvider,
	Input,
	Typography,
	Checkbox,
	Divider,
	InputNumber,
	Pagination,
	Empty,
} from 'antd';
import type { PaginationProps } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Card, Wrapper, MultiRangeSlider } from './components';
import { Hotel } from './@types';
import { countries } from './utils';
import styles from './App.module.css';
import emptyImage from './empty.svg';

const { Title } = Typography;
const App: FC = () => {
	const [dataHotels, setDataHotels] = useState<Hotel[] | null>(null);
	const [data, setData] = useState<Hotel[] | null>(null);
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState<string>('');
	const [countriesList, setCountriesList] = useState<string[]>(countries);
	const [filterCountry, setFilterCountry] = useState<string[]>([]);
	const [filterType, setFilterType] = useState<string[]>([]);
	const [filterRating, setFilterRating] = useState<number[]>([]);
	const [filterCountReviews, setFilterCountReviews] = useState<number | null>(0);
	const [minPrice, setMinPrice] = useState<number | null>(0);
	const [maxPrice, setMaxPrice] = useState<number | null>(100500);

	const fetchJson = async () => {
		const response = await fetch('./hotels.json');
		let data = await response.json();
		setDataHotels(data.hotels);
		setData(data.hotels);
	};
	useEffect(() => {
		fetchJson();
	}, []);

	const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
		if (e.target.value !== '') {
			const newSearch = countriesList.filter((country) => {
				return country.toLowerCase().indexOf(e.target.value.toLowerCase()) === 0;
			});
			setCountriesList(newSearch);
		} else {
			setCountriesList(countries);
		}
	};
	const handleChangeCountry = (e: any) => {
		if (filterCountry.includes(e.target.value)) {
			const newFilterCountry = filterCountry.filter((country: string) => {
				return country !== e.target.value;
			});
			setFilterCountry(newFilterCountry);
		} else {
			setFilterCountry((prev) => [...prev, e.target.value]);
		}
	};
	const handleChangeType = (e: any) => {
		if (filterType.includes(e.target.value)) {
			const newFilterType = filterType.filter((type: string) => {
				return type !== e.target.value;
			});
			setFilterType(newFilterType);
		} else {
			setFilterType((prev) => [...prev, e.target.value]);
		}
	};
	const handleChangeRating = async (e: any) => {
		const num: number = e.target.value.toFixed(0);
		if (filterRating.includes(Number(num))) {
			const newFilterRating = filterRating.filter((rating: number) => {
				return rating !== Number(num);
			});
			setFilterRating(newFilterRating);
		} else {
			setFilterRating((prev) => [...prev, Number(num)]);
		}
	};
	const handleChangeCountReviews = (count: number | null) => {
		if (count === null) {
			setFilterCountReviews(0);
		} else {
			setFilterCountReviews(count);
		}
	};
	const handleChangeRange = ({ min, max }: { min: number; max: number }) => {
		setMinPrice(min);
		setMaxPrice(max);
	};
	const handleChangeMinPrice = (min: number | null) => {
		if (min === null) {
			setMinPrice(0);
		} else {
			setMinPrice(min);
		}
	};
	const handleChangeMaxPrice = (max: number | null) => {
		if (max === null) {
			setMaxPrice(100500);
		} else {
			setMaxPrice(max);
		}
	};
	const handleChangePage: PaginationProps['onChange'] = (page: number) => {
		setPage(page);
	};
	const filterList = () => {
		if (dataHotels) {
			const itemsUpdate = dataHotels.filter((hotel: Hotel) => {
				let country;
				let type;
				let rating;
				let countReviews = true;
				let minPriceFilter = true;
				let maxPriceFilter = true;
				if (filterCountry.length > 0) {
					country = filterCountry.includes(hotel.country);
				} else {
					country = true;
				}
				if (filterType.length > 0) {
					type = filterType.includes(hotel.type);
				} else {
					type = true;
				}
				if (filterRating.length > 0) {
					rating = filterRating.includes(Math.round(hotel.rating));
				} else {
					rating = true;
				}
				if (filterCountReviews) countReviews = filterCountReviews <= hotel.reviews_amount;
				if (minPrice) minPriceFilter = minPrice <= hotel.min_price;
				if (maxPrice) maxPriceFilter = maxPrice >= hotel.min_price;
				return country && type && rating && countReviews && minPriceFilter && maxPriceFilter;
			});
			setData(itemsUpdate);
		}
	};
	const clearFilter = () => {
		setFilterCountry([]);
		setFilterType([]);
		setFilterRating([]);
		setFilterCountReviews(0);
		setMinPrice(0);
		setMaxPrice(100500);
		filterList();
	};
	return (
		<div>
			<Row gutter={40}>
				<Col span={6}>
					<Title className={styles.title} level={5}>
						Страна
					</Title>
					<Input
						size="large"
						placeholder="Поиск стран"
						value={search}
						onChange={handleChangeSearch}
						prefix={<SearchOutlined />}
					/>
					<Wrapper className={styles.countries}>
						{countriesList.length > 0 ? (
							countriesList.map((country) => (
								<Checkbox
									key={country}
									className={styles.country_checkbox}
									value={country}
									onChange={handleChangeCountry}>
									{country}
								</Checkbox>
							))
						) : (
							<div className={styles.countries_empty}>
								<span>К сожалению, по вашему запросу ничего не найдено :(</span>
							</div>
						)}
					</Wrapper>
					<Title className={styles.title} level={5}>
						Тип
					</Title>
					<Wrapper className={styles.type}>
						<Checkbox className={styles.type_checkbox} value="Апартаменты" onChange={handleChangeType}>
							Апартаменты
						</Checkbox>
						<Divider className={styles.divider} />
						<Checkbox className={styles.type_checkbox} value="Отель" onChange={handleChangeType}>
							Отель
						</Checkbox>
					</Wrapper>
					<Title className={styles.title} level={5}>
						Количество звезд
					</Title>
					<Wrapper>
						<Checkbox className={styles.checkbox} value={1} onChange={handleChangeRating}>
							1 звезда
						</Checkbox>
						<Checkbox className={styles.checkbox} value={2} onChange={handleChangeRating}>
							2 звезды
						</Checkbox>
						<Checkbox className={styles.checkbox} value={3} onChange={handleChangeRating}>
							3 звезды
						</Checkbox>
						<Checkbox className={styles.checkbox} value={4} onChange={handleChangeRating}>
							4 звезды
						</Checkbox>
						<Checkbox className={styles.checkbox} value={5} onChange={handleChangeRating}>
							5 звезд
						</Checkbox>
					</Wrapper>
					<Title className={styles.title} level={5}>
						Количество отзывов (от)
					</Title>
					<InputNumber
						className={styles.inputNumber}
						size="large"
						value={filterCountReviews ? filterCountReviews : null}
						min={1}
						placeholder="Например, от 10"
						onChange={handleChangeCountReviews}
					/>
					<Title className={styles.title} level={5}>
						Цена
					</Title>
					<div className={styles.price}>
						<InputNumber
							className={styles.inputNumber}
							size="large"
							placeholder="От 0 ₽"
							min={0}
							onChange={handleChangeMinPrice}
						/>
						-
						<InputNumber
							className={styles.inputNumber}
							size="large"
							placeholder="До 100500 ₽"
							min={1}
							max={100500}
							onChange={handleChangeMaxPrice}
						/>
					</div>
					<MultiRangeSlider valueMin={minPrice} valueMax={maxPrice} min={0} max={100500} onChange={handleChangeRange} />
					<Space direction="vertical" size="middle" style={{ display: 'flex' }}>
						<ConfigProvider
							theme={{
								token: {
									colorPrimary: '#6A53F5',
								},
							}}>
							<Button onClick={filterList} className={styles.btn_apply} type="primary">
								Применить фильтры
							</Button>
						</ConfigProvider>
						<Button onClick={clearFilter} className={styles.btn_clear}>
							Очистить фильтры
						</Button>
					</Space>
				</Col>
				<Col span={18}>
					{data && data.length > 0 ? (
						<>
							{data?.map((hotel, index) => {
								if (page * 3 >= index && index > (page - 1) * 3) {
									return <Card key={hotel.name} hotel={hotel} />;
								}
							})}
							{data && data.length > 0 && (
								<ConfigProvider
									theme={{
										token: {
											colorPrimary: '#6A53F5',
											colorBgContainer: 'rgba(106, 83, 245, 0.1)',
											controlHeight: 40,
											colorText: '#3A3A3A',
											lineHeight: 24,
											fontSize: 18,
											fontFamily: 'PT Sans,sans-serif',
										},
									}}>
									<Pagination
										className={styles.pagination}
										current={page}
										onChange={handleChangePage}
										pageSize={3}
										total={data?.length}
									/>
								</ConfigProvider>
							)}
						</>
					) : (
						<Wrapper className={styles.empty}>
							<Empty
								image={emptyImage}
								imageStyle={{ height: 180 }}
								description={
									<div className={styles.empty_info}>
										<Title className={styles.empty_title} level={5}>
											По данным параметрам ничего не найдено
										</Title>
										<span className={styles.empty_description}>
											Попробуйте изменить параметры фильтрации или вернуться в общий каталог
										</span>
										<ConfigProvider
											theme={{
												token: {
													colorPrimary: '#6A53F5',
												},
											}}>
											<Button type="primary" onClick={clearFilter} className={styles.empty_btn_clear}>
												Очистить фильтр
											</Button>
										</ConfigProvider>
									</div>
								}></Empty>
						</Wrapper>
					)}
				</Col>
			</Row>
		</div>
	);
};

export default App;
