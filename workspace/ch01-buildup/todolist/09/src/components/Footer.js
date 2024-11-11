import index from '../../../index.js';

// 푸터 구성
function Footer() {
  return (
    index.createElement('footer', null,
      index.createElement('p', null, '멋쟁이 사자처럼 FrontEnd BootCamp'))
  );
}

export default Footer;