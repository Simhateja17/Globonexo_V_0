import { getMedia } from "@/lib/actions/cms";
import { MediaLibrary } from "@/components/admin/media-library";

export default async function MediaPage() {
  let media: Awaited<ReturnType<typeof getMedia>> = [];
  try {
    media = await getMedia();
  } catch {
    // Tables may not exist yet
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Media Library</h1>
        <p className="text-muted-foreground mt-1">
          Upload and manage images, documents, and other files.
        </p>
      </div>
      <MediaLibrary initialMedia={media} />
    </div>
  );
}
