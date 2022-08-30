import React, { useState, useEffect } from "react";
import "./App.css";
import ToDo from "./ToDo";
import Form from "./Form";

function App() {
	const [toDoText, setToDoText] = useState("");
	const [todos, setTodos] = useState([]);
	const [isEdit, setIsEdit] = useState(false);
	const [willUpdateToDo, setWillUpdateToDo] = useState("");

	useEffect(() => {
		const todosFromLocalStorage = localStorage.getItem("todos");
		console.log(todosFromLocalStorage);

		if (todosFromLocalStorage === null) {
			localStorage.setItem("todos", JSON.stringify([]));
		} else {
			setTodos(JSON.parse(todosFromLocalStorage));
		}
	}, []);

	const deleteToDo = (id) => {
		console.log(id);
		const filteredToDos = todos.filter((item) => item.id !== id);
		setTodos(filteredToDos);
		localStorage.setItem("todos", JSON.stringify(filteredToDos));
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
		localStorage.setItem("todos", JSON.stringify(filteredToDos));
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
			localStorage.setItem("todos", JSON.stringify);
			setToDoText("");
			setIsEdit(false);
			setWillUpdateToDo("");
		} else {
			const newToDo = {
				id: new Date().getTime(),
				isDone: true,
				text: toDoText,
				date: new Date(),
			};
			setTodos([
				...todos,
				newToDo,
			]); /* new todoyu ekle, ...todos ise daha önceki tüm todo değerlerini de ekle demektir */
			localStorage.setItem("todos", JSON.stringify([...todos, newToDo]));
			setToDoText("");
			console.log(newToDo);
		}
	};
	return (
		<div className="container">
			<h1 className="app-name text-center my-5"> TO DO APP </h1>

			<Form
				handleSubmit={handleSubmit}
				toDoText={toDoText}
				setToDoText={setToDoText}
				isEdit={isEdit}
			/>

			{todos.length <= 0 ? (
				<p className="any-text text-center my-5"> YOU HAVE ANY ITEMS HERE. </p>
			) : (
				<>
					<div className="list-div">
						{todos.map((item) => (
							<ToDo
								item={item}
								deleteToDo={deleteToDo}
								setIsEdit={setIsEdit}
								setWillUpdateToDo={setWillUpdateToDo}
								setToDoText={setToDoText}
								changeIsDone={changeIsDone}
							/>
						))}
					</div>
				</>
			)}
		</div>
	);
}

export default App;
