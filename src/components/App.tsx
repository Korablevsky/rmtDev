import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { RESULTS_PER_PAGE } from '../lib/constants'
import { useDebounce, useJobItems } from '../lib/hooks'
import { SortBy } from '../lib/types'
import Background from './Background'
import BookmarksButton from './BookmarksButton'
import Container from './Container'
import Footer from './Footer'
import Header, { HeaderTop } from './Header'
import JobItemContent from './JobItemContent'
import JobList from './JobList'
import Logo from './Logo'
import Pagination from './PaginationControls'
import ResultsCount from './ResultsCount'
import SearchForm from './SearchForm'
import Sidebar, { SidebarTop } from './Sidebar'
import Sorting from './SortingControls'

function App() {
	const [searchText, setSearchText] = useState('')
	const debouncedSearchText = useDebounce(searchText, 250)
	const { jobItems, isLoading } = useJobItems(debouncedSearchText)
	const [currentPage, setCurrentPage] = useState(1)
	const [sortBy, setSortBy] = useState<SortBy>('relevant')

	// derived / computed state
	const totalNumberOfResults = jobItems?.length || 0
	const totalNumberOfPages = totalNumberOfResults / RESULTS_PER_PAGE
	const jobItemsSorted =
		jobItems?.sort((a, b) => {
			if (sortBy === 'relevant') {
				return b.relevanceScore - a.relevanceScore
			} else {
				return a.daysAgo - b.daysAgo
			}
		}) || []
	const jobsItemsSortedAndSliced =
		jobItemsSorted.slice(
			currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
			currentPage * RESULTS_PER_PAGE
		) || []

	// event handlers / actions
	const handleChangePage = (direction: 'next' | 'previous') => {
		if (direction === 'next') {
			setCurrentPage(prev => prev + 1)
		} else if (direction === 'previous') {
			setCurrentPage(prev => prev - 1)
		}
	}
	const handleChangesortBy = (newSort: SortBy) => {
		setCurrentPage(1)
		setSortBy(newSort)
	}

	return (
		<>
			<Background />

			<Header>
				<HeaderTop>
					<Logo />
					<BookmarksButton />
				</HeaderTop>

				<SearchForm searchText={searchText} onSearchText={setSearchText} />
			</Header>

			<Container>
				<Sidebar>
					<SidebarTop>
						<ResultsCount totalNumberOfResults={totalNumberOfResults} />
						<Sorting sortBy={sortBy} onClick={handleChangesortBy} />
					</SidebarTop>

					<JobList jobItems={jobsItemsSortedAndSliced} isLoading={isLoading} />

					<Pagination
						currentPage={currentPage}
						totalNumberOfPages={totalNumberOfPages}
						onClick={handleChangePage}
					/>
				</Sidebar>

				<JobItemContent />
			</Container>

			<Footer />

			<Toaster position='top-right' />
		</>
	)
}

export default App
