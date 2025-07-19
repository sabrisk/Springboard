import { useFormik } from "formik";
import ActionButton from "../../components/ActionButton/ActionButton";
import { useDispatch } from "react-redux";
import { buildSpacecraft } from "../spacecrafts/spacecraftsSlice";

import styles from "./ConstructionForm.module.css";
// import { v4 as uuid } from "uuid";

const validate = (values) => {
	const errors = {};
	// if (!values.name) {
	// 	errors.name = "Required";
	// }
	// if (!values.qty) {
	// 	errors.qty = "Required";
	// }
	// if (!values.purpose) {
	// 	errors.purpose = "Required";
	// }
	// if (values.terms === false) {
	// 	errors.terms = "Required";
	// }

	return errors;
};

const ConstructionForm = () => {
	const dispatch = useDispatch();
	const INITIAL_STATE = {
		name: "",
		capacity: "",
		description: "",
		pictureUrl: "",
	};

	const formik = useFormik({
		initialValues: INITIAL_STATE,
		validate,
		onSubmit: (values, { resetForm }) => {
			// addItem({ ...values, id: uuid() });
			console.log(values);
			dispatch(buildSpacecraft(values));
			resetForm();

			//dispatch here?
		},
	});

	const getInputClass = (field) =>
		formik.touched[field] && formik.errors[field] ? "error" : "";

	return (
		<>
			<form
				className={styles.constructionForm}
				onSubmit={formik.handleSubmit}
			>
				{/* <form onSubmit={formik.handleSubmit} className="ItemForm"> */}
				<div className={styles.formBody}>
					<input
						className={getInputClass("name")}
						id="name"
						name="name"
						type="text"
						placeholder="Name"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.name}
						autoComplete="off"
					/>
					<input
						className={getInputClass("capacity")}
						id="capacity"
						name="capacity"
						type="text"
						placeholder="Capacity"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.capacity}
						autoComplete="off"
					/>
					<input
						className={getInputClass("description")}
						id="description"
						name="description"
						type="text"
						placeholder="Description"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.description}
						autoComplete="off"
					/>
					<input
						className={getInputClass("pictureUrl")}
						id="pictureUrl"
						name="pictureUrl"
						type="text"
						placeholder="Picture URL"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.pictureUrl}
						autoComplete="off"
					/>
					{/* <button type="submit" disabled={!formik.isValid || !formik.dirty}>
				Add
			</button> */}
				</div>
			</form>
			<div className={styles.pageFooter}>
				<ActionButton
					path="/spacecrafts"
					// actionFunc={formik.submitForm}
					name="Build"
					emoji="🏗️"
					isSubmit={true}
				/>
			</div>
		</>
	);
};

export default ConstructionForm;
