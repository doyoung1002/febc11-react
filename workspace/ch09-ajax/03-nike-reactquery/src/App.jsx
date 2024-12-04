import { useCallback, useEffect, useState } from 'react';
import Product from './Product';
import Shipping from './Shipping';
import { DotLoader } from 'react-spinners';
import useAxiosInstance from '@hooks/useAxiosInstance';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMutation, useQuery } from '@tanstack/react-query';

function App() {
  const axios = useAxiosInstance();

  // const [data, setData] = useState(); // 1(마운트)
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  // const fetchData = async (_id) => {
  //   setIsLoading(true);
  //   try {
  //     // const res = await axios.get(`/products/${_id}`, { params: { delay: 1000 } });
  //     const res = await axios.get(`/products/${_id}`);
  //     console.log('res', res);
  //     setData(res.data.item); // 4번(마운트 후) - 화면 갱신
  //     setError(null);
  //   } catch (err) {
  //     // 네트워크 에러, 4xx, 5xx 응답일 경우 catch 블럭이 실행이 됨
  //     setError(err);
  //     setData(null);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   // 마운트 된 setUp함수가 호출 되고 fetchData가 실행됨
  //   fetchData(7); // 3번(마운트 된 후)
  // }, []); // 마운트 된 이후에 최초 한번만 실행

  // 상품 상세 조회
  // refetch 이는 다시 서버에 요청하는 작업
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['products', 7], // 캐시에 사용할 키 값을 지정(7번 상품)
    queryFn: () => axios.get(`/products/7`), // 서버에 ajax 요청 코드(Promise 반환)
    // axios.get(`/products/7`) 의 return 값이 res로 전달됨
    select: (res) => res.data.item,
    // 더 복잡한 로직이 필요하다면 return을 해주면 된다. 아래와 같이
    // { const hello = 'world';
    // res.data.item.hello = hello;
    // return res.data.item},
  });

  // 상품 구매 - 이벤트 핸들러 안에서 서버와 통신하는 삭제, 수정 등은 useMutation을 사용
  const orderProduct = useMutation({
    // useMutation() 반환한 객체의 mutate() 호출하면 mutationFn 호출됨
    // 아래 코드는 호출되지 않는다. 이는 mutate()에서 사용이 된다.
    mutationFn: (products) => axios.post(`/orders`, products),

    // mutationFn 실행이 정상적으로 완료될 경우
    onSuccess: () => {
      toast.success('주문이 완료되었습니다.');
      refetch(); // 상품 상테 조회를(useQuery) 다시 호출
    },
    // mutationFn 실행 중 에러가 뜨면 아래 코드 실행
    onError: (err) => {
      console.error(err);
    },
  });

  console.log('isLoading', isLoading);
  console.log('error', error);
  console.log('data', data);

  const basicShippingFees = 3000;

  const [quantity, setQuantity] = useState(1);
  const [shippingFees, setShippingFees] = useState(basicShippingFees);

  // 수량이 변경되면 배송비 다시 계산
  const handleQuantityChange = (e) => {
    const newQuantity = Number(e.target.value);
    setShippingFees(basicShippingFees * Math.ceil(newQuantity / 5));
    setQuantity(newQuantity);
  };

  // 생성될 당시의 shippingFees를 참조하고 있음
  // 수량 6개가 되면 배송비 상태가 변경이 되면서 렌더링이 되는데 어차피 수량은 계속 변하기 때문이다.
  // 숫자가 바뀌면 렌더링이 되어야 하기때문에 useCallback으로 캐시하는건 의미가 없다.
  const handlePayment = () => {
    const ok = confirm(`배송비 ${shippingFees}원이 추가됩니다. 상품을 결제하시겠습니까?`);
    if (ok) {
      // mutateFn() 호출
      orderProduct.mutate({
        products: [{ _id: 7, quantity }],
      });
    }
  };

  // return <h1></h1> 2번(마운트)
  return (
    <>
      <h1>03 NIKE 상품 상세 조회 - React Query</h1>
      {isLoading && <DotLoader />}
      {error && <p>{error.message}</p>}
      {data && ( // 첫 마운트일 때 데이터가 없기 때문에 undefined
        <div>
          <Product product={data} />

          <h2>수량 선택</h2>
          <div>
            가격: {data.price.toLocaleString()}원
            <br />
            남은 수량 : {data.quantity - data.buyQuantity}
            <br />
            수량:{' '}
            <input
              type='number'
              min='1'
              max={data.quantity - data.buyQuantity}
              value={quantity}
              onChange={handleQuantityChange}
            />
            (배송비는 5개당 {basicShippingFees.toLocaleString()}원씩 추가됩니다.)
            <br />
            상품 금액:{(data.price * quantity).toLocaleString()}원
          </div>
          <Shipping
            fees={basicShippingFees}
            handlePayment={handlePayment}
          />
        </div>
      )}
      <ToastContainer
        position='top-center'
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        transition:Bounce
      />
    </>
  );
}

export default App;
