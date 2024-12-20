import { useCallback, useEffect, useState } from 'react';
import Product from './Product';
import Shipping from './Shipping';
import { DotLoader } from 'react-spinners';

function App() {
  const [data, setData] = useState(); // 1(마운트)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (_id) => {
    setIsLoading(true);
    try {
      const res = await fetch(`https://11.fesp.shop/123products/${_id}?delay=3000`, {
        headers: {
          'client-id': '00-nike',
        },
      });
      console.log('res', res);
      const jsonData = await res.json();
      console.log('jsonData', jsonData);
      if (res.ok) {
        setData(jsonData.item); // 4번(마운트 후) - 화면 갱신
        setError(null);
      } else {
        // 4xx, 5xx 응답 상태코드를 받을 경우
        setError(jsonData);
        setData(null);
      }
    } catch (err) {
      // 네트워크 에러(fetch)
      console.error(err);
      setError({ message: '잠시 후 다시 요청하세요.' });
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // 마운트 된 setUp함수가 호출 되고 fetchData가 실행됨
    fetchData(4); // 3번(마운트 된 후)
  }, []); // 마운트 된 이후에 최초 한번만 실행

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
  const handlePayment = useCallback(() => {
    alert(`배송비 ${shippingFees.toLocaleString()}원이 추가됩니다. 상품을 결제하시겠습니까?`);
  }, [shippingFees]);

  // return <h1></h1> 2번(마운트)
  return (
    <>
      <h1>01 NIKE 상품 상세 조회 - Fetch API</h1>
      {isLoading && <DotLoader />}
      {error && <p>{error.message}</p>}

      {data && ( // 첫 마운트일 때 데이터가 없기 때문에 undefined
        <div>
          <Product product={data} />

          <h2>수량 선택</h2>
          <div>
            가격: {data.price.toLocaleString()}원
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
    </>
  );
}

export default App;
