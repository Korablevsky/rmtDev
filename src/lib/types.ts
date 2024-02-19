export type JobItem = {
	id: number
	badgeLetters: string
	title: string
	company: string
	daysAgo: number
	relevanceScore: number
}

export type JobItemExpanded = JobItem & {
	description: string
	qualifications: string[]
	reviews: string[]
	duration: string
	location: string
	salary: string
	coverImgURL: string
	comanyURL: string
}

export type PageDirection = 'next' | 'previous'
export type SortBy = 'relevant' | 'recent'
