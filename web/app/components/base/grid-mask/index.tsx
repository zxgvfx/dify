import type { FC } from 'react'
import classNames from '@/utils/classnames'

type GridMaskProps = {
  children: React.ReactNode
  wrapperClassName?: string
  canvasClassName?: string
  gradientClassName?: string
}
const GridMask: FC<GridMaskProps> = ({
  children,
  wrapperClassName,
  canvasClassName,
  gradientClassName,
}) => {
<<<<<<< HEAD
  return (
    <div className={classNames('relative bg-saas-background', wrapperClassName)}>
      <div className={classNames('absolute inset-0 w-full h-full z-0', canvasClassName)}
        style={{
          background: `
          repeating-linear-gradient(0deg, transparent, transparent 23px, var(--color-divider-subtle) 24px,transparent 24px, transparent 47px, var(--color-divider-subtle) 48px),
          repeating-linear-gradient(90deg, transparent, transparent 23px, var(--color-divider-subtle) 24px,transparent 24px,transparent 47px, var(--color-divider-subtle) 48px)`,
        }} />
      <div className={classNames('absolute w-full h-full z-[1] bg-grid-mask-background rounded-lg', gradientClassName)} />
=======
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const initCanvas = () => {
    const dpr = window.devicePixelRatio || 1

    if (canvasRef.current) {
      const { width: cssWidth, height: cssHeight } = canvasRef.current?.getBoundingClientRect()

      canvasRef.current.width = dpr * cssWidth
      canvasRef.current.height = dpr * cssHeight

      const ctx = canvasRef.current.getContext('2d')
      if (ctx) {
        ctx.scale(dpr, dpr)
        ctx.strokeStyle = '#D1E0FF'
        ctxRef.current = ctx
      }
    }
  }

  const drawRecord = useCallback(() => {
    const canvas = canvasRef.current!
    const ctx = ctxRef.current!
    const rowNumber = Number.parseInt(`${canvas.width / 24}`)
    const colNumber = Number.parseInt(`${canvas.height / 24}`)

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath()
    for (let i = 0; i < rowNumber; i++) {
      for (let j = 0; j < colNumber; j++) {
        const x = i * 24
        const y = j * 24
        if (j === 0) {
          ctx.moveTo(x, y + 2)
          ctx.arc(x + 2, y + 2, 2, Math.PI, Math.PI * 1.5)
          ctx.lineTo(x + 22, y)
          ctx.arc(x + 22, y + 2, 2, Math.PI * 1.5, Math.PI * 2)
          ctx.lineTo(x + 24, y + 22)
          ctx.arc(x + 22, y + 22, 2, 0, Math.PI * 0.5)
          ctx.lineTo(x + 2, y + 24)
          ctx.arc(x + 2, y + 22, 2, Math.PI * 0.5, Math.PI)
        }
        else {
          ctx.moveTo(x + 2, y)
          ctx.arc(x + 2, y + 2, 2, Math.PI * 1.5, Math.PI, true)
          ctx.lineTo(x, y + 22)
          ctx.arc(x + 2, y + 22, 2, Math.PI, Math.PI * 0.5, true)
          ctx.lineTo(x + 22, y + 24)
          ctx.arc(x + 22, y + 22, 2, Math.PI * 0.5, 0, true)
          ctx.lineTo(x + 24, y + 2)
          ctx.arc(x + 22, y + 2, 2, 0, Math.PI * 1.5, true)
        }
      }
    }
    ctx.stroke()
    ctx.closePath()
  }, [])

  const handleStartDraw = () => {
    if (canvasRef.current && ctxRef.current)
      drawRecord()
  }

  useEffect(() => {
    initCanvas()
    handleStartDraw()
  }, [])

  return (
    <div className={`relative bg-components-panel-bg ${wrapperClassName}`}>
      <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full ${canvasClassName}`} />
      <div className={`absolute w-full h-full z-[1] bg-gradient-to-b from-background-body to-background-gradient-mask-transparent rounded-lg ${gradientClassName}`} />
>>>>>>> bafa46393cc9b488be7080ba541f8795f52d8fa6
      <div className='relative z-[2]'>{children}</div>
    </div>
  )
}

export default GridMask
