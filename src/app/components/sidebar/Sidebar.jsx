import Link from 'next/link'
import React from 'react'
import NavLinks from './NavLinks'

export default function Sidebar() {
  return (
    <div className='flex h-full flex-col px-3 py-4 md:px-2'>
        <div className="flex flex-wrap gap-2 justify-center md:grow flex-row md:justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
            <NavLinks/>
        </div>
    </div>
  )
}
