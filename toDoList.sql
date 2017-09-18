-- Database name: ToDoList
CREATE TABLE list (
	id SERIAL PRIMARY KEY,
	item VARCHAR(50),
	complete BOOLEAN DEFAULT true,
	);