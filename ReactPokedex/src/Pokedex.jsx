import Pokecard from "./Pokecard";
import "./Pokedex.css";

export default function Pokedex({ allPokemon }) {
	return (
		<div className="container">
			{allPokemon.map((item) => {
				return <Pokecard className="item" key={item.id} {...item} />;
			})}
		</div>
	);
}
