import useUserStore from '@zustand/userStore';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

// access token 재발급 URL
const REFRESH_URL = '/auth/refresh';

function useAxiosInstance() {
  const { user, setUser } = useUserStore();

  const navigate = useNavigate();
  const location = useLocation();

  const instance = axios.create({
    baseURL: 'https://11.fesp.shop',
    timeout: 1000 * 15,
    headers: {
      'Content-Type': 'application/json', // request의 데이터 타입
      accept: 'application/json', // response의 데이터 타입
      'client-id': '00-board',
    },
  });

  // 요청 인터셉터 추가하기
  instance.interceptors.request.use((config) => {
    if (user) {
      let token = user.accessToken;
      if (config.url === REFRESH_URL) {
        token = user.refreshToken;
      }
      config.headers['Authorization'] = `Bearer ${token}`; // 일반 회원
    }

    // 요청이 전달되기 전에 필요한 공통 작업 수행
    config.params = {
      delay: 500,
      ...config.params, // 기존 쿼리스트링 복사
    };
    return config;
  });

  // 응답 인터셉터 추가하기
  instance.interceptors.response.use(
    (response) => {
      // 2xx 범위에 있는 상태 코드는 이 함수가 호출됨
      // 응답 데이터를 이용해서 필요한 공통 작업 수행

      return response;
    },
    async (error) => {
      // 2xx 외의 범위에 있는 상태 코드는 이 함수가 호출됨
      // 공통 에러 처리
      console.error('인터셉터', error);

      const { config, response } = error;

      if (response?.status === 401) {
        // 인증 실패 401
        if (config.url === REFRESH_URL) {
          // refresh token 만료
          const gotoLogin = confirm('로그인 후에 이용 가능합니다. \n로그인 페이지로 이동하시겠습니까?');
          gotoLogin && navigate('/users/login', { state: { from: location.pathname } });
          // state로 내가 마지막에 어디에서 작업을 했는지, 기억하게끔 저장하는 것
        } else {
          // 로그인하지 않았거나 access token 만료된 경우
          // refresh 토큰으로 access 토큰 재발급 요청
          const accessToken = await getAccessToken(instance);
          if (accessToken) {
            // 갱신된 accessToken으로 요청을 다시 보냄
            // 사용자가 재발급 받는걸 눈치 못채게 해야함
            // 그래서 다시 서버 요청함
            config.headers.Authorization = `Bearer ${accessToken}`;
            return axios(config);
          }
        }
      } else {
        return Promise.reject(error);
      }
    }
  );

  // access token 재발급
  async function getAccessToken(instance) {
    try {
      // 서버로부터 받은 data
      const {
        data: { accessToken },
      } = await instance.get(REFRESH_URL);
      // 기존에 있던 엑세스토큰을 새로운 액세스토큰으로 갱신
      setUser({ ...user, accessToken });
      return accessToken;
    } catch (err) {
      console.error(err);
    }
  }

  return instance;
}

export default useAxiosInstance;
