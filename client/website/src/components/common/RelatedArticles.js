import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RelatedArticles extends Component {
  state = {
    data: [],
  };
  render() {
    const { data } = this.props;
    return (
      <div className="col-lg-4 col-md-4 col-sm-4">
        <div className="sidebar">
          <div className="sidebar-widget">
            <h3>Related Posts</h3>
            <ul className="popular-tab">
              {data.map((item) => {
                return (
                  <li key={item._id}>
                    <div className="media">
                      <div className="media-left">
                        <Link
                          to={`../../${item.urlTitle}`}
                          title={item.title}
                          className="news-img"
                        >
                          <img
                            alt={item.headerThumbnailImageAltDesc}
                            src={item.headerThumbnailImagePath}
                            width={item.headerThumbnailImageWidth}
                            heigth={item.headerThumbnailImageHeight}
                            className="media-object"
                          />
                        </Link>
                      </div>
                      <div className="media-body">
                        <Link
                          to={`../../${item.urlTitle}`}
                          title={item.title}
                          onClick={this.props.onArticleChange}
                        >
                          {item.title}
                          <p className="read-more"> Read » </p>
                        </Link>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default RelatedArticles;
