import { auth } from '@/auth'
import BookList from '@/components/book-list'
import BookOverview from '@/components/book-overview'
import { db } from '@/database/drizzle'
import { books, users } from '@/database/schema'
import { desc } from 'drizzle-orm'

const Home = async () => {

	const session = await auth();
	

	const latestBooks = (await db.select().from(books).limit(10).orderBy(desc(books.createdAt))) as Book[]

	const result = await db.select().from(users)
	console.log(JSON.stringify(result))
	return (
		<>
			<BookOverview {...latestBooks[0]} userId={session?.user?.id as string} />
			<BookList title='Popular Books' books={latestBooks.slice(1)} containerClassName='mt-28' />
		</>
	)
}

export default Home
