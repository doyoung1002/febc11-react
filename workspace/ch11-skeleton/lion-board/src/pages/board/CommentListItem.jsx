import useAxiosInstance from '@hooks/useAxiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useUserStore from '@zustand/userStore';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';

CommentListItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.number.isRequired,

    user: PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.object,
      _id: PropTypes.number,
    }).isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    // updateAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default function CommentListItem({ item }) {
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const axios = useAxiosInstance();
  const { _id } = useParams();

  const removeItem = useMutation({
    // useParams()에서 받아온 _id : 게시글의 고유한 id === {_id}
    // prop(=item)으로 받아온 _id : 댓글의 고유한 id === {reply_id}
    mutationFn: (_id) => axios.delete(`/posts/${_id}/replies/${item._id}`),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', _id] });
    },
  });

  return (
    <div className='shadow-md rounded-lg p-4 mb-4'>
      <div className='flex justify-between items-center mb-2'>
        {item.user.image && (
          <img
            className='w-8 mr-2 rounded-full'
            src={`https://11.fesp.shop${item.user.image.path}`}
            alt={`${item.user.name} 프로필 이미지`}
          />
        )}
        <Link
          to=''
          className='text-orange-400'
        >
          {item.user.name}
        </Link>
        <time
          className='ml-auto text-gray-500'
          dateTime={`${item.createdAt}`}
        >
          {item.createdAt}
        </time>
      </div>
      <div className='flex justify-between items-center mb-2'>
        <pre className='whitespace-pre-wrap text-sm'>{item.content}</pre>

        {user?._id === item.user._id && (
          <button
            onClick={() => removeItem.mutate(_id)}
            type='button'
            className='bg-red-500 py-1 px-2 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded'
          >
            삭제
          </button>
        )}
      </div>
    </div>
  );
}
