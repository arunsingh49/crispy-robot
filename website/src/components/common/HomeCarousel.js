import React from 'react';
import { Carousel } from 'react-responsive-carousel';

export default () => (
	<Carousel autoPlay>
		<div>
			<img
				alt=""
				src="http://www.wellnez.in/wellnez/img/home/banner-1.jpg"
			/>
			<p className="legend">Legend 1</p>
		</div>
		<div>
			<img
				alt=""
				src="http://www.wellnez.in/wellnez/img/home/banner-2.png"
			/>
			<p className="legend">Legend 2</p>
		</div>
		<div>
			<img
				alt=""
				src="http://www.wellnez.in/wellnez/img/home/banner-3.jpg"
			/>
			<p className="legend">Legend 3</p>
		</div>
	</Carousel>
);
