'use client'


import { signInSchema } from '@/lib/validations'

import AuthForm from '@/components/auth-form'
import { signInWithCrededentials } from '@/lib/actions/auth'

const SignIn = () => {
	return (
		<div>
			<AuthForm
				type='SIGN_IN'
				schema={signInSchema}
				defaultValues={{ email: '', password: '' }}
				onSubmit={signInWithCrededentials}
			/>
		</div>
	)
}

export default SignIn
