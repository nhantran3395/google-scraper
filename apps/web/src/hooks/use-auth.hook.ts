import { useState, useEffect } from "react";
import Router from "next/router";

import fetchJson, { FetchError } from "@/lib/fetch-json";
import LocalStorageService from "@/lib/local-storage.service";

import configs from "@/configs";

import { validateLoginResponse } from "@/responses/login.response";
import type { User } from "@/models/user.model";

export default function useUser({
  redirectTo = "",
  redirectIfFound = false,
} = {}) {
  const [user, setUser] = useState<User | null>(() => {
    return LocalStorageService.getUserInfo();
  });

  const [errorMsg, setErrorMsg] = useState<string>("");
  const isError = !!errorMsg;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  function handleError(error: unknown) {
    if (error instanceof FetchError) {
      console.log(error.data);
      setErrorMsg(error.data.message);
    } else {
      console.error("An unexpected error happened:", error);
      setErrorMsg("An unexpected error happened");
    }
  }

  function updateUser(newUser: User) {
    LocalStorageService.setUserInfo(newUser);
    setUser(newUser);
  }

  function resetError() {
    setErrorMsg("");
  }

  function signOut() {
    LocalStorageService.invalidateUserInfo();
    setUser(null);
  }

  async function login(credential: { email: string; password: string }) {
    setIsLoading(true);

    try {
      const data = await fetchJson(`${configs.BASE_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credential),
      });

      if (!validateLoginResponse(data)) {
        throw new Error("response type is invalid");
      }

      updateUser({
        token: data.token,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        isLoggedIn: true,
      });

      resetError();
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function register(newUser: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
    setIsLoading(true);

    try {
      await fetchJson(`${configs.BASE_API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      resetError();
      Router.push("/login");
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    if (!redirectTo) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  return {
    user,
    login,
    signOut,
    register,
    isError,
    errorMsg,
    resetError,
    isLoading,
  };
}
