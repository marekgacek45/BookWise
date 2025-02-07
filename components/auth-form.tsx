'use client '
import { zodResolver } from '@hookform/resolvers/zod'
import { DefaultValues, FieldValues, Path, useForm, UseFormReturn, SubmitHandler } from 'react-hook-form'
import { z, ZodType } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { FIELD_NAMES, FIELD_TYPES } from '@/constants'
import ImageUpload from './image-upload'

interface Props<T extends FieldValues> {
	schema: ZodType<T>
	defaultValues: T
	onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>
	type: 'SIGN_UP' | 'SIGN_IN'
}

const AuthForm = <T extends FieldValues>({ type, schema, defaultValues, onSubmit }: Props<T>) => {
	const isSignIn = type === 'SIGN_IN'

	const form: UseFormReturn<T> = useForm({
		resolver: zodResolver(schema),
		defaultValues: defaultValues as DefaultValues<T>,
	})

	const handleSubmit: SubmitHandler<T> = async data => {}

	return (
		<div className='flex flex-col gap-4'>
			<h1 className='text-2xl font-semibold text-white'>
				{isSignIn ? 'Welcome Back!' : 'Create your library account'}
			</h1>
			<p className='text-light-200'>
				{isSignIn ? 'Sign in to your account' : 'Create your account to start reading books'}
			</p>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6 w-full'>
					{Object.keys(defaultValues).map(field => (
						<FormField
							key={field}
							control={form.control}
							name={field as Path<T>}
							render={({ field }) => (
								<FormItem>
									<FormLabel className='capitalize'>{FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}</FormLabel>
									<FormControl>
										{field.name === 'universityCard' ? (
											<ImageUpload onFileChange={field.onChange}/>
										) : (
											<Input required type={FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]} {...field} className='form-input'/>
										)}
									</FormControl>
									
									<FormMessage />
								</FormItem>
							)}
						/>
					))}

					<Button type='submit' className='form-btn'>{isSignIn ? 'Sign In' : 'Sign Up'}</Button>
				</form>
			</Form>

			<p className='text-center text-base font-medium'>
				{isSignIn ? 'New to BookWise?' : 'Already have an account?'}
				<Link href={isSignIn ? '/sign-out' : '/sign-in'} className='font-bold text-primary ml-1'>
					{isSignIn ? 'Sign In' : 'Sign Out'}
				</Link>
			</p>
		</div>
	)
}

export default AuthForm
