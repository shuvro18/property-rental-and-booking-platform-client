import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const NavbarLink = ({children, href}) => {

    const pathname = usePathname();
    const isTrue = pathname === href ;

    return (
        <div>
            <Link href={href} className={`${isTrue ? "px-5 py-2.5 text-sm font-medium text-white bg-linear-to-r from-indigo-600 to-violet-600 rounded-lg hover:from-indigo-700 hover:to-violet-700 shadow-md hover:shadow-lg transition-all duration-300" : "px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"}`} >
            
                {children}

            </Link>
        </div>
    );
};

export default NavbarLink;