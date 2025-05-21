import "./Pokecard.css";

export default function Pokecard({ id, name, type, base_experience }) {
	const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
	return (
		<div className="item">
			<span className="name">{name}</span>
			<img src={image} alt="" />
			<div className="details">
				<p>Type: {type}</p>
				<p>EXP: {base_experience}</p>
			</div>
		</div>
	);
}
