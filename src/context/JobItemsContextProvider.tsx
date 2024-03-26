import { createContext, useCallback, useMemo, useState } from 'react'
import { RESULTS_PER_PAGE } from '../lib/constants'
import { useSearchQuery, useSearchTextContext } from '../lib/hooks'
import { JobItem, PageDirection, SortBy } from '../lib/types'

export type JobItemsContext = {
	jobItems: JobItem[] | undefined
	jobsItemsSortedAndSliced: JobItem[]
	isLoading: boolean
	totalNumberOfPages: number
	totalNumberOfResults: number
	currentPage: number
	sortBy: SortBy
	handleChangePage: (direction: PageDirection) => void
	handleChangesortBy: (newSort: SortBy) => void
}

export const JobItemsContext = createContext<JobItemsContext | null>(null)

export default function JobItemsContextProvider({
	children,
}: {
	children: React.ReactNode
}) {
	// dependency on other context
	const { debouncedSearchText } = useSearchTextContext()

	// state
	const { jobItems, isLoading } = useSearchQuery(debouncedSearchText)
	const [currentPage, setCurrentPage] = useState(1)
	const [sortBy, setSortBy] = useState<SortBy>('relevant')

	// derived / computed state
	const totalNumberOfResults = jobItems?.length || 0
	const totalNumberOfPages = totalNumberOfResults / RESULTS_PER_PAGE
	const jobItemsSorted = useMemo(
		() =>
			[...(jobItems || [])].sort((a, b) => {
				if (sortBy === 'relevant') {
					return b.relevanceScore - a.relevanceScore
				} else {
					return a.daysAgo - b.daysAgo
				}
			}),
		[jobItems, sortBy]
	)

	const jobsItemsSortedAndSliced = useMemo(
		() =>
			jobItemsSorted.slice(
				currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
				currentPage * RESULTS_PER_PAGE
			) || [],
		[jobItemsSorted, currentPage]
	)

	// event handlers / actions

	const handleChangePage = useCallback((direction: PageDirection) => {
		if (direction === 'next') {
			setCurrentPage(prev => prev + 1)
		} else if (direction === 'previous') {
			setCurrentPage(prev => prev - 1)
		}
	}, [])

	const handleChangesortBy = useCallback((newSort: SortBy) => {
		setCurrentPage(1)
		setSortBy(newSort)
	}, [])

	const contextValue = useMemo(
		() => ({
			jobItems,
			jobsItemsSortedAndSliced,
			isLoading,
			totalNumberOfPages,
			totalNumberOfResults,
			currentPage,
			sortBy,
			handleChangePage,
			handleChangesortBy,
		}),
		[
			jobItems,
			jobsItemsSortedAndSliced,
			isLoading,
			totalNumberOfPages,
			totalNumberOfResults,
			currentPage,
			sortBy,
		]
	)

	return (
		<JobItemsContext.Provider value={contextValue}>
			{children}
		</JobItemsContext.Provider>
	)
}
