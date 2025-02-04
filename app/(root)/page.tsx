import BookList from '@/components/book-list'
import BookOverview from '@/components/book-overview'
import { sampleBooks } from '@/constants'
import { Book } from 'lucide-react'

const Home = () => {
	return (
		<>
			<BookOverview {...sampleBooks[0]}/>
			<BookList title='Popular Books' books={sampleBooks} containerClassName="mt-28"/>
		</>
	)
}

export default Home
