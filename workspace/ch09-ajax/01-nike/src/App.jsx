import { useCallback, useEffect, useMemo, useState } from 'react';
import Product from './Product';
import Shipping from './Shipping';

function App() {
  console.log('App 렌더링'); // 1(맨처음)

  // const data = useMemo(
  //   () => ({
  //     _id: 2,
  //     price: 125000,
  //     shippingFees: 3000,
  //     name: '나이키 잼',
  //     quantity: 35,
  //     buyQuantity: 10,
  //     mainImage: '/files/00-nike/NIKE_JAM_01.jpg',
  //     content:
  //       '나이키가 세계적인 무대에 오르는 브레이크 댄서를 위해 제작한 첫 신발인 잼과 함께 몸과 마음, 정신을 하나로 만들어 보세요. 신발의 모든 디테일을 꼼꼼히 제작했기 때문에 자신 있게 사이퍼에 도전할 수 있습니다. 유연하고 내구성이 뛰어난 갑피가 몸을 따라 움직이며, 중창의 텍스처 처리된 핸드 그립 덕분에 공중에서 신발을 쉽게 잡을 수 있습니다. 그리고 위아래가 뒤집힌 로고를 배치해 프리즈 동작을 할 때 로고가 똑바로 보이는 재미를 더했죠.',
  //   }),
  //   []

  const [data, setData] = useState(); // 1(마운트)

  const fetchData = async (_id) => {
    const res = await fetch(`https://11.fesp.shop/products/${_id}`, {
      headers: {
        'client-id': '00-nike',
      },
    });
    console.log('res', res);
    const jsonData = await res.json();
    console.log('jsonData', jsonData);
    setData(jsonData.item); // 4번(마운트 후) - 화면 갱신
  };

  useEffect(() => {
    // 마운트 된 이후 호출 됨 3번
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
      <h1>01 NIKE 상품 상세 조회</h1>

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
