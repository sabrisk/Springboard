import { useFormik } from "formik";
import { v4 as uuid } from "uuid";

const validate = (values) => {
	const errors = {};
	if (!values.name) {
		errors.name = "Required";
	}
	if (!values.qty) {
		errors.qty = "Required";
	}
	if (!values.purpose) {
		errors.purpose = "Required";
	}
	if (values.terms === false) {
		errors.terms = "Required";
	}

	return errors;
};

const ItemForm = ({ addItem }) => {
	const INITIAL_STATE = { name: "", qty: "", purpose: "", terms: false };

	const formik = useFormik({
		initialValues: INITIAL_STATE,
		validate,
		onSubmit: (values, { resetForm }) => {
			addItem({ ...values, id: uuid() });
			resetForm();
		},
	});

	const getInputClass = (field) =>
		formik.touched[field] && formik.errors[field] ? "error" : "";

	return (
		<form onSubmit={formik.handleSubmit} className="ItemForm">
			<h2>Add an Item to the Inventory</h2>
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
				className={getInputClass("qty")}
				id="qty"
				name="qty"
				type="text"
				placeholder="Quantity"
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				value={formik.values.qty}
				autoComplete="off"
			/>
			<input
				className={getInputClass("purpose")}
				id="purpose"
				name="purpose"
				type="text"
				placeholder="Purpose"
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				value={formik.values.purpose}
				autoComplete="off"
			/>
			<div className={`checkbox-container ${getInputClass("terms")}`}>
				<label className="checkbox-label">
					<input
						id="terms"
						name="terms"
						type="checkbox"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						checked={formik.values.terms}
					/>
					<span className="label-text">Agree to Terms</span>
				</label>
			</div>
			<button type="submit" disabled={!formik.isValid || !formik.dirty}>
				Add
			</button>
		</form>
	);
};

export default ItemForm;
