import React, { useEffect, useLayoutEffect, useState } from 'react';
import rough from 'roughjs/bin/rough';
const roughGenerator=rough.generator();
const WhiteBoard = ({ canvasRef, contextRef, elements, setElements, tool,color,setColor }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [start,setStart]=useState([]);
  const [endPoint,setEndPoint]=useState([]);
  console.log(color)
  useEffect(() => { 
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //set the context
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle=color;
    ctx.lineCap="round";
    ctx.lineWidth=2;
    //store the context
    contextRef.current = ctx;
  }, []);
  useEffect(()=>{
    contextRef.current.strokeStyle=color
  },[color])
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    const roughCanvas = rough.canvas(canvas);
    elements.forEach((element) => {
      // draw free sketch
      if (element.type === "pencil") {
        roughCanvas.linearPath(element.path,{stroke:element.stroke,strokeWidth:5,roughness:0});
      } 

      //draw straight line
      else if(element.type==="line"){
        const line=roughGenerator.line(
            element.x,
            element.y,
            element.width,
            element.height,
            {stroke:element.stroke,roughness:0,strokeWidth:2}

        )
        roughCanvas.draw(line)
      }
      //draw rectangle
      else if(element.type==="rectangle"){
        const rec=roughGenerator.rectangle(
            element.x,
            element.y,
            element.width,
            element.height,
            {stroke:element.stroke,roughness:0, strokeWidth: 2}
        );
        roughCanvas.draw(rec);
      }
    })
  }, [elements]);

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;

    setIsDrawing(true);
    if(tool==="pencil"){
        setElements((prevElements) => [
            ...prevElements,
            {
                type: "pencil",
                path: [[offsetX, offsetY]],
                stroke:color
            },
        ]);
    }
    else if(tool==="line"){
        console.log("hello");
        setElements((prevElements)=>[
            ...prevElements,
            {
                type:"line",
                x:offsetX,
                y:offsetY,
                width:offsetX,
                height:offsetY,
                stroke:color
            }
        ])
    }   
    else if(tool==="rectangle"){
        console.log("rectangle selected");
        setElements((prevElements)=>[
            ...prevElements,
            {
                type:"rectangle",
                x:offsetX,
                y:offsetY,
                width:offsetX,
                height:offsetY,
                stroke:color
            }
        ])
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    if(tool==="pencil"){
        setElements((prevElements) => {
          const updatedElements = [...prevElements];
          const last = updatedElements[updatedElements.length - 1];
          const updatedPath = [...last.path, [offsetX, offsetY]];
          updatedElements[updatedElements.length - 1] = {
            ...last,
            path: updatedPath,
          };
          return updatedElements;
        });
    }
    else if(tool==="line"){
        console.log("line selected");
        setElements((prevElements)=>{
            const updatedElements=[...prevElements];
            const last=updatedElements[updatedElements.length-1];
            updatedElements[updatedElements.length-1]={
                ...last,
                width:offsetX,
                height:offsetY
            }
            return updatedElements;
        })
    }
    else if(tool==="rectangle"){
        console.log("recangle");
            setElements((prevElements)=>{
                const updatedElements=[...prevElements];
                const last=updatedElements[updatedElements.length-1];
                updatedElements[updatedElements.length-1]={
                    ...last,
                    width:offsetX-last.x,
                    height:offsetY-last.y
                }
                return updatedElements;
        })
    }
  };

  const handleMouseUp = (e) => {
    setIsDrawing(false);
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className='border h-[100%] w-[100%] overflow-hidden'>
      <canvas ref={canvasRef}/>
    </div>
  );
};

export default WhiteBoard;