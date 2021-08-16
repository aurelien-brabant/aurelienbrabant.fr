import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import styles from './compass.module.css';

type CompassInputProps = {
}

type NavTab = {
	title: string;
	route: string;
	id: number;
}

export const Compass: React.FC<CompassInputProps> = () => {
	const [ selected, setSelected ] = useState(0);
	const [ visible, setVisible ] = useState(false);

	const tabs: NavTab[] = [
		{
			title: 'Home',
			route: '/',
			id: 0
		},
		{
			title: 'Blog',
			route: '/blog',
			id: 1
		},
		{
			title: 'Contact',
			route: '/contact',
			id: 2
		}
	];

	const maxIndex = tabs[tabs.length - 1].id;

	console.log("max", maxIndex);

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

	return (
		<React.Fragment>
			<div className={styles.menu} style={{display: visible ? 'flex' : 'none'}}>
				<div className={styles.backgroundColor} />
				{ tabs.map(tab => (
					<h1
						onClick={() => {
							setSelected(tab.id)
							setVisible(false)
						}}
						key={tab.id}
						className={`${styles.tab} ${selected === tab.id ? styles.activated : '' }`}
					>
						<Link
							key={tab.id} 
							href={tab.route}
						>
							{`${selected == tab.id ? '> ' : ''}${tab.title}`}
						</Link>
					</h1>
				)) }
			</div>
			<img
				className={styles.compass}
				onClick={() => setVisible(!visible) }
				src="/compass.png"
			/>
		</React.Fragment>
	)
}
