import Image from 'next/image';

const Gallery = ({ gallery }: { gallery: string[] }) => {
   const newGallery = [...gallery];
   newGallery.shift();
   return (
      <section className="container">
         <div className="grid grid-cols-2 imageshowCase gap-3">
            <Image
               src={gallery[0]}
               className="h-[400px] rounded-lg"
               width={800}
               height={400}
               alt="Image - 1"
            />

            <div className="grid grid-cols-2 grid-rows-2 h-[400px] gap-3">
               {newGallery.map((imgSrc, index) => (
                  <Image
                     key={imgSrc}
                     src={imgSrc}
                     className="h-[400px] w-full object-cover rounded-lg"
                     width={400}
                     height={400}
                     alt={`Gallery Image - ${index + 2}`}
                  />
               ))}
            </div>
         </div>
      </section>
   );
};

export default Gallery;
