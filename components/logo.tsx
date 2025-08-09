import Image from "next/image"

interface LogoProps {
  className?: string
  width?: number
  height?: number
}

export function Logo({ className = "h-8 w-auto", width = 200, height = 48 }: LogoProps) {
  return <Image src="/logo.svg" alt="PickNDrive" width={width} height={height} className={className} priority />
}
