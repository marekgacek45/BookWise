interface Book {
    id:string
	title:string
	author:string
	genre:string
	rating:number
	totalCopies:number
	availableCopies:number
	description:string
	coverColor:string
	coverUrl:string
    videoUrl:string
    summary:string
	createdAt:Date | null
  
}

interface AuthCredentials {
	fullName:string,
	email:string,
	universityId:number,
	universityCard:string,
	password:string
}


interface BookParams {
	title: string;
	author: string;
	genre: string;
	rating: number;
	coverUrl: string;
	coverColor: string;
	description: string;
	totalCopies: number;
	videoUrl: string;
	summary: string;
  }

  interface borrowBookParams {
	bookId: string;
	userId: string;
  }