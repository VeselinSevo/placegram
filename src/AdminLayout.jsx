// import { Outlet } from "react-router-dom";
// import AdminNavbar from "./admin/components/Navigation/AdminNavbar";
// import AdminFooter from "./admin/components/Footer/AdminFooter";
// import useDynamicHeight from "./hooks/useDynamicHeight";

export default function AdminLayout() {
    // const { height, navbarRef, footerRef } = useDynamicHeight();
    // return (
    //     <div className="relative min-h-screen flex flex-col bg-bg dark:bg-bg-dark text-text dark:text-text-dark">
    //         {/* Glowing Effect in Light Mode */}
    //         <div
    //             className="absolute transform
    //             w-full h-[200px] md:h-[600px] bg-light-glow pointer-events-none
    //             dark:hidden z-0 mix-blend-multiply filter blur-2xl opacity-50"
    //         ></div>
    //         {/* Glowing Effect in Dark Mode */}
    //         <div
    //             className={`absolute transform w-full h-[200px] md:h-[600px] ${
    //                 height ? "bg-dark-glow" : "hidden"
    //             } pointer-events-none z-0 mix-blend-lighten filter blur-2xl opacity-10`}
    //         ></div>
    //         {/* Admin Navbar */}
    //         <AdminNavbar ref={navbarRef} />
    //         {/* Main Content with dynamic height */}
    //         <main
    //             className="flex-grow flex flex-col justify-center relative z-10 my-4 md:my-10"
    //             style={{ minHeight: height }}
    //         >
    //             <Outlet />
    //         </main>
    //         {/* Admin Footer */}
    //         <AdminFooter ref={footerRef} />
    //     </div>
    // );
}
