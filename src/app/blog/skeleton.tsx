import React from 'react'

const BlogItemSkeleton = () => {
    return (
        <div className="flex md:flex-row-reverse flex-col mb-3 gap-4 md:gap-10 items-center">
            {/* Image Skeleton */}
            <div className="item-image w-full md:w-[280px] h-[180px] bg-gray-200 rounded-md" />

            {/* Text Skeleton */}
            <div className="item-text md:text-right flex-1 w-full space-y-3">
                <p className="flex justify-start md:justify-end items-center gap-3 text-gray-400 text-sm">
                    <span className="w-24 h-4 bg-gray-300 rounded" />
                    <span className="w-20 h-4 bg-gray-300 rounded" />
                </p>

                <div className="w-full h-6 bg-gray-300 rounded-md" /> {/* Title */}
                <div className="w-full h-4 bg-gray-200 rounded-md" /> {/* Desc line 1 */}
                <div className="w-3/4 h-4 bg-gray-200 rounded-md" /> {/* Desc line 2 */}

                <div className="flex justify-start md:justify-end items-center gap-2 mt-2">
                    <div className="w-24 h-4 bg-gray-300 rounded" />
                    <div className="w-4 h-4 bg-gray-300 rounded-full" />
                </div>
            </div>
        </div>
    );
};

const BlogListSkeleton = () => {
    return (
        <div className="">
            {Array.from({ length: 6 }).map((_, index) => (
                <BlogItemSkeleton key={index} />
            ))}
        </div>
    );
};

export default BlogListSkeleton