'use client';
import Link from 'next/link';
import Image from 'next/image';
import { signOut, useSession } from '@/lib/auth-client';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from '@/components/ui/tooltip';
import {
   Sheet,
   SheetContent,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from '@/components/ui/sheet';
import { ThemeToggle } from './theme/theme-toggle';
import { usePathname, useRouter } from 'next/navigation';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import Filter from './search/Filter';

const Navbar = ({ sideMenu }: { sideMenu: boolean }) => {
   const { data } = useSession();
   const router = useRouter();
   const user = data?.user;
   const pathname = usePathname();
   const isActive = pathname.startsWith('/image/');
   const [isOpen, setIsOpen] = useState(false);
   const isInHotelPage =
      pathname === '/hotels' || pathname.startsWith('/hotels?');

   const menuItems = (
      <>
         <li>
            <Link href="#" onClick={() => setIsOpen(false)}>
               About Us
            </Link>
         </li>
         <li>
            <Link href="#" onClick={() => setIsOpen(false)}>
               Contact us
            </Link>
         </li>
         {user && (
            <li>
               <Link href="/bookings" onClick={() => setIsOpen(false)}>
                  Bookings
               </Link>
            </li>
         )}
         <li className="hidden md:list-item">
            <ThemeToggle />
         </li>
         {!user && (
            <li>
               <Button
                  className="hover:rounded-full"
                  onClick={() => {
                     setIsOpen(false);
                     router.push('/login');
                  }}
               >
                  Login
               </Button>
            </li>
         )}
         {/* Mobile-only sign out button */}
         {user && (
            <li className="md:hidden">
               <Button
                  size="sm"
                  className="hover:rounded-full"
                  onClick={() => {
                     setIsOpen(false);
                     signOut();
                  }}
               >
                  Sign Out
               </Button>
            </li>
         )}

         {/* Desktop-only user dropdown */}
         {user && (
            <li className="hidden md:list-item">
               <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                     <Tooltip>
                        <TooltipTrigger>
                           <Avatar>
                              <AvatarImage
                                 src={(user?.image && user?.image) || ''}
                              />
                              <AvatarFallback className="font-semibold bg-primary text-white">
                                 {user?.name?.[0] || 'U'}
                              </AvatarFallback>
                           </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                           <p>{user?.name}</p>
                        </TooltipContent>
                     </Tooltip>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                     <DropdownMenuLabel>My Account</DropdownMenuLabel>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem>
                        <Button
                           size="sm"
                           className="w-full hover:rounded-full"
                           onClick={() => {
                              setIsOpen(false);
                              signOut();
                           }}
                        >
                           Sign Out
                        </Button>
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </li>
         )}
      </>
   );

   return (
      <nav style={{ display: isActive ? 'none' : '' }}>
         <Link href="/">
            <Image
               src="/stayswift.png"
               alt="Stay Swift Logo"
               width={200}
               height={200}
            />
         </Link>

         {/* Desktop Menu */}
         {sideMenu && <ul className="hidden md:flex">{menuItems}</ul>}

         {/* Mobile Menu */}
         {sideMenu && (
            <div className="md:hidden">
               <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                     <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle menu</span>
                     </Button>
                  </SheetTrigger>
                  <SheetContent side="right">
                     <SheetHeader>
                        <SheetTitle>StaySwift</SheetTitle>
                     </SheetHeader>
                     <div className="px-5">
                        <ul className="flex flex-col gap-4 mt-6">
                           {menuItems}
                           {/* Filter only in mobile sheet when on hotels page */}
                           {/* {isInHotelPage && (
                           )} */}
                           <li>
                              <Filter />
                           </li>
                        </ul>
                     </div>
                  </SheetContent>
               </Sheet>
            </div>
         )}
      </nav>
   );
};

export default Navbar;
