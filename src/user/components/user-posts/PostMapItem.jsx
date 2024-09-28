import { formatDistanceToNow } from "date-fns";

export default function PostMapItem({ post }) {
    const postDate = new Date(post.createdAt);
    const isRecent = Date.now() - postDate.getTime() < 24 * 60 * 60 * 1000;

    const displayDate = isRecent
        ? `${formatDistanceToNow(postDate, { addSuffix: true })}`
        : `${postDate.toLocaleDateString()}`;

    return (
        <div>
            <img
                className="object-cover w-full rounded-sm md:rounded-md"
                src={post.images[0]}
                alt={post.title}
                style={{ height: "200px" }}
            />
            <div className="md:flex flex-col !rounded-none !md:rounded-md flex-grow p-2 w-full justify-between hidden">
                <h5 className="text-lg font-bold tracking-tighttext-text">
                    {post.title}
                </h5>
                <p className="!m-0 !mb-2 text-text text-sm flex items-center">
                    Posted: {displayDate}
                </p>
                <p className="text-text flex items-center !m-0">
                    {post.description}
                </p>
            </div>
        </div>
    );
}
