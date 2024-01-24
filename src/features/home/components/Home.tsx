import Banner from "./Banner";
import FeedToggler from "./FeedToggler";
import Article from "./Article";
import Pagination from "./Pagination";
import Tags from "./Tags";

export default function Home() {
  return (
    <div className="home-page">
      <Banner />
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggler />
            <Article
              previewerName="Eric Simons"
              previewerImage="http://i.imgur.com/Qr71crq.jpg"
              date="January 20th"
              title="How to build webapps that scale"
              slug="how-to-build-webapps-that-scale"
              description="This is the description for the post."
              tags={["realworld", "implementations"]}
              favoritesCount={29}
            />
            <Article
              previewerName="Albert Pai"
              previewerImage="http://i.imgur.com/N4VcUeJ.jpg"
              date="January 20th"
              title="The song you won't ever stop singing. No matter how hard you try."
              slug="the-song-you"
              description="This is the description for the post."
              tags={["realworld", "implementations"]}
              favoritesCount={32}
            />
            <Pagination />
          </div>

          <div className="col-md-3">
            <Tags />
          </div>
        </div>
      </div>
    </div>
  );
}
