declare namespace Article {
  type GetArticleResponse = {
    article: {
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
  };

  type Comment = {
    id: number;
    createdAt: string;
    updatedAt: string;
    body: string;
    author: {
      username: string;
      bio: string;
      image: string;
      following: boolean;
    };
  };

  type CommentResponse = {
    comment: Comment;
  };

  type GetCommentsResponse = {
    comments: [Comment];
  };
}
