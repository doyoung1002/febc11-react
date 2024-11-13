// 06-04.js 복사

function f1() {
  return new Promise((resolve, reject) => {
    console.log(`2. f1 작업 시작.`);
    console.log(`3. f1 작업중...`);

    setTimeout(() => {
      // ......
      console.log(`4. f1 작업 종료.`);
      // resolve 첫번째 인자는 작업이 성공적으로 끝날 때 호출할 함수 - 이름은 자유롭게 작성 가능
      resolve(`f1의 결과물`);
      // reject 두번째 인자는 에러가 발생했을 때 호출할 함수 - 이름은 자유롭게 작성 가능
      reject(new Error('에러 발생'));
    }, 1000);
  });
}

function f2(f1Result) {
  return new Promise((resolve, reject) => {
    console.log(`5. ${f1Result}로 f2 작업 시작.`);
    console.log(`6. f2 작업중...`);

    setTimeout(() => {
      // ......
      console.log(`7. f2 작업 종료.`);
      resolve(`최종 결과물`);
    }, Math.random() * 2000);
  })
}

// 동기함수 호출하듯이 비동기 함수로 실행되게끔 하는 것이 async, await
// async를 붙이면 Promise를 리턴함.
async function test() {
  try {
    const f1Result = await f1();
    const result = await f2(f1Result);
    console.log('8', result);
    // return new Promise();
  } catch (err) {
    console.error(err);
  }
}

console.log('1. 테스트 시작.');
test();
console.log('9. 테스트 완료.');