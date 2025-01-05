import type { User } from "@/models/user.model";

const Key = {
  USER_INFO: "user_info",
};

class LocalStorageService {
  private readonly store: Storage | null;

  constructor() {
    if (typeof window === "undefined") {
      this.store = null;
      return;
    }

    this.store = window.localStorage;
  }

  setUserInfo(user: User | null) {
    if (!this.store) return;
    this.store.setItem(Key.USER_INFO, JSON.stringify(user));
  }

  getUserInfo(): User | null {
    const user = this.store?.getItem(Key.USER_INFO);
    return user ? JSON.parse(user) : null;
  }

  invalidateUserInfo() {
    if (!this.store) return;
    this.store.removeItem(Key.USER_INFO);
  }
}

export default new LocalStorageService();
