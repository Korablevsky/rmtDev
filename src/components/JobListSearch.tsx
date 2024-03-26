import { useJobItemsContext } from '../lib/hooks'
import JobList from './JobList'

export default function JobListSearch() {
	const { jobsItemsSortedAndSliced, isLoading } = useJobItemsContext()
	
	return <JobList jobItems={jobsItemsSortedAndSliced} isLoading={isLoading} />
}
