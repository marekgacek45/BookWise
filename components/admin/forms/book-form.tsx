'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { useRouter } from 'next/navigation'
import { bookSchema } from '@/lib/validations'
import { Textarea } from '@/components/ui/textarea'
import FileUpload from '@/components/file-upload'
import ColorPicker from './color-picker'
import { createBook } from '@/lib/admin/actions/book'
import { toast } from '@/hooks/use-toast'

interface Props extends Partial<Book> {
	type?: 'create' | 'update'
}

const BookForm = ({ type, ...book }: Props) => {
	const router = useRouter()

	const form = useForm<z.infer<typeof bookSchema>>({
		resolver: zodResolver(bookSchema),
		defaultValues: {
			title: '',
			description: '',
			author: '',
			genre: '',
			rating: 1,
			totalCopies: 1,
			coverUrl: '',
			coverColor: '',
			videoUrl: '',
			summary: '',
		},
	})

	const onSubmit = async (values: z.infer<typeof bookSchema>) => {
		const result = await createBook(values)

		if (result.success) {
			toast({
				title: 'Book created successfully',
				description: 'Book created successfully',
			
			})

			router.push(`/admin/books/${result.data.id}`) 

		} else {
			toast({
				title: 'Book creation failed',
				description: result.message,
				variant: 'destructive',
			})
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name={'title'}
					render={({ field }) => (
						<FormItem className='flex flex-col gap-1'>
							<FormLabel className='text-base font-normal text-dark-500'>Book Title</FormLabel>
							<FormControl>
								<Input required placeholder='Enter book title' {...field} className='book-form_input ' />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={'author'}
					render={({ field }) => (
						<FormItem className='flex flex-col gap-1'>
							<FormLabel className='text-base font-normal text-dark-500'>Author</FormLabel>
							<FormControl>
								<Input required placeholder='Enter author' {...field} className='book-form_input ' />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={'genre'}
					render={({ field }) => (
						<FormItem className='flex flex-col gap-1'>
							<FormLabel className='text-base font-normal text-dark-500'>Genre</FormLabel>
							<FormControl>
								<Input required placeholder='Enter genre' {...field} className='book-form_input ' />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={'rating'}
					render={({ field }) => (
						<FormItem className='flex flex-col gap-1'>
							<FormLabel className='text-base font-normal text-dark-500'>Rating</FormLabel>
							<FormControl>
								<Input
									type='number'
									min={1}
									max={5}
									required
									placeholder='Book rating'
									{...field}
									className='book-form_input '
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={'totalCopies'}
					render={({ field }) => (
						<FormItem className='flex flex-col gap-1'>
							<FormLabel className='text-base font-normal text-dark-500'>Total Copies</FormLabel>
							<FormControl>
								<Input
									type='number'
									min={1}
									max={10000}
									required
									placeholder='Enter total copies'
									{...field}
									className='book-form_input '
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={'coverUrl'}
					render={({ field }) => (
						<FormItem className='flex flex-col gap-1'>
							<FormLabel className='text-base font-normal text-dark-500'>Book cover</FormLabel>
							<FormControl>
								<FileUpload
									type='image'
									accept='image/*'
									placeholder='upload book cover'
									folder='books-cover'
									variant='light'
									value={field.value}
									onFileChange={field.onChange}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={'coverColor'}
					render={({ field }) => (
						<FormItem className='flex flex-col gap-1'>
							<FormLabel className='text-base font-normal text-dark-500'>Primary Color</FormLabel>
							<FormControl>
								<ColorPicker onPickerChange={field.onChange} value={field.value} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={'description'}
					render={({ field }) => (
						<FormItem className='flex flex-col gap-1'>
							<FormLabel className='text-base font-normal text-dark-500'>Book description</FormLabel>
							<FormControl>
								<Textarea required placeholder='Book description' {...field} rows={10} className='book-form_input' />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={'videoUrl'}
					render={({ field }) => (
						<FormItem className='flex flex-col gap-1'>
							<FormLabel className='text-base font-normal text-dark-500'>Book trailer</FormLabel>
							<FormControl>
								<FileUpload
									type='video'
									accept='video/*'
									placeholder='upload book trailer'
									folder='books-trailers'
									variant='light'
									onFileChange={field.onChange}
									value={field.value}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name={'summary'}
					render={({ field }) => (
						<FormItem className='flex flex-col gap-1'>
							<FormLabel className='text-base font-normal text-dark-500'>Book summary</FormLabel>
							<FormControl>
								<Textarea required placeholder='Book summary' {...field} rows={5} className='book-form_input' />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type='submit' className='book-form_btn text-white'>
					Add book to library
				</Button>
			</form>
		</Form>
	)
}

export default BookForm
