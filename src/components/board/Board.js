import React, { useState, useEffect } from 'react'
import { get } from 'lodash'
import { DropTarget } from 'react-dnd'
import { getCards } from '../../logic/api'
import Card from './Card'
import { CARD } from '../constants/constants'
import styles from './styles.scss'


const collect = connect => ({
	connectDropTarget: connect.dropTarget(),
})

const boardTarget = {
	drop: (props, monitor) => {
		const card = monitor.getItem()
		const item = monitor.getInitialClientOffset()
		const delta = monitor.getSourceClientOffset()
		const left = delta.x
		const top = delta.y
		props.useSetCard(card.card.id, left, top)
	},
}

const Board = ({
	cards,
	setCards,
	board,
	setBoard,
	useSetCard,
	...props
}) => {

	const [counter, setCounter] = useState(0)

	const getCardsForBoard = async () => setBoard(await getCards(1))

	useEffect(() => {
		if (get(board, ['cards', 'length']) && cards.length === 0) {
			setCards(board.cards)
		}
		if (cards.length === 0) {
			getCardsForBoard()
			setCounter(counter + 1)
		}
	}, [board, cards])

	const renderCards = () => cards.map(card => (
		<Card card={card} />
	))

	const { connectDropTarget } = props

	return connectDropTarget(
		<div className={styles.boardBackground}>
			{renderCards()}
		</div>,

	)
}

export default DropTarget(CARD, boardTarget, collect)(Board)
