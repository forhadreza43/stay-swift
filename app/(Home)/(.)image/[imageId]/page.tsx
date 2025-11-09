import ImageModal from "./ImageModal";

export default async function ImageInterceptingPage({
  params,
  searchParams,
}: {
  params: Promise<{ imageId: string }>;
  searchParams: Promise<{ url?: string }>;
}) {
  const { imageId } = await params;
  const { url } = await searchParams;
  const imageUrl = url ? decodeURIComponent(url) : null;

  return <ImageModal imageUrl={imageUrl} imageId={imageId} />;
}
