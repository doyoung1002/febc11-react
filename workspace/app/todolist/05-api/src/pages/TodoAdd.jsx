import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

function TodoAdd() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    // mode: '', // 최초 검증 시점, default onSubmit
    // revalidateMode // 재검증 시점
    // criteriaMode // errors 객체에 첫 오류 하나만 포함하거나(firstError) 전부 포함(all), default firstError
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      cellphone: '010',
    },
  });

  const onSubmit = (item) => {
    console.log('서버에 전송', item);
  };

  return (
    <div id='main'>
      <h2>할일 추가</h2>
      <div className='todo'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor='title'>제목 :</label>
          <input
            type='text'
            id='title'
            autoFocus
            {...register('name', {
              required: '이름을 입력하세요.',
            })}
          />
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
          <br />
          <Link to='/list/1'>추가</Link>
          <Link to='/list'>취소</Link>
        </form>
      </div>
    </div>
  );
}

export default TodoAdd;
