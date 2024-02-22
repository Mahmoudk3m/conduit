declare namespace Home {
  type ArticleProps = {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: [string];
    createdAt: Date;
    updatedAt: Date;
    favorited: boolean;
    favoritesCount: number;
    author: {
      username: string;
      bio: string;
      image: string;
      following: boolean;
    };
  };

  type GetTagsResponse = { tags: string[] };

  type GetArticlesResponse = {
    articles: ArticleProps[];
    articlesCount: number;
  };

  type GetArticlesParams = {
    params: {
      tag?: string;
      author?: string;
      favorited?: string;
      offset?: number;
      limit?: number;
    };
  };
}
