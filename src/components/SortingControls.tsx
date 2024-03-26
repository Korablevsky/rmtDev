import { useJobItemsContext } from '../lib/hooks'

type SortingButtonProps = {
	onClick: () => void
	isActive: boolean
	children: React.ReactNode
}

export default function Sorting() {
	const { handleChangesortBy, sortBy } = useJobItemsContext()
	return (
		<section className='sorting'>
			<i className='fa-solid fa-arrow-down-short-wide'></i>

			<SortingButton
				onClick={() => handleChangesortBy('relevant')}
				isActive={sortBy === 'relevant'}
			>
				Relevant
			</SortingButton>
			<SortingButton
				onClick={() => handleChangesortBy('recent')}
				isActive={sortBy === 'recent'}
			>
				Recent
			</SortingButton>
		</section>
	)
}

function SortingButton({ children, onClick, isActive }: SortingButtonProps) {
	return (
		<button
			onClick={onClick}
			className={`sorting__button sorting__button--recent ${
				isActive ? 'sorting__button--active' : ''
			}`}
		>
			{children}
		</button>
	)
}
