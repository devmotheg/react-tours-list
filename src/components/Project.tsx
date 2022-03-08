/*!
 * @author Mohamed Muntasir
 * @link https://github.com/devmotheg
 */

import React, { useState, useEffect } from "react";

interface Props {
	id: string;
	image: string;
	name: string;
	price: string;
	info: string;
	children?: React.ReactElement;
}

interface Card {
	text: string;
	button?: string;
}

const DATA_URL = "https://course-api.com/react-tours-project";

const ellipsis = (text: string) => `${text.slice(0, 200)}...`;

const cardInit = (text: string) =>
	text.length > 200 ? { text: ellipsis(text), button: "show more" } : { text };

const handleClick = (
	props: Props,
	card: Card,
	setCard: (card: Card) => void
) => {
	if (card.button === "show more") {
		setCard({
			text: props.info,
			button: "show less",
		});
	} else {
		setCard({
			text: ellipsis(props.info),
			button: "show more",
		});
	}
};

const Tour = (props: Props) => {
	const [card, setCard] = useState({
		...cardInit(props.info),
	});

	return (
		<>
			<div className="max-w-[40rem] shadow-lg rounded transition hover:shadow-black/20">
				<img
					className="object-cover min-w-full rounded-t h-96 justify-self-center"
					src={props.image}
					alt="Tour Image"
				/>
				<div className="p-4 mt-4 space-y-4">
					<div className="flex items-center justify-between gap-6">
						<span className="font-bold capitalize">{props.name}</span>
						<span className="p-1 text-sm font-bold text-blue-500 bg-blue-100 rounded">
							${props.price}
						</span>
					</div>
					<p>
						{card.text}
						{card.button && (
							<button
								className="inline-block ml-2 text-blue-500 capitalize"
								onClick={() => handleClick(props, card, setCard)}>
								{card.button}
							</button>
						)}
					</p>
					{props.children}
				</div>
			</div>
		</>
	);
};

const Project = () => {
	const [list, setList] = useState<Props[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetch(DATA_URL)
			.then(res => res.json())
			.then(list => {
				setList(list);
				setIsLoading(false);
			});
	}, []);

	if (isLoading)
		return <h1 className="text-4xl font-bold capitalize">loading...</h1>;

	return (
		<>
			<h1 className="relative py-4 mb-12 text-4xl font-bold capitalize after:w-2/4 after:h-1 after:absolute after:bottom-0 after:left-2/4 after:-translate-x-1/2 after:bg-blue-500">
				our tours
			</h1>
			<div className="space-y-10">
				{list.map(t => (
					<Tour key={t.id} {...t}>
						<button
							className="block p-1 mx-auto text-sm text-red-500 uppercase border-[0.05rem] border-red-500 border-solid rounded w-fit"
							onClick={() => setList(list.filter(c => c.id !== t.id))}>
							not interested
						</button>
					</Tour>
				))}
			</div>
		</>
	);
};

export default Project;
