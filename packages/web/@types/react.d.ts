import {
  ImgHTMLAttributes as _ImgHTMLAttributes,
  IframeHTMLAttributes as _IframeHTMLAttributes,
} from 'react'

declare module 'react' {
  interface ImgHTMLAttributes<T> extends _ImgHTMLAttributes<T> {
    loading?: 'lazy'
  }

  interface IframeHTMLAttributes<T> extends _IframeHTMLAttributes<T> {
    loading?: 'lazy'
  }
}
