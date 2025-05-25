import { defineStore } from "pinia";
import { ref } from "vue";

export const useSession = defineStore("session", () => {
  const isLogin = ref(false);

  const trueLogin = () => {
      isLogin.value = true;
  };

    const setLogin = (token: string) => {
    document.cookie = `X-API-TOKEN=${token}; path=/; max-age=80000`;
    trueLogin();
  };

  const falseLogin = () => {
    isLogin.value = false;
    document.cookie = "X-API-TOKEN=; path=/; max-age=0";
  };

  const checkLogin = (): boolean => {
    const token = getCookie("X-API-TOKEN");
    return token != null;
  };

  function getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()!.split(";").shift()!;
    return null;
  }

  const getToken = (): string => {
      return getCookie('X-API-TOKEN')!;
  }

  return {
    isLogin,
    trueLogin,
    falseLogin,
    checkLogin,
    setLogin,
    getToken
  };
});
