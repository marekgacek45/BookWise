import { Session } from 'next-auth'
import React from 'react'

const Header = ({session} :{session:Session}) => {
  return (
    <header className='admin-header'>
        <div>
            <h2>{session?.user?.name}</h2>
            <p className='text-slate-500'>Monitor all off yours users and book here</p> 
        </div>
        <p>search</p>
    </header>
  )
}

export default Header