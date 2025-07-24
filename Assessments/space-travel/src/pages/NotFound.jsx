import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = () => {
	return (
		<div className={styles.notFound}>
			<h2>Page not found!</h2>
			<p>
				Looks like you're lost in space. Click the link below to find
				your way home.
			</p>
			<p>
				Go to the <Link to="/">Homepage</Link>.
			</p>
		</div>
	);
};

export default NotFound;
