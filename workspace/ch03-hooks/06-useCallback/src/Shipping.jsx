import PropTypes from 'prop-types';
import React, { memo } from 'react';

const Shipping = memo(function Shipping({ fees, handlePayment }) {
  return (
    <>
      <h2>배송비</h2>
      <div>
        배송비: {fees.toLocaleString()}원
        <br />
      </div>
      <br />
      <button
        type='button'
        onClick={handlePayment}
      >
        결제
      </button>
    </>
  );
});

Shipping.propTypes = {
  fees: PropTypes.number.isRequired,
  handlePayment: PropTypes.func.isRequired,
};

export default Shipping;
