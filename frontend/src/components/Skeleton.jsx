import React from 'react';

const Skeleton = ({ className }) => (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl ${className}`}></div>
);

export const PlaceSkeleton = () => (
    <div className="bg-white dark:bg-heritage-dark-surface rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-white/5 h-full">
        <Skeleton className="h-56 w-full rounded-none" />
        <div className="p-6 space-y-4">
            <div className="flex justify-between items-start">
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-6 w-12" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <div className="flex justify-between items-center pt-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
            </div>
        </div>
    </div>
);

export const CulinarySkeleton = () => (
    <div className="bg-white dark:bg-heritage-dark-surface rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-white/5 flex flex-col md:flex-row h-full">
        <Skeleton className="h-48 md:h-full md:w-1/3 rounded-none" />
        <div className="p-6 flex-1 space-y-4">
            <div className="flex justify-between items-start">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-6 w-16" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <div className="flex gap-4 pt-2">
                <Skeleton className="h-8 w-24 rounded-full" />
                <Skeleton className="h-8 w-20 rounded-full" />
            </div>
        </div>
    </div>
);

export default Skeleton;
