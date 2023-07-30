import React from 'react'
import { TodoForm, TodoList, Loader } from './components'
import styles from './app.module.css'

import { useTodo } from './hooks/useTodos'

export const App = () => {
	const { loading: isLoading } = useTodo()

	return (
		<div className={styles.container}>
			<TodoForm />
			{isLoading ? <Loader /> : <TodoList />}
		</div>
	)
}
