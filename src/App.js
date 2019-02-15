import React, { useState } from 'react'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import styles from './App.css'
import { updateCardPosition, login } from './logic/api'

import Board from './components/board/Board'
import DragLayer from './components/board/DragLayer'

const App = () => {
	const [board, setBoard] = useState({})
	const [cards, setCards] = useState([])

	const [loginFormData, setLoginFormData] = useState({})

	const handleChange = (e, field) => {
		e.preventDefault()
		setLoginFormData({
			...loginFormData,
			[field]: e.target.value,
		})
	}

	const handleLogin = () => {
		login(loginFormData)
	}

	const useSetCard = (id, left, top) => {
		setCards(cards.map((card) => {
			if (card.id === id) {
				return {
					...card,
					id,
					x_position: left,
					y_position: top,
				}
			}
			updateCardPosition(card.id, left, top)
			return card
		}))
	}
	return (
		<div className={styles.App}>
			<Board
				board={board}
				setBoard={setBoard}
				cards={cards}
				setCards={setCards}
				useSetCard={useSetCard}
			/>
			<DragLayer
				useSetCard={useSetCard}
			/>
			<div>
				<input type="text" value={loginFormData.username} onChange={e => handleChange(e, 'username')} />
				<input type="password" value={loginFormData.password} onChange={e => handleChange(e, 'password')} />
				<button type="submit" onClick={handleLogin} />
			</div>
		</div>
	)
}

export default DragDropContext(HTML5Backend)(App)
