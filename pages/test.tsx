import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css'

const responsive = {
desktop: {
breakpoint: { max: 3000, min: 1024 },
			items: 1,
			paritialVisibilityGutter: 60
		 },
tablet: {
breakpoint: { max: 1024, min: 464 },
			items: 1,
			paritialVisibilityGutter: 40
		},
mobile: {
breakpoint: { max: 464, min: 0 },
			items: 1,
			paritialVisibilityGutter: 40
		}
};

const Test = () => {
	return (
			<div style={{marginTop: "100px"}}>
			<Carousel responsive={responsive}>
			<img src="https://img-19.ccm2.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg" />
			<img src="https://img-19.ccm2.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg" />
			<img src="https://img-19.ccm2.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg" />
			<img src="https://img-19.ccm2.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg" />
			</Carousel>
			</div>
		   );
}

export default Test;
