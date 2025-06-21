import React, { useRef, useState } from 'react';
import WhiteBoard from '../components/WhiteBoard';

const RoomPage = ({ user,socket,totalUser }) => {
    const [tool, setTool] = useState("pencil");
    const [color, setColor] = useState("#000000");
    const [elements, setElements] = useState([]);
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [prev, setPrev] = useState([]);
    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = contextRef.current;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setElements([]);
    }
    const storePrev = [];
    const handleUndo = () => {
        setPrev((prevELements) => [...prevELements, elements[elements.length - 1]]);
        setElements((prevELements) => prevELements.slice(0, -1));
    }
    const handleRedo = () => {
        setElements((prevELements) => [...prevELements, prev[prev.length - 1]]);
        setPrev((prevELements) => prevELements.slice(0, -1));
    }

    return (
        <div className="flex flex-col min-h-screen">
            <h1 className="text-3xl font-bold text-center my-6 text-gray-800">Welcome to the Whiteboa rd</h1>
            <p className='flex justify-center text-[50px]'>Online User {totalUser.length} </p>
            {/* { */}
                {/* user && user.presenter && ( */}
                    <div className="flex flex-col items-center mt-8">
                        <div className="flex justify-between w-4/5 max-w-4xl bg-white p-4 rounded-lg shadow-md">
                            {/* Drawing Tools */}
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="tool"
                                        id="pen"
                                        value="pencil"
                                        checked={tool === "pencil"}
                                        onChange={(e) => setTool(e.target.value)}
                                        className="h-5 w-5 accent-blue-600 cursor-pointer"
                                    />
                                    <label htmlFor="pen" className="text-gray-700 cursor-pointer">Pen</label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="tool"
                                        id="line"
                                        value="line"
                                        checked={tool === "line"}
                                        onChange={(e) => setTool(e.target.value)}
                                        className="h-5 w-5 accent-blue-600 cursor-pointer"
                                    />
                                    <label htmlFor="line" className="text-gray-700 cursor-pointer">Line</label>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <input
                                        type="radio"
                                        name="tool"
                                        id="rectangle"
                                        value="rectangle"
                                        checked={tool === "rectangle"}
                                        onChange={(e) => setTool(e.target.value)}
                                        className='h-5 w-5 accent-blue-600 cursor-pointer'
                                    />
                                    <label htmlFor="rectangle" className='text-gray-700 cursor-pointer'>Rectangle</label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <label htmlFor="color" className="text-gray-700">Color:</label>
                                    <input
                                        type="color"
                                        name="color"
                                        id="color"
                                        className="border border-gray-300 rounded-md h-8 w-8 cursor-pointer hover:border-blue-500 transition"
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-3">
                                <button disabled={elements.length === 0} onClick={handleUndo} className="bg-blue-500 text-white px-4 py-1.5 rounded-md hover:bg-blue-600 transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                                    Undo
                                </button>
                                <button onClick={handleRedo} disabled={prev.length === 0} className="border border-blue-500 text-blue-500 px-4 py-1.5 rounded-md hover:bg-blue-50 transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                                    Redo
                                </button>
                                <button onClick={clearCanvas} className="bg-red-500 text-white px-4 py-1.5 rounded-md hover:bg-red-600 transition text-sm font-medium">
                                    Clear Canvas
                                </button>
                            </div>
                        </div>
                    </div>
                {/* ) */}
            {/* } */}

            <div className="w-10/12 ml-[13%] mt-4 canvas-box mx-auto">
                <WhiteBoard
                    canvasRef={canvasRef}
                    contextRef={contextRef}
                    elements={elements}
                    color={color}
                    setColor={setColor}
                    setElements={setElements}
                    tool={tool}
                    user={user}
                    socket={socket}
                />
            </div>
        </div>
    );
};

export default RoomPage;
