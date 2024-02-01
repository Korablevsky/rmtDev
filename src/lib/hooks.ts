import { useEffect, useState } from 'react'
import { BASE_API_URL } from './constants'
import { JobItem, JobItemExpanded } from './types'

export function useActiveId() {
	const [activeid, setActiveid] = useState<number | null>(null)

	useEffect(() => {
		const handleHashChange = () => {
			const id = +window.location.hash.slice(1)
			setActiveid(id)
		}
		handleHashChange()

		window.addEventListener('hashchange', handleHashChange)

		return () => window.removeEventListener('hashchange', handleHashChange)
	}, [])

	return activeid
}

export function useJobItems(searchText: string) {
	const [jobItems, setJobItems] = useState<JobItem[]>([])
	const [isLoading, setIsLoading] = useState(false)

	const JobsItemsSliced = jobItems.slice(0, 7)

	useEffect(() => {
		if (!searchText) return

		const fetchData = async () => {
			setIsLoading(true)
			const response = await fetch(`${BASE_API_URL}?search=${searchText}`)

			const data = await response.json()
			setIsLoading(false)

			setJobItems(data.jobItems)
		}
		fetchData()
	}, [searchText])

	return [JobsItemsSliced, isLoading] as const
}

export function useJobItem(id: number | null) {
	const [jobItem, setJobItem] = useState<JobItemExpanded | null>(null)

	useEffect(() => {
		if (!id) return

		const fetchData = async () => {
			const response = await fetch(`${BASE_API_URL}/${id}`)
			const data = await response.json()
			setJobItem(data.jobItem)
		}
		fetchData()
	}, [id])
	return jobItem 
}
