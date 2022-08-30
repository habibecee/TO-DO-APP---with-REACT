import React from "react";

const Form = (props) => {
	const { handleSubmit, toDoText, setToDoText, isEdit } = props;

	return (
		<form onSubmit={handleSubmit}>
			<div className="input-group">
				<input
					value={toDoText}
					type="text"
					className="todoapp-input form-control"
					placeholder="Please Write Your To Do List Items"
					onChange={(event) => setToDoText(event.target.value)}
				/>
				<button
					className={`btn-add btn btn-${
						isEdit === true ? "success" : "default"
					}`}
					type="submit"
				>
					{isEdit === true ? "Save Item" : "Add New Item"}
				</button>
			</div>
		</form>
	);
};

export default Form;
