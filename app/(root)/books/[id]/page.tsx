import { auth } from '@/auth'
import BookOverview from '@/components/book-overview'
import { db } from '@/database/drizzle'
import { books } from '@/database/schema'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import React from 'react'

const Page = async ({params}: {params: Promise<{id: string}>}) => {

    const id = await params.id
    const session = await auth()

    const [bookDetails] = db.select().from(books).where(eq(books.id,id)).limit(1)

    if(!bookDetails) redirect('/404')

        console.log(bookDetails)

  return (
    <>
   <BookOverview {...bookDetails} userId={session?.user?.id} />
   
    </>
  )
}

export default Page