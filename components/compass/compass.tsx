import React, {useState} from 'react';
import Link from 'next/link';
import styles from './compass.module.css';
import openedMap from '../../public/map_opened.png';
import { navtabs } from '../../data/navtabs';
import disableScroll from 'disable-scroll';

type CompassInputProps = {
}

export const Compass: React.FC<CompassInputProps> = () => {
	const [ selected, setSelected ] = useState(0);
	const [ visible, setVisible ] = useState(false);

	/*
	const upHandler = (ev: React.KeyboardEvent<HTMLDivElement>): void => 
	{
		const { key } = ev;

		console.log("prev: ", selected);

		if (key === 'ArrowUp' || key === 'ArrowDown') ev.preventDefault(); 
		if (key === 'ArrowUp' && selected != 0) {
			console.log("up");
			setSelected(selected - 1);
		}
		else if (key === 'ArrowDown' && selected != maxIndex) {
			console.log('down');
			setSelected(selected + 1)
		}

		console.log("new: ", selected);
	}
	*/

   	if (visible) disableScroll.on();
	else disableScroll.off();

	return (
		<React.Fragment>
			<div
				className={`${styles.hider} ${visible ? styles.visible : ''}` }
				onClick={() => { setVisible(false) }}
			/>
			<div className={`${styles.menu} ${visible ? styles.visible : ''}`}>
				{ navtabs.map(tab => (
					<h1
						onClick={() => {
							setSelected(tab.id)
							setVisible(false)
						}}
						key={tab.id}
						className={`${styles.tab} ${selected === tab.id ? styles.activated : '' } ${visible ? styles.visible : ''}`}
					>
						<Link
							key={tab.id} 
							href={tab.route}
						>
							{tab.label}
						</Link>
					</h1>
				)) }
			</div>
			<img
				className={styles.compass}
				onClick={() => { setVisible(!visible); } }
				src={openedMap.src}
			/>
		</React.Fragment>
	)
}
