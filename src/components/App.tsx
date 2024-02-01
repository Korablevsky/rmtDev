import { useState } from 'react'
import { useJobItems } from '../lib/hooks'
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
	const [JobsItems, isLoading] = useJobItems(searchText)

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
						<ResultsCount />
						<Sorting />
					</SidebarTop>

					<JobList jobItems={JobsItems} isLoading={isLoading} />

					<Pagination />
				</Sidebar>

				<JobItemContent />
			</Container>

			<Footer />
		</>
	)
}

export default App
