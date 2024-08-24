import React from "react";

const GraphLoader = () => {
    return (
        <div className="flex flex-col items-center justify-center space-y-4 h-72 w-full bg-gray-900 dark:bg-gray-800">
            <div className="animate-pulse h-6 bg-gray-700 dark:bg-gray-500 rounded-full w-1/2"></div>
            <div className="flex space-x-2 w-full justify-center">
                <div className="h-6 bg-gray-700 dark:bg-gray-500 rounded-full w-1/4"></div>
                <div className="h-6 bg-gray-700 dark:bg-gray-500 rounded-full w-1/4"></div>
                <div className="h-6 bg-gray-700 dark:bg-gray-500 rounded-full w-1/4"></div>
            </div>
            <div className="animate-pulse h-40 bg-gray-700 dark:bg-gray-500 rounded-lg w-full"></div>
        </div>
    );
};

export default GraphLoader;
