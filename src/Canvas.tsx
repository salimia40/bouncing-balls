import React, { useEffect, useRef } from 'react'

type CanvasProps = {
    children: (context: CanvasRenderingContext2D, frameCount: number) => void
    width: number
    height: number
}

export default function Canvas(props: CanvasProps) {

    const { children: draw, ...rest } = props
    const canvasRef = useRef(null)

    useEffect(() => {

        const canvas = canvasRef.current as unknown as HTMLCanvasElement
        const context = canvas.getContext('2d')
        let frameCount = 0
        let animationFrameId: number | null = null

        const render = () => {
            frameCount++
            draw(context!, frameCount)
            animationFrameId = window.requestAnimationFrame(render)
        }
        render()

        return () => {
            window.cancelAnimationFrame(animationFrameId!)
        }
    }, [draw])

    return <canvas ref={canvasRef} {...rest} />

}
