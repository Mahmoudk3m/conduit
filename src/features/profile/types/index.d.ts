declare namespace Profile {
  type GetProfileResponse = {
    profile: {
      username: string;
      bio: string | null;
      image: string;
      following: boolean;
    };
  };
}
