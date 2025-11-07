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
import { ThemeToggle } from './theme/theme-toggle';
import { useRouter } from 'next/navigation';

const Navbar = () => {
   const { data } = useSession();
   const router = useRouter();
   const user = data?.user;
   return (
      <nav>
         <Link href="/">
            <Image
               src="/stayswift.png"
               alt="Stay Swift Logo"
               width={200}
               height={200}
            />
         </Link>

         <ul>
            <li>
               <Link href="#">Recommended Places</Link>
            </li>

            <li>
               <Link href="#">About Us</Link>
            </li>

            <li>
               <Link href="#">Contact us</Link>
            </li>

            <li>
               <Link href="/bookings">Bookings</Link>
            </li>
            <li>
               <ThemeToggle />
            </li>

            {!user && (
               <li>
                  <Button
                     className="hover:rounded-full"
                     onClick={() => router.push('/login')}
                  >
                     Login
                  </Button>
               </li>
            )}
            {user && (
               <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                     <Tooltip>
                        <TooltipTrigger>
                           <Avatar>
                              <AvatarImage
                                 src={(user?.image && user?.image) || ''}
                              />
                              <AvatarFallback className="font-semibold">
                                 {user.name[0]}
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
                           className="w-full"
                           onClick={() => signOut()}
                        >
                           {' '}
                           Sign Out{' '}
                        </Button>
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            )}
         </ul>
      </nav>
   );
};

export default Navbar;
