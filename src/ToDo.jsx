import React from "react";

const ToDo = (props) => {
	const {
		item,
		deleteToDo,
		setIsEdit,
		setWillUpdateToDo,
		setToDoText,
		changeIsDone,
	} = props;
	return (
		<div
			className={`items-div alert alert-${
				item.isDone === true ? "warning" : "secondary"
			} d-flex justify-content-between align-items-center`}
			role="alert"
		>
			{/* {isEdit === true ? <input /> : <p> {item.text} </p>} */}
			<p> {item.text} </p>
			<div>
				<button
					className="btn btn-sm btn-danger"
					onClick={() => deleteToDo(item.id)}
				>
					<i className="fa-solid fa-trash"></i>
				</button>
				<button
					className="edit-btn btn btn-sm btn-secondary"
					onClick={() => {
						setIsEdit(true);
						setWillUpdateToDo(item.id);
						setToDoText(item.text);
					}}
				>
					<i className="fa-solid fa-pen"></i>
				</button>
				<button
					onClick={() => changeIsDone(item.id)}
					className={`done-btn btn btn-sm btn-${
						item.isDone === true ? "success" : "danger"
					}`}
				>
					{item.isDone === false ? (
						<i className="fa-solid fa-x"></i>
					) : (
						<i className="fa-solid fa-circle-check"></i>
					)}
				</button>
			</div>
		</div>
	);
};

export default ToDo;
