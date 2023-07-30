import React, { useState } from 'react'
import styles from './todo-list.module.css'

import { useTodo } from '../../hooks/useTodos'

export const Todo = ({ id, title, completed }) => {
	const { requestUpdateCompletedTodo, requestDeleteTodo, input, setEdit } =
		useTodo()

	const [isUpdating, setisUpdating] = useState(false)

	const handleEdit = () => {
		setisUpdating((prev) => !prev)
		input.current = !isUpdating ? title : ''
		setEdit(!isUpdating ? { id } : null)
	}

	return (
		<ol key={id}>
			<span>{id}</span>
			<div
				className={completed ? styles.todoLineThrough : styles.todo}
				onClick={() => {
					requestUpdateCompletedTodo(id, !completed)
				}}
			>
				{title}
			</div>
			<button
				className={isUpdating ? styles.updateBtnYellow : styles.updateBtnGreen}
				onClick={handleEdit}
			>
				✎
			</button>
			<button
				className={styles.deleteBtn}
				onClick={() => requestDeleteTodo(id)}
			>
				X
			</button>
		</ol>
	)
}
