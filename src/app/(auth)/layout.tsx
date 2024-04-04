"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
// import { useState } from 'react';

const NavLinks = [
    {name: "Create Profile", href: "/create-profile"},
  { name: "Login", href: "/login" },
  
  ]

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();

  return (
    <main className="container mx-auto">
      {NavLinks.map((link) => {
        const isActive  = pathname.startsWith(link.href)
       return (
         <Link className={isActive ? "underline text-gray-800 mr-5 " : "text-gray-400 mr-5 "} href={link.href} key={link.name}>{ link.name}</Link>
       )
     })}
        {children}
      
    </main>
  )
}
