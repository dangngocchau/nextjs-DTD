'use client'
import { ModeToggle } from '@/components/mode-toggle'
import Link from 'next/link'

export default function Header() {
  return (
    <div className='flex justify-around items-center h-[50px] max-w-screen bg-black dark:bg-gray-800'>
      <ul className='flex gap-5'>
        <li className='flex justify-center items-center text-white dark:text-gray-300'>
          <Link href='/login'>Login</Link>
        </li>
        <li className='text-white dark:text-gray-300'>
          <Link href='/register'>Register</Link>
        </li>
      </ul>
      <ModeToggle />
    </div>
  )
}
