import { FC, ReactNode } from 'react';
import styles from './Wrapper.module.css';
interface WrapperProps {
	children?: ReactNode;
	className?: string;
}

const Wrapper: FC<WrapperProps> = (props) => {
	const { children, className = '' } = props;
	return <div className={[styles.wrapper, className].join(' ')}>{children}</div>;
};

export default Wrapper;
