"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import ModeToggle from "./ModeToggle"

const navLinks = [
    { displayName: "Dashboard", href: "/" },
    { displayName: "Tasks", href: "/tasks" }
]

export default function Navbar() {
    const pathname = usePathname()
    return (
        <div className="flex justify-between items-center w-full">
        <NavigationMenu>
            <NavigationMenuList className="flex gap-2">
                {navLinks.map((link) => (
                    <NavigationMenuItem key={link.displayName}>
                        <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), pathname === link.href && "font-extrabold")}>
                            <Link href={link.href}>
                                {link.displayName}
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
        <ModeToggle />
        </div>
    )
}