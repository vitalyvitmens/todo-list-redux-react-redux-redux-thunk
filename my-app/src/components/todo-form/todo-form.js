import { useEffect, useState } from 'react'
import styles from './todo-form.module.css'
import { useTodo } from '../../hooks/useTodos'

export const TodoForm = () => {
	const [inputValue, setInputValue] = useState('')

	const { input, requestAddTodo, edit, requestUpdateTodo, search, setSearch, inputCurrent } =
		useTodo()

	useEffect(() => {
		setInputValue(inputCurrent)
	}, [inputCurrent])

	const handleSubmit = (e) => {
		e.preventDefault()
		input.current = inputValue
		if (edit?.id) {
			requestUpdateTodo(edit.id)
		} else {
			requestAddTodo()
		}
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<h2>My To-Do List</h2>
			<input
				type="text"
				value={search}
				name="search-todo"
				placeholder="Найти задачу..."
				onChange={({ target }) => setSearch(target.value)}
				className="input-field"
			/>
			<p></p>
			<input
				type="text"
				value={inputValue}
				name="todo-input"
				placeholder="Новая задача"
				onChange={(e) => setInputValue(e.target.value)}
			/>
			<button
				disabled={inputValue === '' || search}
				className={styles.btnBlue}
				type="submit"
			>
				{edit ? 'Обновить' : 'Добавить'}
			</button>
		</form>
	)
}
