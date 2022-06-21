import { useState, useEffect } from "react";

type MousePosition = {
    x: number;
    y: number;
}

export default function useMousePosition() {
    const [mousePosition, setMousePosition] = useState<MousePosition>({
        x: 0,
        y: 0
    });

    useEffect(() => {
        function handleMouseMove(event: MouseEvent) {
            setMousePosition({
                x: event.clientX,
                y: event.clientY
            });
        }
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        }
    }
        , []);
    return mousePosition;
}