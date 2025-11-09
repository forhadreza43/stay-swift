import Image from "next/image";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ imageId: string; url?: string }>;
}): Promise<Metadata> {
  const { imageId } = await params;
  return {
    title: `Image ${imageId}`,
  };
}

export default async function ImagePage({
  params,
  searchParams,
}: {
  params: Promise<{ imageId: string }>;
  searchParams: Promise<{ url?: string }>;
}) {
  const { imageId } = await params;
  const { url } = await searchParams;
  const imageUrl = url ? decodeURIComponent(url) : null;

  if (!imageUrl) {
    return (
      <div className="container py-8">
        <p className="text-center text-muted-foreground">Image not found</p>
      </div>
    );
  }

  return (
    <div className="w-full p-10 bg-gray-900">
      <div className="flex justify-center items-center min-h-[90vh]">
        <div className="relative w-full h-[90vh] aspect-video">
          <Image
            src={imageUrl}
            alt={`Image ${imageId}`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
            priority
          />
        </div>
      </div>
    </div>
  );
}
