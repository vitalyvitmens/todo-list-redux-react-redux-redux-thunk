export const initialTodoFormState = {
	inputValue: '',
}

export const todoFormReducer = (state = initialTodoFormState, action) => {
	switch (action.type) {
		case 'iNPUT_VALUE': {
			return {
				...state,
				inputValue: state.age + action.payload,
			}
		}
		default:
			return state
	}
}
