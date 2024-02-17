declare namespace Home {
  type ArticleProps = {
    previewerName: string;
    previewerImage: string;
    date: string;
    title: string;
    slug: string;
    description: string;
    tags: string[];
    favoritesCount: number;
  };

  type GetTagsResponse = { tags: string[] };
}
