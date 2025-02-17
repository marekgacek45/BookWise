
'use client'
import AuthForm from '@/components/auth-form'
import { signUp } from '@/lib/actions/auth'
import { signUpSchema } from '@/lib/validations'
import React from 'react'

const SignOut = () => {
	return (
		<div>
			{' '}
			<AuthForm
				type='SIGN_UP'
				schema={signUpSchema}
				defaultValues={{
					email: '',
					password: '',
					fullName: '',
					universityId: 0,
					universityCard: '',
				}}
				onSubmit={signUp}
			/>
		</div>
	)
}

export default SignOut
