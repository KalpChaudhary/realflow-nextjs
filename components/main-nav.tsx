import Link from "next/link"

import { cn } from "@/lib/utils"
import { UserNav } from "./user-nav"
import Image from "next/image"

export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {


    return (
        <nav className="flex justify-between p-6 bg-transparent absolute top-0 w-full z-10">
            <div className="logo">
                <Link href="/">

                    <Image
                        className="h-7 w-auto"
                        src="/icons/brand.png"
                        objectFit="cover"
                        alt="Logo"
                        width={32}
                        height={32}
                    />

                </Link>
            </div>
            <div
                className={cn("md:flex items-center hidden  space-x-4 lg:space-x-6", className)}
                {...props}
            >
                <Link
                    href="/"
                    className="text-sm font-medium transition-colors hover:text-primary"
                >
                    Home
                </Link>
                <Link
                    href="/collaborate"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                    Collaborate
                </Link>
                <Link
                    href="/products"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                    Products
                </Link>
                <Link
                    href="/settings"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                    Settings
                </Link>
            </div>
            <UserNav />

        </nav>
    )
}