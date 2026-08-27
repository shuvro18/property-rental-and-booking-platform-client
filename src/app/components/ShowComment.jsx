

import { getComments } from '../lib/data';
import Image from 'next/image';

const ShowComment = async ({ id }) => {
    const paramsId = id;

    const allComments = await getComments()


    const comments = allComments.filter(e => e.propertyId === paramsId)
   
    return (
        <div>
            <div className="space-y-4">
                {comments?.length === 0 ? (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        No comments yet. Be the first one to comment!
                    </p>
                ) : (
                    comments?.map((item) => (
                        <div
                            key={item._id}
                            className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 space-y-2"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xs">

                                        <Image src={item.image} height={100} width={100} alt='comenter' className='rounded-full' />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                                        {item.name}
                                    </h4>
                                </div>
                                <span className="text-xs text-gray-400 dark:text-gray-500">
                                    {new Date(item.date).toLocaleString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        hour12: true,
                                    })}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 pl-10">
                                {item.comments}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ShowComment;