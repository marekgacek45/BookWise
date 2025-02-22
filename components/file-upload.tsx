'use client'

import ImageKit from 'imagekit'
import config from '@/lib/config'
import { IKImage, ImageKitProvider, IKUpload, IKVideo } from 'imagekitio-next'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { toast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

const {
	env: {
		imagekit: { publicKey, urlEndpoint },
	},
} = config

const authenticator = async () => {
	try {
		const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`)

		if (!response.ok) {
			const errorText = await response.text()
			throw new Error(`Request failed with status code ${response.status}: ${errorText}`)
		}

		const data = await response.json()
		const { signature, expire, token } = data
		return { signature, expire, token }
	} catch (error: any) {
		throw new Error(`Authentication request failed ${error.message}`)
	}
}

interface Props {
	type: 'image' | 'video'
	accept: string
	placeholder: string
	folder: string
	variant: 'dark' | 'light'
	onFileChange: (filePath: string) => void
	value?:string
}

const ImageUpload = ({ type, accept, placeholder, folder, variant, onFileChange,value }: Props) => {
	const ikUploadRef = useRef(null)
	const [file, setFile] = useState<{ filePath: string | null} >({
		filePath:value ?? null
	})
	const [progress, setProgress] = useState(0)

	const styles = {
		button: variant === 'dark' ? 'bg-dark-600' : 'bg-light-600 border-bray-100 border',
		placeholder: variant === 'dark' ? 'text-light-100' : 'text-slate-500',
		text: variant === 'dark' ? 'text-light-100' : 'text-dark-500',
	}

	const onError = (error: any) => {
		console.log(error)

		toast({
			title: `${type} uploaded failed`,
			description: `Your image could not be uploaded. Please try again`,
			variant: 'destructive',
		})
	}

	const onSuccess = (res: any) => {
		setFile(res)
		onFileChange(res.filePath)

		toast({
			title: `${type} uploaded successfully`,
			description: `${res.filePath} uploaded successfully`,
		})
	}

	const onValidate = (file: File): boolean => {
		if (type === 'image') {
			if (file.size > 20 * 1024 * 1024) {
				toast({
					title: `File size is too large`,
					description: `Please upload a file smaller than 20MB`,
					variant: 'destructive',
				})

				return false
			}
		} else if (type === 'video') {
			if (file.size > 50 * 1024 * 1024) {
				toast({
					title: `File size is too large`,
					description: `Please upload a file smaller than 50MB`,
					variant: 'destructive',
				})

				return false
			}
		}

		return true
	}

	return (
		<ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
			<IKUpload
				ref={ikUploadRef}
				onError={onError}
				onSuccess={onSuccess}
				className='hidden'
				useUniqueFileName={true}
				validateFile={onValidate}
				onUploadStart={() => setProgress(0)}
				onUploadProgress={({ loaded, total }) => setProgress(Math.round((loaded / total) * 100))}
				folder={folder}
				accept={accept}
			/>
			<button
				className={cn('upload-btn', styles.button)}
				onClick={e => {
					e.preventDefault()

					if (ikUploadRef.current) {
						//@ts-ignore
						ikUploadRef.current?.click()
					}
				}}>
				<Image src='/icons/upload.svg' alt='upload-icon' width={20} height={20} className='object-contain' />
				<p className={cn('text-base', styles.placeholder)}>{placeholder}</p>

				{file && <p className={cn('upload-filename', styles.text)}>{file.filePath}</p>}
			</button>
			{progress > 0 && (
				<div className='w-full rounded-full bg-green-200'>
					<div className='progress' style={{ width: `${progress}%` }}>
						{progress}%
					</div>
				</div>
			)}

			{file &&
				(type === 'image' ? (
					<IKImage alt={file.filePath} path={file.filePath} width={500} height={300} />
				) : (
					<IKVideo  path={file.filePath} controls={true} className='h-96 w-full rounded-xl' />
				))}
		</ImageKitProvider>
	)
}

export default ImageUpload
