import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import ActionButton from "../../components/ActionButton/ActionButton";

import { buildSpacecraft } from "../spacecrafts/spacecraftsSlice";

import styles from "./ConstructionForm.module.css";

const validate = (values) => {
	const errors = {};
	if (!values.name) {
		errors.name = "Required";
	}
	if (!values.capacity) {
		errors.capacity = "Required";
	}
	if (!values.description) {
		errors.description = "Required";
	}

	return errors;
};

const ConstructionForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

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
			dispatch(
				buildSpacecraft({
					...values,
					capacity: parseInt(values.capacity),
				})
			);
			resetForm();
			navigate("/spacecrafts");
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
					<textarea
						className={getInputClass("description")}
						id="description"
						name="description"
						placeholder="Description"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.description}
						autoComplete="off"
						rows="6"
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
				</div>
			</form>
			<div className={styles.pageFooter}>
				<div className={styles.validation}>
					{formik.touched.name && formik.errors.name ? (
						<div>Name {formik.errors.name}</div>
					) : null}
					{formik.touched.capacity && formik.errors.capacity ? (
						<div>Capacity {formik.errors.capacity}</div>
					) : null}
					{formik.touched.description && formik.errors.description ? (
						<div>Description {formik.errors.description}</div>
					) : null}
				</div>

				<div className={styles.build}>
					<ActionButton
						name="Build"
						emoji="🏗️"
						actionFunc={formik.submitForm}
						isSubmit={true}
					/>
				</div>
			</div>
		</>
	);
};

export default ConstructionForm;
