import React, { useContext, useState, useRef, useEffect } from 'react'

const TodoContext = React.createContext()

export const useTodo = () => {
	return useContext(TodoContext)
}

export const TodoProvider = ({ children }) => {
	const input = useRef('')
	let inputCurrent = input.current
	const [loading, setLoading] = useState(false)
	const [refresh, setRefresh] = useState(false)
	const [todosServer, setTodos] = useState([])
	const [edit, setEdit] = useState(false)
	const [search, setSearch] = useState('')
	const [sort, setSort] = useState(false)

	const handleRefresh = () => {
		setRefresh((prev) => !prev)
	}

	const todos = search
		? todosServer.filter((el) =>
				el.title.toLowerCase().includes(search.toLowerCase())
		  )
		: todosServer
 
	const sortedTodos = sort
		? todos.sort(function (a, b) {
				return a.title.localeCompare(b.title)
		  })
		: todos.sort((a, b) => a.id - b.id)

	useEffect(() => {
		setLoading(true)
		fetch('http://localhost:8204/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodo) => {
				setTodos(loadedTodo)
			})
			.finally(() => setLoading(false))
	}, [refresh])

	const requestAddTodo = (todo) => {
		if (todo !== '') {
			setLoading(true)
			fetch('http://localhost:8204/todos', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				body: JSON.stringify({
					title: input.current,
					completed: false,
				}),
			})
				.then(() => {
					handleRefresh()
				})
				.finally(() => {
					setLoading(false)
					input.current = ''
				})
		}
	}

	const requestUpdateTodo = (id) => {
		setLoading(true)
		fetch(`http://localhost:8204/todos/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: input.current,
				completed: false,
			}),
		})
			.then(() => {
				handleRefresh()
			})
			.finally(() => {
				setLoading(false)
				input.current = ''
			})
	}

	const requestDeleteTodo = (id) => {
		fetch(`http://localhost:8204/todos/${id}`, {
			method: 'DELETE',
		}).finally(() => handleRefresh())
	}

	const requestUpdateCompletedTodo = (id, completed) => {
		console.log(completed)
		fetch(`http://localhost:8204/todos/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				completed: completed,
			}),
		}).finally(() => {
			handleRefresh()
		})
	}

	return (
		<TodoContext.Provider
			value={{
				requestAddTodo,
				loading,
				requestUpdateTodo,
				input,
				sortedTodos,
				requestUpdateCompletedTodo,
				requestDeleteTodo,
				handleRefresh,
				setEdit,
				edit,
				search,
				setSearch,
				setSort,
				sort,
				inputCurrent,
			}}
		>
			{children}
		</TodoContext.Provider>
	)
}
