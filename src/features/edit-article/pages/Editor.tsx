import ArticleForm from "../components/ArticleForm";

export default function Editor() {
  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <ArticleForm />
          </div>
        </div>
      </div>
    </div>
  );
}
