declare namespace AuthTypes {
  interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
  }

  interface User {
    email: string;
    token: string;
    username: string;
    bio: string;
    image: string;
  }

  interface AuthResponse {
    user: User;
  }

  interface LoginPayload {
    user: {
      email: string;
      password: string;
    };
  }

  interface RegisterPayload {
    user: {
      username: string;
      email: string;
      password: string;
    };
  }
}
