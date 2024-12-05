import useAxiosInstance from '@hooks/useAxiosInstance';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';

function TodoEdit() {
  // Outlet 컴포넌트의 context 속성에 전달되는 값 추출
  const { item } = useOutletContext();

  // 프로그래밍 방식으로 페이지 이동에 사용
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: item.title,
      content: item.content,
      done: item.done,
    },
  });

  // axios 인스턴스
  const axios = useAxiosInstance();
  const queryClient = useQueryClient();

  // 수정 작업
  const editItem = useMutation({
    mutationFn: (formData) => axios.patch(`/todolist/${item._id}`, formData),
    onSuccess: () => {
      alert('할 일이 수정 되었습니다.');
      queryClient.invalidateQueries(['todolist', item._id]);
      navigate(-1);
    },
    onError: (err) => {
      console.error('서버에서 에러 응답');
      alert(err?.message || '할 일 수정에 실패했습니다.');
    },
  });

  // const onSubmit = async (formData) => {
  //   try {
  //     // hook은 이벤트에 의해서 호출되는 경우에는 사용이 불가능, 조회는 가능
  //     // TODO: API 서버에 수정 요청
  //     await axios.patch(`/todolist/${item._id}`, formData);

  //     alert('할 일이 수정 되었습니다.');

  //     // 할 일 상세보기로 이동
  //     // navigate('..', { relative: true }); // 상대 경로로 이동
  //     // navigate(`/list/${item._id}`, { replace: true }); // window.history.replaceState
  //     navigate(-1); // navigate에 숫자를 전달하면 히스토리 back이 된다. window.history.back(-1)
  //     refetch();
  //   } catch (err) {
  //     console.error(err);
  //     alert('할 일 수정에 실패했습니다.');
  //   }
  // };

  return (
    <>
      <h2>할일 수정</h2>
      <div className='todo'>
        <form onSubmit={handleSubmit(editItem.mutate)}>
          <label htmlFor='title'>제목 :</label>
          <input
            type='text'
            id='title'
            autoFocus
            {...register('title', {
              required: '제목을 입력하세요.',
            })}
          />
          <div className='input-error'>{errors.title?.message}</div>
          <br />
          <label htmlFor='content'>내용 :</label>
          <textarea
            id='content'
            cols='23'
            rows='5'
            {...register('content', {
              required: '내용을 입력하세요.',
            })}
          />
          <div className='input-error'>{errors.content?.message}</div>
          <br />
          <label htmlFor='done'>완료 :</label>
          <input
            type='checkbox'
            id='done'
            {...register('done')}
          />
          <br />
          <button type='submit'>수정</button>
          <Link to={`/list/${item._id}`}>취소</Link>
        </form>
      </div>
    </>
  );
}

export default TodoEdit;
