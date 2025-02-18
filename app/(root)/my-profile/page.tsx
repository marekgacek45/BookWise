import { signOut } from '@/auth'
import BookList from '@/components/book-list'
import { Button } from '@/components/ui/button'
import { sampleBooks } from '@/constants'
import React from 'react'

const page = () => {
	return (
		<>
			<form
				action={async () => {
					'use server'

					await signOut()
				}}>
				<Button className='mb-10'>Logout</Button>
			</form>

            <BookList title="Borrowed Books" books={sampleBooks}/>
		</>
	)
}

export default page
