let CAROUSEL_SLIDER_WIDTH;
const setSilderWidth = (width) => {
    CAROUSEL_SLIDER_WIDTH = width;
};

const getSilderWidth = () => {
    return CAROUSEL_SLIDER_WIDTH;
};

export { setSilderWidth, getSilderWidth };
export const CAROUSEL_SLIDER_GAP = 15;
export const CAROUSEL_SLIDES_PER_PAGE = 3;
