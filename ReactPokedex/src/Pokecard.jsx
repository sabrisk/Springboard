import "./Pokecard.css";

export default function Pokecard({ name, type, base_experience }) {
	return (
		<div className="item">
			<span>{name}</span>
			<span>{}</span>
			<span>{type}</span>
			<span>{base_experience}</span>
		</div>
	);
}
