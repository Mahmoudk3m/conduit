declare namespace SettingsTypes {
  type User = {
    username?: string;
    email?: string;
    password?: string;
    bio?: string;
    image?: string;
  };

  type UpdateResponseType = {
    user: {
      email: string;
      token: string;
      username: string;
      bio: string;
      image: string;
    };
  };
}
