import Link from 'next/link';
import React from 'react';

export default function ListItem({ item }) {
  return (
    <tr className='border-b border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 ease-in-out'>
      <td className='p-2 text-center'>{item.user._id}</td>
      <td className='p-2 truncate indent-4'>
        <Link
          href={`/${item.type}/${item._id}`} // 절대경로
          // href={`/${item._id}`} // 상대경로
          className='cursor-pointer'
        >
          {item.title}
        </Link>
      </td>
      <td className='p-2 text-center truncate'>{item.user.name}</td>
      <td className='p-2 text-center hidden sm:table-cell'>{item.views}</td>
      <td className='p-2 text-center hidden sm:table-cell'>{item.repliesCount}</td>
      <td className='p-2 truncate text-center hidden sm:table-cell'>{item.updatedAt}</td>
    </tr>
  );
}
