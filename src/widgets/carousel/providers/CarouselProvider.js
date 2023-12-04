import { createContext, useContext, useReducer, useMemo } from "react";
import { CAROUSEL_SLIDES_PER_PAGE, CAROUSEL_SLIDER_GAP, getSilderWidth } from "../Constants";

const imagesStore = [{
    id: 0,
    url: "https://woolworths.scene7.com/is/image/woolworthsgroupprod/wk22-2023-cvp-xmas-ideas-2x?wid=768&hei=512",
    alt: "",
}, {
    id: 1,
    url: "https://woolworths.scene7.com/is/image/woolworthsgroupprod/wk22-2023-cvp-xmas-gift-2x?wid=768&hei=512",
    alt: "",
}, {
    id: 2,
    url: "https://woolworths.scene7.com/is/image/woolworthsgroupprod/wk22-2023-cvp-decorations-2x?wid=768&hei=512",
    alt: "",
}, {
    id: 3,
    url: "https://woolworths.scene7.com/is/image/woolworthsgroupprod/wk21-2023-cvp-delivery-unlimited-2x?wid=768&hei=512",
    alt: "",
}, {
    id: 4,
    url: "https://woolworths.scene7.com/is/image/woolworthsgroupprod/wk20-2023-cvp-xmas-dtb-2x?wid=768&hei=512",
    alt: "",
}, {
    id: 5,
    url: "https://woolworths.scene7.com/is/image/woolworthsgroupprod/wk20-2023-cvp-xmas-delivery-2x?wid=768&hei=512",
    alt: "",
}, {
    id: 6,
    url: "https://woolworths.scene7.com/is/image/woolworthsgroupprod/wk22-2023-cvp-recipes-left-2x?wid=768&hei=512",
    alt: "",
}, {
    id: 7,
    url: "https://woolworths.scene7.com/is/image/woolworthsgroupprod/wk22-2023-cvp-recipes-middle-2x?wid=768&hei=512",
    alt: "",
}];

const CarouselAPIContext = createContext(null);
const CarouselSlidersContext = createContext(null);
const CarouselPaginationContext = createContext(null);

const handleSlide = (state, isNext) => {
    const totalSliderWidth = CAROUSEL_SLIDER_GAP + getSilderWidth();

    const pointTo = isNext ? state.pointTo + 1 : state.pointTo - 1;
    const end = isNext ? state.data.sliders.length + 1 : state.data.sliders.length;

    if ((isNext && state.page.currentPage === state.page.totalPage)
        || (!isNext && state.pointTo === CAROUSEL_SLIDES_PER_PAGE)) {
        return state;
    }

    let distance;
    if (isNext) {
        distance = isNaN(state.data.distance)
            ? -totalSliderWidth
            : -(Math.abs(state.data.distance) + totalSliderWidth);
    } else {
        distance = state.data.distance + totalSliderWidth;
    }

    let result = {
        ...state,
        data: {
            sliders: imagesStore.slice(0, end),
            distance: distance
        },
        pointTo: pointTo
    };

    if (result.pointTo % CAROUSEL_SLIDES_PER_PAGE === 0) {
        result = Object.assign(result, {
            page: {
                ...state.page,
                currentPage: Math.ceil(pointTo / CAROUSEL_SLIDES_PER_PAGE)
            }
        });
    }
    return result;
}
const handlePage = (state, toPage) => {
    const totalSliderWidth = CAROUSEL_SLIDER_GAP + getSilderWidth();

    if (toPage === state.page.currentPage) {
        return state;
    }

    let distance = -((toPage - 1) * CAROUSEL_SLIDES_PER_PAGE * totalSliderWidth);
    let pointTo = toPage > state.page.currentPage ? toPage * CAROUSEL_SLIDES_PER_PAGE : state.pointTo;
    return {
        ...state,
        data: {
            sliders: imagesStore.slice(0, pointTo),
            distance: distance,
        },
        page: {
            ...state.page,
            currentPage: toPage
        },
        pointTo: pointTo
    };
};
const reducer = (state, action) => {
    switch (action.type) {
        case "next-slider":
            return handleSlide(state, true);
        case "pre-slider":
            return handleSlide(state, false);
        case "page":
            return handlePage(state, action.page);
    }
};

export const CarouselProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, {
        data: {
            sliders: imagesStore.slice(0, CAROUSEL_SLIDES_PER_PAGE),
            distance: NaN
        },
        pointTo: CAROUSEL_SLIDES_PER_PAGE,
        page: {
            currentPage: 1,
            totalPage: Math.ceil(imagesStore.length / CAROUSEL_SLIDES_PER_PAGE)
        }
    });
    const api = useMemo(() => {
        const onNextSlider = () => {
            dispatch({ type: "next-slider" });
        };
        const onPreSlider = () => {
            dispatch({ type: "pre-slider" });
        };
        const onPage = (page) => {
            dispatch({ type: "page", page });
        };

        return { onNextSlider, onPreSlider, onPage };
    }, []);

    return (
        <CarouselAPIContext.Provider value={api}>
            <CarouselSlidersContext.Provider value={state.data}>
                <CarouselPaginationContext.Provider value={state.page}>
                    {children}
                </CarouselPaginationContext.Provider>
            </CarouselSlidersContext.Provider>
        </CarouselAPIContext.Provider>
    );
};

export const useCarouselApi = () => useContext(CarouselAPIContext);
export const useCarouselSliders = () => useContext(CarouselSlidersContext);
export const useCarouselPagination = () => useContext(CarouselPaginationContext);
