import "./Card.css";

const Card = ({ img, transformStyle }) => {
	return (
		<>
			{img && (
				<img src={img} alt="" className="card" style={transformStyle} />
			)}
		</>
	);
};

export default Card;
