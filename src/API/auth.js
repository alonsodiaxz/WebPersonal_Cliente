import { BASE_PATH, API_VERSION } from "./config";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/constants";
import jwtDecode from "jwt-decode";

export function getAccessToken() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  if (!accessToken || accessToken === null) {
    return null;
  }

  const tokenExpirado = willExpireToken(accessToken);

  return tokenExpirado ? null : accessToken;
}

export function getRefreshToken() {
  const refresToken = localStorage.getItem(REFRESH_TOKEN);

  if (!refresToken || refresToken === null) {
    return null;
  }
  const tokenExpirado = willExpireToken(refresToken);

  return tokenExpirado ? null : refresToken;
}

export function refreshAccessToken(refreshToken) {
  const url = `${BASE_PATH}/${API_VERSION}/refresh-access-token`;
  const bodyObj = {
    refreshToken: refreshToken,
  };
  const params = {
    method: "POST",
    body: JSON.stringify(bodyObj),
    headers: { "Content-Type": "application/json" },
  };

  fetch(url, params)
    .then((response) => {
      if (response.status !== 200) {
        return null;
      }
      return response.json();
    })
    .then((result) => {
      //Si no hay result significa que tanto el accesToken como el refreshToken han caducado y no queda otra que deslogear al usuario
      if (!result) {
        logout();
      } else {
        const { accessToken, refreshToken } = result;
        localStorage.setItem(ACCESS_TOKEN, accessToken);
        localStorage.setItem(REFRESH_TOKEN, refreshToken);
      }
    })
    .catch((err) => {
      return err.message;
    });
}

export function logout() {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
}

function willExpireToken(token) {
  const seconds = 60;
  const metaToken = jwtDecode(token);
  const { exp } = metaToken;
  const now = (Date.now() + seconds) / 1000;
  if (now > exp) {
    return true;
  } else {
    return false;
  }
}
