import Image from "next/image";

const Gallery = ({ gallery }:{gallery: string[]}) => {
  return (
    <section className="container">
      <div className="grid grid-cols-2 imageshowCase gap-3">
        <Image src={gallery[0]} className="h-[400px] rounded-lg" width={800} height={400} alt="Image - 1" />

        <div className="grid grid-cols-2 grid-rows-2 h-[400px] gap-3">
          <Image src={gallery[1]} className="h-[200px] w-full object-cover rounded-lg" width={400} height={400} alt="Image - 2" />
          <Image src={gallery[2]} className="h-[200px] w-full object-cover rounded-lg" width={400} height={400} alt="Image - 3" />
          <Image src={gallery[3]} className="h-[200px] w-full object-cover rounded-lg" width={400} height={400} alt="Image - 4" />
          <Image src={gallery[4]} className="h-[200px] w-full object-cover rounded-lg" width={400} height={400} alt="Image - 5" />
        </div>
      </div>
    </section>
  );
};

export default Gallery;
