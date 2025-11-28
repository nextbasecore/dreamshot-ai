"use client";

import Link from 'next/link'
import { LogoIcon } from '../Icons'
import { Button } from '../ui/button'
import { ArrowRight, Menu, Home, Wrench, DollarSign, Mail } from 'lucide-react'
import { useAtom } from 'jotai'
import { userAuthAtom } from '@/atoms/userAuthAtom'
import UserAccount from '../UserAccount'
import { useHandleDialogType } from '@/hooks/useHandleDialogType'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '../ui/popover'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Header() {
    // Check authentication state to conditionally render UserAccount or Get Started button
    const [user] = useAtom(userAuthAtom)
    const { handleDialogType } = useHandleDialogType()
    // State to manage mobile menu open/close
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    // Get current pathname to detect active route
    const pathname = usePathname()

    // Handle Get Started button click - opens login dialog
    const handleGetStarted = () => {
        handleDialogType("login", "add")
    }

    // Handle Get Started click in mobile menu - closes menu and opens login dialog
    const handleMobileGetStarted = () => {
        setIsMobileMenuOpen(false)
        handleDialogType("login", "add")
    }

    // Check if a route is active
    const isActive = (path: string) => {
        if (path === '/') {
            return pathname === '/'
        }
        return pathname?.startsWith(path)
    }

    return (
        <header className="w-full z-50 fixed backdrop-blur-xl top-0 left-0 right-0 mb-10">
            <nav className="container mx-auto px-4 py-4 flex items-center justify-between bg-transparent" style={{ backgroundColor: 'transparent' }}>
                {/* Logo/Brand */}
                <Link href="/" className="text-xl font-bold">
                    <LogoIcon className="w-40 h-fit" />
                </Link>

                {/* Desktop Navigation Links - hidden on mobile, visible on md+ */}
                <div className="hidden md:flex items-center gap-15">
                    <Link href="/" className="hover:text-gray-600">
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

                {/* Desktop User Account / Get Started - hidden on mobile, visible on md+ */}
                <div className="hidden md:flex">
                    {user && user !== "loading" ? (
                        <UserAccount />
                    ) : (
                        <Button
                            variant='dark'
                            className='py-4 h-12 group has-[>svg]:px-6!'
                            onClick={handleGetStarted}
                        >
                            Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-all duration-300" />
                        </Button>
                    )}
                </div>

                {/* Mobile User Account - visible on mobile, left of menu button */}
                <div className="md:hidden flex items-center gap-3 ">
                    {user && user !== "loading" ? (
                        <UserAccount />
                    ) : null}

                    {/* Mobile Menu Button and Dropdown - visible only on mobile (md:hidden) */}
                    <Popover open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <PopoverTrigger asChild>
                            <button className='p-2 hover:opacity-80 transition-opacity'>
                                <Menu className="w-6 h-6" />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent
                            align="start"
                            side="bottom"
                            sideOffset={8}
                            className="w-screen max-w-none -ml-4 -mr-4 p-2 bg-transparent backdrop-blur-md border-0 shadow-none"
                        >
                            {/* Mobile Navigation Links - vertically stacked with icons */}
                            <nav className="flex flex-col gap-1">
                                <Link
                                    href="/"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive('/')
                                        ? 'bg-blue-500/30 text-blue-700 font-semibold'
                                        : 'text-gray-700 hover:bg-white/10'
                                        }`}
                                >
                                    <Home className={`w-4 h-4 ${isActive('/') ? 'text-blue-600' : 'text-gray-600'}`} />
                                    <span>Home</span>
                                </Link>

                                <Link
                                    href="/all-tools"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive('/all-tools')
                                        ? 'bg-blue-500/30 text-blue-700 font-semibold'
                                        : 'text-gray-700 hover:bg-white/10'
                                        }`}
                                >
                                    <Wrench className={`w-4 h-4 ${isActive('/all-tools') ? 'text-blue-600' : 'text-gray-600'}`} />
                                    <span>Tools</span>
                                </Link>

                                <Link
                                    href="/pricing"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive('/pricing')
                                        ? 'bg-blue-500/30 text-blue-700 font-semibold'
                                        : 'text-gray-700 hover:bg-white/10'
                                        }`}
                                >
                                    <DollarSign className={`w-4 h-4 ${isActive('/pricing') ? 'text-blue-600' : 'text-gray-600'}`} />
                                    <span>Pricing</span>
                                </Link>

                                <Link
                                    href="/contact-us"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive('/contact-us')
                                        ? 'bg-blue-500/30 text-blue-700 font-semibold'
                                        : 'text-gray-700 hover:bg-white/10'
                                        }`}
                                >
                                    <Mail className={`w-4 h-4 ${isActive('/contact-us') ? 'text-blue-600' : 'text-gray-600'}`} />
                                    <span>Contact us</span>
                                </Link>
                            </nav>

                            {/* Divider */}
                            {/* <div className="my-2 h-px bg-white/20" /> */}

                            {/* Mobile Get Started Button - only show if not logged in */}
                            {!user || user === "loading" ? (
                                <div className="pt-2">
                                    <Button
                                        variant='dark'
                                        className='w-full py-2.5 h-10 text-sm group'
                                        onClick={handleMobileGetStarted}
                                    >
                                        Get Started <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-all duration-300" />
                                    </Button>
                                </div>
                            ) : null}
                        </PopoverContent>
                    </Popover>
                </div>
            </nav>
        </header>
    )
}
