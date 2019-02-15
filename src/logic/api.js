import 'isomorphic-fetch'

export const getCards = async (boardId) => {
	const response = await fetch(`http://localhost:8000/boards/${boardId}`)

	if (response.status === 200) {
		return response.json()
	}
	return 'Something is wrong'
}

export const updateCardPosition = async (cardId, x_position, y_position) => {
	const data = {
		x_position,
		y_position,
	}
	const response = await fetch(
		`http://localhost:8000/cards/${cardId}/`,
		{
			method: 'PATCH',
			body: JSON.stringify(data),
			headers: {
				'X-CSRFTOKEN': 'arh1v3nBt4K0kyuyEE359BBMlkJ0oGGUkviA2fFHFW8xt0iX1ZlNY9xvXn7KoRpw',
			}
		},
	)
	if (response.status !== 200) {
		return "Something is wrong"
	}
}

export const login = async (data) => {
	const response = await fetch(
		`http://localhost:8000/api-auth/login/`,
		{
			method: 'POST',
			body: JSON.stringify(data),
		}
	)

	if (response.status === 201) {
		return response.json()
	}
}
