import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.tsx'
import ActiveIdContextProvider from './context/ActiveIdContextProvider.tsx'
import BookmarksContextProvider from './context/BookmarksContextProvider.tsx'
import JobItemsContextProvider from './context/JobItemsContextProvider.tsx'
import SearchTextContextProvider from './context/searchTextContextProvider.tsx'
import './index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<BookmarksContextProvider>
				<ActiveIdContextProvider>
					<SearchTextContextProvider>
						<JobItemsContextProvider>
							<App />
						</JobItemsContextProvider>
					</SearchTextContextProvider>
				</ActiveIdContextProvider>
			</BookmarksContextProvider>
		</QueryClientProvider>
	</React.StrictMode>
)
