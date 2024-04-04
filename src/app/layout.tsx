import Link from "next/link";
import "./styles/globals.css";

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

const navErray = [
  {
    title: "Logo",
    href: "/"
  },
   {
    title: "Find jobs",
    href: "/jobs"
  },
    {
    title: "Create Profile",
    href: "/create-profile"
  },
     {
    title: "Login",
    href: "/login"
  },
      {
    title: "Liked",
    href: "/liked"
  },

]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header className=" bg-red-200 py-5">
          <nav className="container mx-auto flex items-center gap-5">
            {navErray.map(({href , title}) => (
              <Link key={title} href={href}>{title }</Link>
            ))}
          
            {/* <Link href="/jobs">Find jobs</Link>
            <Link href="/create-profile">Create Profile</Link>
            <Link href="/login">Login</Link>
             <Link href="/liked">Liked</Link> */}
          
          </nav>

        </header>
        {children}
        <footer className="bg-gray-800 text-white fixed bottom-0 w-full p-4">
          <p>footer</p>
        </footer>
      </body>
    </html>
  )
}
