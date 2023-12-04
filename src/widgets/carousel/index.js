import PrevBtn from './components/PrevBtn';
import NextBtn from './components/NextBtn';
import Sliders from './components/Sliders';
import Pagination from './components/Pagination';
import { CarouselProvider } from './providers/CarouselProvider';
import './carouselStyles.css';

export default function Carousel() {
    return (
        <div className="carousel">
            <CarouselProvider>
                <div className="carousel-container">
                    <PrevBtn />
                    <Sliders />
                    <NextBtn />
                </div>
                <Pagination />
            </CarouselProvider>
        </div>
    );

}