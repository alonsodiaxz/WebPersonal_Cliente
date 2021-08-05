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
