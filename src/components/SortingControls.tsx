import { SortBy } from '../lib/types'

type SortingProps = {
	sortBy: SortBy
	onClick: (newSort: SortBy) => void
}

type SortingButtonProps = {
	onClick: () => void
	isActive: boolean
	children: React.ReactNode
}

export default function Sorting({ onClick, sortBy }: SortingProps) {
	return (
		<section className='sorting'>
			<i className='fa-solid fa-arrow-down-short-wide'></i>

			<SortingButton
				onClick={() => onClick('relevant')}
				isActive={sortBy === 'relevant'}
			>
				Relevant
			</SortingButton>
			<SortingButton
				onClick={() => onClick('recent')}
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
