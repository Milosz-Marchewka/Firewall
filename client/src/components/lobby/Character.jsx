import skeleton from '../../assets/skeleton.mp4';
import { useRef, useEffect } from 'react';

const Character = ()=>{
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
        videoRef.current.volume = 0.3; // value between 0 and 1
        }
    }, []);

    return(
        <div className='h-3/4 w-1/3 flex justify-center items-center absolute right-5 top-15'>
            <video ref={videoRef} src={skeleton} autoPlay loop playsInline controls></video>
        </div>
    )
}

export default Character;