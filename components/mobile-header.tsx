"use client"

import Image from "next/image"
import Link from "next/link"

export function MobileHeader() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-4 md:hidden">
            <Link
                href="/"
                className="relative w-10 h-10 transition-transform active:scale-95"
                aria-label="BOE Home"
            >
                <Image
                    src="/boe.jpg"
                    alt="BOE Logo"
                    fill
                    className="object-cover rounded-xl"
                    priority
                />
            </Link>
        </header>
    )
}