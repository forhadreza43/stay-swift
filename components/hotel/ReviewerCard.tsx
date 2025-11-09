import { CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type User = {
   id: string;
   name: string;
   email: string;
   image?: string;
   emailVerified?: boolean;
};

export default async function ReviewerCard({ userId }: { userId: string }) {
   if (!userId) return null;
   const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/getUser?userId=${userId}`,
      { cache: 'no-store' }
   );
   const { data }: { data: User | null } = res.ok
      ? await res.json()
      : { data: null };
   console.log(data);
   return (
      <CardHeader className="flex flex-row items-center gap-4">
         <Avatar className="h-10 w-10">
            {data?.image ? (
               <AvatarImage src={data.image} alt={data.name} />
            ) : null}
            <AvatarFallback>
               {data?.name
                  ? data.name
                       .split(' ')
                       .slice(0, 2)
                       .map((part) => part[0])
                       .join('')
                       .toUpperCase()
                  : 'GU'}
            </AvatarFallback>
         </Avatar>
         <div className="space-y-0.5">
            <CardTitle className="text-base font-medium">
               {data?.name || 'Guest'}
            </CardTitle>
            <p className="text-xs text-muted-foreground">
               {data?.emailVerified ? 'Verified stay' : 'Unverified user'}
            </p>
         </div>
      </CardHeader>
   );
}
