import React, { useState } from "react";
import "./App.css";

function App() {
	const [toDoText, setToDoText] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault(); /* EVENT'in default değeri başka sayfaya yönlendirmektir (formdaki event değeri) prevent.default diyerek bu önlenir */

		if (toDoText === "") {
			alert("This place can't be empty!!!");
			return;
		}

		console.log(toDoText);
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
						<button className="btn-add btn" type="submit">
							ADD ITEM
						</button>
					</div>
				</form>
			</div>
		</body>
	);
}

export default App;
