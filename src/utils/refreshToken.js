import mem from "mem";
import axios from "axios";

const refreshTokenFn = async () => {
  const session = JSON.parse(localStorage.getItem("session"));

  try {
    const response = await axios.post("/refresh-token", {
      refreshToken: session?.refreshToken,
    });

    const { session } = response.data;

    if (!session?.accessToken) {
      localStorage.removeItem("session");
      localStorage.removeItem("user");
    }

    localStorage.setItem("session", JSON.stringify(session));

    return session;
  } catch (error) {
    localStorage.removeItem("session");
    localStorage.removeItem("user");
  }
};

const maxAge = 10000;

export const memoizedRefreshToken = mem(refreshTokenFn, {
  maxAge,
});
