
import Image from './Image';
import { useCarouselSliders, useCarouselApi } from "../providers/CarouselProvider";
import { SwipeableContainer } from '../containers/SwipeableContainer';

export default function Sliders() {
    const {sliders} = useCarouselSliders();
    const { onNextSlider, onPreSlider } = useCarouselApi();
    
    return (
        <SwipeableContainer onNext={onNextSlider} onPre={onPreSlider}>
            {sliders.map((slider) => {
                return <Image src={slider.url} key={slider.id} alt={slider.alt} />;
            })}
        </SwipeableContainer>
    )
}