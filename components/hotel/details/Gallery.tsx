import Image from 'next/image';
import Link from 'next/link';

const Gallery = ({ gallery }: { gallery: string[] }) => {
   // Helper function to extract imageId from URL
   const extractImageId = (url: string): string => {
      try {
         // Extract filename from URL (part after last / and before query params)
         const urlWithoutQuery = url.split('?')[0];
         const filename = urlWithoutQuery.split('/').pop() || '';
         // Remove file extension (.jpeg, .jpg, .png, etc.)
         const imageId = filename.replace(/\.(jpeg|jpg|png|webp|gif)$/i, '');
         return imageId;
      } catch {
         // Fallback: return a sanitized version of the URL if extraction fails
         return (
            url
               .split('/')
               .pop()
               ?.split('?')[0]
               .replace(/\.(jpeg|jpg|png|webp|gif)$/i, '') || ''
         );
      }
   };

   const newGallery = [...gallery];
   newGallery.shift();
   const firstImageId = extractImageId(gallery[0]);
   const firstImageUrl = encodeURIComponent(gallery[0]);

   return (
      <section className="container">
         <div className="grid grid-cols-2 imageshowCase gap-3">
            <div className="h-[400px]">
               <Link href={`/image/${firstImageId}?url=${firstImageUrl}`}>
                  <Image
                     src={gallery[0]}
                     className="rounded-lg"
                     width={1600}
                     height={800}
                     alt="Image - 1"
                  />
               </Link>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 h-[400px] gap-3">
               {newGallery.map((imgSrc, index) => {
                  const imageId = extractImageId(imgSrc);
                  const imageUrl = encodeURIComponent(imgSrc);
                  return (
                     <Link
                        href={`/image/${imageId}?url=${imageUrl}`}
                        key={imgSrc}
                     >
                        <Image
                           src={imgSrc}
                           className="w-full object-cover rounded-lg"
                           width={800}
                           height={800}
                           alt={`Gallery Image - ${index + 2}`}
                        />
                     </Link>
                  );
               })}
            </div>
         </div>
      </section>
   );
};

export default Gallery;
