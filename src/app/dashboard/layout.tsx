// import Link from "next/link";


// export default  function RootLayout(
//     {children,}:Readonly<{children:React.ReactNode}>
// ){

//     return(
//         <div className="flex">
//             <aside className="bg-white drop-shadow-cyan-800 drop-shadow-2xl h-screen w-64 p-4 ">
//                 <h1 className="font-bold text-gray-600 mb-6"> Dashboard</h1>

//                 <Link href={'/dashboard/products'}> <p className="bg-gray-100 mb-4 p-4 rounded-xl">Products</p> </Link>
//                 <Link href={'/dashboard/products'}> <p className="bg-gray-100 mb-4 p-4 rounded-xl">expenses</p> </Link>
//                 <Link href={'/dashboard/products'}> <p className="bg-gray-100 mb-4 p-4 rounded-xl">users</p> </Link>
//                 <Link href={'/dashboard/products'}> <p className="bg-gray-100 mb-4 p-4 rounded-xl">sales</p> </Link>
//             </aside>
//             <main>
//                 {children}
//             </main>
//         </div>
//     )
// }






import { AppSidebar } from "@/components/ui/app-sidepar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
