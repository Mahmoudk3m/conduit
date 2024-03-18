declare namespace ArticleTypes {
  interface Author {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  }

  interface ArticleRequest {
    title: string;
    description: string;
    body: string;
    tagList: string[] | undefined;
  }

  interface ArticleResponse {
    article: {
      slug: string;
      title: string;
      description: string;
      body: string;
      tagList: string[];
      createdAt: string;
      updatedAt: string;
      favorited: boolean;
      favoritesCount: number;
      author: Author;
    };
  }
}
