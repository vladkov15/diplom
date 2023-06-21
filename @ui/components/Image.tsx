import React, { FC, useEffect, useState } from 'react'
import NextImage, { ImageProps as NextImageProps } from 'next/image'

export interface ImageProps extends NextImageProps {
  fallbackSrc?: string
}

const Image: FC<ImageProps> = ({ src, fallbackSrc, ...props }) => {
  const [source, setSource] = useState(src)

  useEffect(() => {
    setSource(src)
  }, [src])

  return <NextImage {...props} src={source} onError={() => setSource(fallbackSrc || '')} />
}

export default Image
