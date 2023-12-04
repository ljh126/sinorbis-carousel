import { useCarouselPagination, useCarouselApi } from "../providers/CarouselProvider"

export default function Pagination() {
    const { totalPage, currentPage } = useCarouselPagination();
    const { onPage } = useCarouselApi();

    return <nav className='pagination'>
        <ul>
            {[...Array(totalPage)].map((p, i) => {
                return (
                    <li onClick={() => { onPage(i + 1) }} key={i}>
                        <span className={`circle-dot ${currentPage - 1 === i ? 'active': ''}`}></span>
                    </li>
                )
            })}
        </ul>
    </nav>
}