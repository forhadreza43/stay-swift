'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
} from '@/components/ui/dialog';
import Image from 'next/image';

interface ImageModalProps {
   imageUrl: string | null;
   imageId: string;
}

export default function ImageModal({ imageUrl, imageId }: ImageModalProps) {
   const [open, setOpen] = useState(true);
   const router = useRouter();

   const handleOpenChange = (isOpen: boolean) => {
      setOpen(isOpen);
      if (!isOpen) {
         router.back();
      }
   };

   useEffect(() => {
      if (imageUrl) {
         console.log('ImageModal - imageUrl:', imageUrl);
      } else {
         console.log('ImageModal - No imageUrl provided');
      }
   }, [imageUrl]);

   if (!imageUrl) {
      return null;
   }

   return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
         <DialogContent className=" sm:max-w-[425px] md:max-w-5xl lg:max-w-7xl h-screen ">
            <DialogHeader className="sr-only">
               <DialogTitle>Image {imageId}</DialogTitle>
            </DialogHeader>
            <div className="relative w-full h-[90vh] min-h-[500px] flex items-center justify-center">
               <Image
                  src={imageUrl}
                  alt={`Image ${imageId}`}
                  fill
                  className="object-contain"
                  priority
               />
            </div>
         </DialogContent>
      </Dialog>
   );
}
