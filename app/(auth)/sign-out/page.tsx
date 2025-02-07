
'use client'
import AuthForm from '@/components/auth-form'
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
				OnSubmit={() => console.log('yo')}
			/>
		</div>
	)
}

export default SignOut
