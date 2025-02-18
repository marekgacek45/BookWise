'use server'

import { signIn } from '@/auth'
import { db } from '@/database/drizzle'
import { users } from '@/database/schema'
import bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import ratelimit from '../ratelimit'
import { redirect } from 'next/navigation'
import { workflowClient } from '../workflow'
import config from '../config'

export const signInWithCrededentials = async (params: Pick<AuthCredentials, 'email' | 'password'>) => {
	const { email, password } = params

	const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
	const { success } = await ratelimit.limit(ip);
  
	if (!success) return redirect("/too-fast");

	try {
		const result = await signIn('credentials', { email, password, redirect: false })

		if (result?.error) {
			return { success: false, message: result.error }
		}
		return { success: true, message: 'SignIn Success' }
	} catch (error) {
		console.log(error, 'SignUp Error')
		return { success: false, message: 'SignUp Error' }
	}
}

export const signUp = async (params: AuthCredentials) => {
	const { fullName, email, password, universityId, universityCard } = params

	const ip = (await headers()).get('x-forwarded-for') || '127.0.0.1'
	const {success} = await ratelimit.limit(ip)

	if (!success) {
		return redirect('/too-fast')
	}

	const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1)

	if (existingUser.length > 0) {
		return { success: false, message: 'User already exists' }
	}

	const hashedPassword = await bcrypt.hash(params.password, 10)

	try {
		await db.insert(users).values({
			fullName,
			email,
			universityId,
			universityCard,
			password: hashedPassword,
		})

		await workflowClient.trigger({
			url: `${config.env.prodApiEndpoint}/api/workflows/onboarding`,
			body: {
			  email,
			  fullName,
			},
		  });

		await signInWithCrededentials({email, password})

		return { success: true, message: 'SignUp Success' }
	} catch (error) {
		console.log(error, 'SignUp Error')
		return { success: false, message: 'SignUp Error' }
	}
}
