"use client"

import { navLinks } from '@/constants'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { ThemeToggle } from './ThemeContext'

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <aside className="sidebar select-none">
      <div className="flex size-full flex-col justify-between">
        <div>
          {/* Logo container */}
          <Link href="/" className="sidebar-logo group">
            <div className="flex items-center gap-2.5">
              <div className="relative size-9 rounded-xl bg-gradient-to-br from-primary-indigo to-accent-cyan p-0.5 shadow-glow-indigo transition-transform duration-300 group-hover:scale-105">
                <div className="flex size-full items-center justify-center rounded-[10px] bg-background">
                  <Image
                    src="/assets/images/logo-icon.svg"
                    alt="DreamPix logo"
                    width={20}
                    height={20}
                    className="animate-pulse"
                  />
                </div>
              </div>
              <Image
                src="/assets/images/logo-text.svg"
                alt="DreamPix"
                width={110}
                height={22}
                className="dark:brightness-200 transition-all"
              />
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="mt-6">
            {session && (
              <ul className="sidebar-nav_elements">
                {navLinks.slice(0, 6).map((link) => {
                  const isActive = link.route === pathname

                  return (
                    <li
                      key={link.route}
                      className={`sidebar-nav_element group border ${
                        isActive
                          ? 'bg-gradient-to-r from-primary-indigo to-accent-violet border-primary-indigo/35 text-white shadow-glow-indigo'
                          : 'border-transparent text-foreground/80 hover:bg-primary-indigo/5 hover:text-foreground'
                      }`}
                    >
                      <Link className="sidebar-link" href={link.route}>
                        <Image
                          src={link.icon}
                          alt={link.label}
                          width={20}
                          height={20}
                          className={`transition-all duration-300 group-hover:scale-110 ${isActive && 'brightness-200 contrast-200'}`}
                        />
                        <span className="font-semibold tracking-wide">{link.label}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </nav>
        </div>

        {/* Bottom Elements: Secondary navigation + theme toggle + user account */}
        <div className="flex flex-col gap-4 border-t border-glass pt-4 mt-auto">
          {session && (
            <ul className="sidebar-nav_elements mb-2">
              {navLinks.slice(6).map((link) => {
                const isActive = link.route === pathname

                return (
                  <li
                    key={link.route}
                    className={`sidebar-nav_element group border ${
                      isActive
                        ? 'bg-gradient-to-r from-primary-indigo to-accent-violet border-primary-indigo/35 text-white shadow-glow-indigo'
                        : 'border-transparent text-foreground/80 hover:bg-primary-indigo/5 hover:text-foreground'
                    }`}
                  >
                    <Link className="sidebar-link" href={link.route}>
                      <Image
                        src={link.icon}
                        alt={link.label}
                        width={20}
                        height={20}
                        className={`transition-all duration-300 group-hover:scale-110 ${isActive && 'brightness-200 contrast-200'}`}
                      />
                      <span className="font-semibold tracking-wide">{link.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}

          {/* Premium Theme Switcher */}
          <div className="px-2">
            <ThemeToggle />
          </div>

          {session ? (
            <div className="flex items-center gap-3 p-3 rounded-xl border border-glass bg-panel-glass hover:bg-primary-indigo/5 transition-all duration-200 cursor-pointer shadow-glow-card">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground">{session.user?.name}</span>
                <span className="text-xs text-muted-foreground">{session.user?.email}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="ml-auto text-muted-foreground hover:text-foreground"
              >
                <Image
                  src="/assets/icons/logout.svg"
                  alt="logout"
                  width={18}
                  height={18}
                />
              </Button>
            </div>
          ) : (
            <div className="px-2 w-full flex flex-col gap-4">
              <Button asChild className="submit-button font-bold text-white rounded-xl">
                <Link href="/sign-in">Login</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar