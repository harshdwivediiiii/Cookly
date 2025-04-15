'use client'

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Menu,
  Bell,
  ChefHat,
  BookOpenText,
  Heart,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { ModeToggle } from "@/components/ui/ModeToggle"
import { useTheme } from "next-themes"
import { useClerk, useUser } from "@clerk/nextjs"

const navItems = [
  { label: "Recipes", icon: ChefHat, href: "/recipes" },
  { label: "Guides", icon: BookOpenText, href: "/guides" },
  { label: "Favorites", icon: Heart, href: "/favorites" },
  { label: "Settings", icon: Settings, href: "/settings" },
]

export function Navbar() {
  const [query, setQuery] = useState("")
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const { theme } = useTheme()
  const { user } = useUser()
  const { signOut } = useClerk()

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredSuggestions = query
    ? navItems.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase())
      )
    : []

  const logoSrc = theme === "dark" ? "/logo-white.png" : "/logo-black.png"

  return (
    <nav className="w-full flex justify-between items-center px-4 py-2 border-b shadow-sm bg-background">
      {/* Left: Mobile Menu + Logo */}
      <div className="flex items-center gap-2">
        {/* Mobile Sheet Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col justify-between p-4">
              <SheetHeader>
                <SheetTitle className="text-lg font-semibold">CookMate</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col justify-between h-full">
                <div>
                  <Link href="/" className="flex items-center gap-2 mb-6">
                    {mounted && (
                      <Image
                        src={logoSrc}
                        alt="Logo"
                        width={40}
                        height={40}
                      />
                    )}
                    <span className="text-lg font-semibold">CookMate</span>
                  </Link>
                  <div className="flex flex-col gap-4">
                    {navItems.map(({ label, icon: Icon, href }) => (
                      <Link href={href} key={label}>
                        <Button variant="ghost" className="w-full justify-start">
                          <Icon className="mr-2 h-4 w-4" />
                          {label}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="mt-6 border-t pt-4">
                  <ModeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo (Desktop & Mobile) */}
        <Link href="/" className="flex items-center gap-2 group">
          {mounted && (
            <Image
              src={logoSrc}
              alt="Logo"
              width={40}
              height={40}
              className="transition-transform duration-300 group-hover:scale-105"
            />
          )}
          <span className="text-xl font-semibold whitespace-nowrap hidden sm:block">
            CookMate
          </span>
        </Link>
      </div>

      {/* Center Nav (Desktop) */}
      <div className="hidden md:flex gap-4 items-center">
        {navItems.map(({ label, icon: Icon, href }) => (
          <Link href={href} key={label}>
            <Button variant="ghost" className="flex items-center gap-2">
              <Icon className="h-4 w-4" />
              {label}
            </Button>
          </Link>
        ))}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative w-[200px] hidden sm:block">
          <Input
            type="text"
            placeholder="Search recipes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pr-4"
          />
          {filteredSuggestions.length > 0 && (
            <div className="absolute bg-white dark:bg-zinc-900 border rounded shadow mt-1 w-full z-50">
              {filteredSuggestions.map(({ label, icon: Icon, href }) => (
                <div
                  key={label}
                  className="px-3 py-1 flex items-center gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer text-sm"
                  onClick={() => {
                    setQuery("")
                    router.push(href)
                  }}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <p className="text-sm font-medium">No new notifications</p>
          </PopoverContent>
        </Popover>

        {/* Auth & Profile */}
        {!user ? (
          <Button onClick={() => router.push("/sign-in")} variant="ghost">
            Sign In
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <span>{user.firstName}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => router.push("/profile")}>
                My Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/settings")}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut()}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* Dark Mode Toggle */}
        <ModeToggle />
      </div>
    </nav>
  )
}

export default Navbar
