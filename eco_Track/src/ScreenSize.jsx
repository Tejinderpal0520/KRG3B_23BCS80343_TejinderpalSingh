import "./App.css"

import WindowHook from './hooks/UseWindowSize'


function ScreenSize() {
    const {width, height} = WindowHook();

    return ( 
        <>
        <h1>Window Dimensions</h1>
        <p>Width: {width}px</p>
        <p>height: {height}px</p>
        </>
    )
}

export default ScreenSize;