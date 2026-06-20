"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { navLinks } from "@/constants"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "../ui/button"
import { ThemeToggle } from "./ThemeContext"

const MobileNav = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <header className="header select-none">
      <Link href="/" className="flex items-center gap-2 group">
        <div className="relative size-8 rounded-lg bg-gradient-to-br from-primary-indigo to-accent-cyan p-0.5 shadow-glow-indigo transition-transform duration-300">
          <div className="flex size-full items-center justify-center rounded-[6px] bg-background">
            <Image
              src="/assets/images/logo-icon.svg"
              alt="logo"
              width={16}
              height={16}
            />
          </div>
        </div>
        <Image
          src="/assets/images/logo-text.svg"
          alt="logo"
          width={100}
          height={20}
          className="dark:brightness-200 transition-all"
        />
      </Link>

      <nav className="flex items-center gap-3">
        {session ? (
          <Sheet>
            <SheetTrigger className="hover:bg-primary-indigo/10 p-2 rounded-xl transition-all cursor-pointer">
              <Image
                src="/assets/icons/menu.svg"
                alt="menu"
                width={26}
                height={26}
                className="cursor-pointer dark:brightness-200 transition-all"
              />
            </SheetTrigger>
            <SheetContent className="sheet-content border-l border-glass bg-panel-glass/95 backdrop-blur-xl w-72 sm:w-80 flex flex-col justify-between p-6">
              <div className="flex flex-col gap-6">
                <Link href="/" className="flex items-center gap-2">
                  <div className="relative size-8 rounded-lg bg-gradient-to-br from-primary-indigo to-accent-cyan p-0.5">
                    <div className="flex size-full items-center justify-center rounded-[6px] bg-background">
                      <Image
                        src="/assets/images/logo-icon.svg"
                        alt="logo"
                        width={16}
                        height={16}
                      />
                    </div>
                  </div>
                  <Image
                    src="/assets/images/logo-text.svg"
                    alt="logo"
                    width={100}
                    height={20}
                    className="dark:brightness-200 transition-all"
                  />
                </Link>

                <ul className="header-nav_elements border-t border-glass pt-4">
                  {navLinks.map((link) => {
                    const isActive = link.route === pathname

                    return (
                      <li
                        className={`w-full rounded-xl border ${
                          isActive
                            ? 'bg-gradient-to-r from-primary-indigo to-accent-violet border-primary-indigo/35 text-white shadow-glow-indigo'
                            : 'border-transparent text-foreground/80 hover:bg-primary-indigo/5 hover:text-foreground'
                        }`}
                        key={link.route}
                      >
                        <Link className="sidebar-link cursor-pointer" href={link.route}>
                          <Image
                            src={link.icon}
                            alt={link.label}
                            width={20}
                            height={20}
                            className={`transition-all ${isActive && 'brightness-200 contrast-200'}`}
                          />
                          <span className="font-semibold tracking-wide">{link.label}</span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>

              {/* Bottom Theme Controls and User */}
              <div className="flex flex-col gap-4 border-t border-glass pt-4 mt-auto">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground">{session.user?.name}</span>
                    <span className="text-xs text-muted-foreground">{session.user?.email}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Image
                      src="/assets/icons/logout.svg"
                      alt="logout"
                      width={18}
                      height={18}
                    />
                  </Button>
                </div>
                <ThemeToggle />
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild className="submit-button font-bold text-white rounded-xl h-10 py-0 flex-center">
              <Link href="/sign-in">Login</Link>
            </Button>
          </div>
        )}
      </nav>
    </header>
  )
}

export default MobileNav