import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import ActionButton from "../../components/ActionButton/ActionButton";

import { buildSpacecraft } from "../spacecrafts/spacecraftsSlice";

import styles from "./ConstructionForm.module.css";

const validate = (values) => {
	const errors = {};
	if (!values.name) {
		errors.name = "required";
	}
	if (
		values.capacity === "" ||
		values.capacity === null ||
		values.capacity === undefined
	) {
		errors.capacity = "required";
	} else {
		const parsed = parseInt(values.capacity, 10);

		if (isNaN(parsed)) {
			errors.capacity = "must be a number";
		} else if (parsed < 0) {
			errors.capacity = "must be zero or greater";
		}
	}

	if (!values.description) {
		errors.description = "required";
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
						type="number"
						placeholder="Capacity"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.capacity}
						autoComplete="off"
						step="1"
						min="0"
						onKeyDown={(e) => {
							if ([".", ",", "e"].includes(e.key)) {
								e.preventDefault();
							}
						}}
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
