import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const Authenticate = () => {
  const router = useRouter();
  const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
  const baseURL = process.env.REACT_APP_BASE_URL
  useEffect(() => {
    console.log("window.location.href: ", window.location.href);

    const accessTokenRegex = /code=([^&]+)/;
    const isMatch = window.location.href.match(accessTokenRegex);

    console.log("isMatch: ", isMatch);

    if (isMatch) {
      const authCode = isMatch[1];
      axios.post(`${baseURL}/auth/oauth2/authentication?code=${authCode}`, {
        code: authCode
      }).then((response: any) => {
        const { accessToken, refreshToken } = response.data;
        Cookies.set('accessToken', accessToken, {
          path: '/',
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'Strict',
          expires: 7, // 7 ngày
        });
        Cookies.set('refreshToken', refreshToken, {
          path: '/',
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'Strict',
          expires: 7, // 7 ngày
        });
        setIsLoggedin(true);
      }).catch((error) => {
        console.log("error: ", error);
      });
    }
  }, []);

  useEffect(() => {
    if (isLoggedin) {
      router.push("/");
    }
  }, [isLoggedin, router]);

  return (
    <div className="authenticate">
      <div className="loading-card">
        <div className="spinner" />
        <p className="loading-text">Vui lòng chờ<br />Đang đăng nhập bằng Google...</p>
      </div>
    </div>
  )
}

export default Authenticate
