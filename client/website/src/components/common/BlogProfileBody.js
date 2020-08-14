import React, { Component } from 'react';
import ReactHTMLParser from 'react-html-parser';

import BreadCrumbs from '../common/BreadCrumbs';

class BlogBody extends Component {
  breadCrumbsData = () => {
    const { title, category } = this.props.data;
    return [
      { id: 1, name: 'Home', url: '/', isActive: false },
      {
        id: 2,
        name: `${category.name}`,
        url: `../ls/${category.url}`,
        isActive: false,
      },
      { id: 3, name: `${title}`, url: '', isActive: true },
    ];
  };

  render() {
    const {
      title,
      headerImagePath,
      headerImageAltDesc,
      headerImageWidth,
      headerImageHeight,
      body,
    } = this.props.data;
    return (
      <div className="col-lg-8 col-md-8 col-sm-8">
        <div className="blog-content">
          <div className="single-Blog">
            <div className="single-blog-right">
              <div className="blog-img blog-content blog-details">
                <h1>{title}</h1>
                <BreadCrumbs data={this.breadCrumbsData()} />
                <img
                  src={headerImagePath}
                  alt={headerImageAltDesc}
                  width={headerImageWidth}
                  height={headerImageHeight}
                  className="blog-img header-image"
                ></img>
                <div className="blog-body">{ReactHTMLParser(body)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BlogBody;
