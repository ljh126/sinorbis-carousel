import { useRef, useEffect } from 'react';
import { useCarouselSliders } from "../providers/CarouselProvider";

export function SwipeableContainer({children, onNext, onPre}) {
    const sliderRef = useRef(null);
    const {distance} = useCarouselSliders();

    useEffect(() => {
        if (!isNaN(distance)) {
            sliderRef.current.style.transform = `translateX(${distance}px)`;
            console.log(`translateX(${distance}px)`);
        }
    }, [distance]);
    
    let startX, startY, dist, startTime, elapsedTime, threshold = 150, allowedTime = 200;
    const handleOnTouchStart = (event) => {
        const touchObj = event.changedTouches[0];
        dist = 0;
        startX = touchObj.pageX;
        startY = touchObj.pageY;
        startTime = new Date().getTime();
    };
    const handleOnTouchEnd = (event) => {
        const touchObj = event.changedTouches[0];
        dist = touchObj.pageX - startX;
        elapsedTime = new Date().getTime() - startTime;

        let swiperightBol = elapsedTime <= allowedTime && Math.abs(dist) >= threshold && Math.abs(touchObj.pageY - startY) <= 100;
        if (swiperightBol) {
            ( dist < 0 ? onNext() : onPre());
        }
    };

    return (
        <div className="carousel-sliders" ref={sliderRef} onTouchStart={handleOnTouchStart} onTouchEnd={handleOnTouchEnd}>
            {children}
        </div>
    );
}