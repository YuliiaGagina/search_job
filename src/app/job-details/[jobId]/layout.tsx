export default function JobLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
     
        <h2 className="text-center text-bold text-3xl text-orange-300">Job details</h2>
        {children}

    </>
  )
}
