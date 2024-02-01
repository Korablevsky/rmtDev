import { JobItem } from '../lib/types'
import JobListItem from './JobListItem'
import Spinner from './Spinner'

type JoblistProps = {
	jobItems: JobItem[]
	isLoading: boolean
}

export function JobList({ jobItems, isLoading }: JoblistProps) {
	return (
		<ul className='job-list'>
			{isLoading ? (
				<Spinner />
			) : (
				jobItems.map(jobItem => <JobListItem key={jobItem.id} jobItem={jobItem} />)
			)}
		</ul>
	)
}

export default JobList
