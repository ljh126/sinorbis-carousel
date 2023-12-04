import { setSilderWidth } from "../Constants";

export default function Image({ src, alt = "" }) {
    return (
        <img className='slider'src={src} alt={alt} onLoad={(e) => {
            setSilderWidth(Math.ceil(e.target.getBoundingClientRect().width));
        }}/>
    )
}