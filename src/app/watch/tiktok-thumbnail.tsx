import { extractTikTokVideoId } from "@/infrastructure/helper/helper";
import { useEffect, useState } from "react";

type Props = {
    url: string;
    width?: number;
    height?: number;
};

const TikTokThumbnail = ({ url }: Props) => {
    const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchThumbnail = async () => {
            try {
                // Bước 1: Lấy video ID từ URL
                const videoId = extractTikTokVideoId(url);
                if (!videoId) throw new Error('Invalid TikTok URL');

                // Bước 2: Gọi oEmbed API của TikTok
                const oEmbedUrl = `https://www.tiktok.com/oembed?url=https://www.tiktok.com/@placeholder/video/${videoId}`;
                const response = await fetch(oEmbedUrl);

                if (!response.ok) throw new Error('Failed to fetch thumbnail info');

                const data = await response.json();

                // Bước 3: Lấy thumbnail URL từ response
                if (data.thumbnail_url) {
                    setThumbnailUrl(data.thumbnail_url);
                } else {
                    throw new Error('No thumbnail available');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load thumbnail');
            }
        };

        fetchThumbnail();
    }, [url]);

    // Hàm lấy video ID từ URL TikTok

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!thumbnailUrl) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="youtube-thumbnail">
            <img
                src={thumbnailUrl}
                alt="TikTok video thumbnail"
                onError={() => setError('Failed to load thumbnail image')}
            />
        </div>
    );
};

export default TikTokThumbnail;