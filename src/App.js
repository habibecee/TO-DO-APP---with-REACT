import React, { useState } from "react";
import "./App.css";

function App() {
	const [toDoText, setToDoText] = useState("");
	const [todos, setTodos] = useState([]);
	const [isEdit, setIsEdit] = useState(false);
	const [willUpdateToDo, setWillUpdateToDo] = useState("");
	const deleteToDo = (id) => {
		console.log(id);
		const filteredToDos = todos.filter((item) => item.id !== id);
		setTodos(filteredToDos);
	};

	const changeIsDone = (id) => {
		console.log(id);
		const searchedTodo = todos.find((item) => item.id === id);
		const updateToDo = {
			...searchedTodo,
			isDone: !searchedTodo.isDone,
		};

		const filteredToDos = todos.filter((item) => item.id !== id);
		setTodos([updateToDo, ...filteredToDos]);
		console.log(filteredToDos);
	};

	const handleSubmit = (event) => {
		event.preventDefault(); /* EVENT'in default değeri başka sayfaya yönlendirmektir (formdaki event değeri) prevent.default diyerek bu önlenir */

		if (toDoText === "") {
			alert("This place can't be empty!!!");
			return;
		}

		const hasToDo = todos.find((item) => item.text === toDoText);
		console.log(hasToDo);

		if (hasToDo !== undefined) {
			alert("You have the item that you want to add already!");
			return;
		}

		if (isEdit === true) {
			console.log(willUpdateToDo, "To Do Item güncellendi");
			const searchedTodo = todos.find((item) => item.id === willUpdateToDo);
			const updatedToDo = {
				...searchedTodo,
				text: toDoText,
			};
			const filteredToDos = todos.filter((item) => item.id !== willUpdateToDo);
			setTodos([...filteredToDos, updatedToDo]);
			setToDoText("");
			setIsEdit(false);
			setWillUpdateToDo("");
		} else {
			const newToDo = {
				id: new Date().getTime(),
				isDone: false,
				text: toDoText,
				date: new Date(),
			};
			setTodos([
				...todos,
				newToDo,
			]); /* new todoyu ekle, ...todos ise daha önceki tüm todo değerlerini de ekle demektir */
			setToDoText("");
			console.log(newToDo);
		}
	};
	return (
		<body>
			<div className="container">
				<h1 className="app-name text-center my-5"> TO DO APP </h1>
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

				{todos.length <= 0 ? (
					<p className="any-text text-center my-5"> YOU HAVE ANY ITEMS YET. </p>
				) : (
					<>
						<div className="list-div">
							{todos.map((item) => (
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
							))}
						</div>
					</>
				)}
			</div>
		</body>
	);
}

export default App;
