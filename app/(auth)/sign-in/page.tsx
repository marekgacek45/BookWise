'use client'


import { signInSchema } from '@/lib/validations'

import AuthForm from '@/components/auth-form'

const SignIn = () => {
	return (
		<div>
			<AuthForm
				type='SIGN_IN'
				schema={signInSchema}
				defaultValues={{ email: '', password: '' }}
				OnSubmit={() => console.log('yo')}
			/>
		</div>
	)
}

export default SignIn
