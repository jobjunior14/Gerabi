export default function Loading () {
    return (
        <div className="relative items-center justify-center top-40 my-5"> 
        <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 rounded-full animate-pulse dark:bg-indigo-400"></div>
            <div className="w-3 h-3 rounded-full animate-pulse dark:bg-indigo-400"></div>
            <div className="w-3 h-3 rounded-full animate-pulse dark:bg-indigo-400"></div>
        </div>
        </div>
    );
}