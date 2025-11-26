"use client";

import Link from 'next/link'
import { LogoIcon } from '../Icons'
import { Button } from '../ui/button'
import { ArrowDownIcon, ArrowRightIcon, MenuIcon } from 'lucide-react'
import { useAtom } from 'jotai'
import { userAuthAtom } from '@/atoms/userAuthAtom'
import UserAccount from '../UserAccount'
import { useHandleDialogType } from '@/hooks/useHandleDialogType'

export default function Header() {
    // Check authentication state to conditionally render UserAccount or Get Started button
    const [user] = useAtom(userAuthAtom)
    const { handleDialogType } = useHandleDialogType()

    // Handle Get Started button click - opens login dialog
    const handleGetStarted = () => {
        handleDialogType("login", "add")
    }

    return (
        <header className="w-full z-50 fixed backdrop-blur-xl top-0 left-0 right-0 mb-10">
            <nav className="container mx-auto px-4 py-4 flex items-center justify-between bg-transparent" style={{ backgroundColor: 'transparent' }}>
                {/* Logo/Brand */}
                <Link href="/dashboard" className="text-xl font-bold">
                    <LogoIcon className="w-40 h-fit" />
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-15">
                    <Link href="/dashboard" className="hover:text-gray-600">
                        Home
                    </Link>
                    <Link href="/all-tools" className="hover:text-gray-600 flex items-center gap-1">
                        Tools 
                    </Link>
                    <Link href="/pricing" className="hover:text-gray-600">
                        Pricing
                    </Link>
                    <Link href="/contact-us" className="hover:text-gray-600">
                        Contact us
                    </Link>
                </div>

                {/* Conditionally render UserAccount (when logged in) or Get Started button (when not logged in) */}
                <div className="hidden md:flex">
                    {user && user !== "loading" ? (
                        <UserAccount />
                    ) : (
                        <Button
                            variant='dark'
                            className='py-4 h-12 group has-[>svg]:px-6!'
                            onClick={handleGetStarted}
                        >
                            Get Started <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-2 transition-all duration-300" />
                        </Button>
                    )}
                </div>
                <button className='md:hidden'>
                    <MenuIcon className="w-4 h-4" />
                </button>
            </nav>
        </header>
    )
}
