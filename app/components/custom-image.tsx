'use client';

import { useState, useEffect, useRef } from 'react';
import { ImageSkeleton } from './skeleton';

interface CustomImageProps {
    src: string;
    alt: string;
    className?: string;
    loading?: 'lazy' | 'eager';
    showSkeleton?: boolean;
}

export default function CustomImage({ src, alt, className = '', loading = 'lazy', showSkeleton = true }: CustomImageProps) {
    const [imageState, setImageState] = useState<'loading' | 'loaded' | 'error'>('loading');
    const [imageSrc, setImageSrc] = useState<string>(src);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        // 如果 src 为空或无效，直接设置为错误状态
        if (!src || src.trim() === '') {
            Promise.resolve().then(() => {
                setImageState('error');
            });
            return;
        }

        // 重置状态
        Promise.resolve().then(() => {
            setImageSrc(src);
        });

        // 检查图片是否已经在浏览器缓存中（包括 ServiceWorker 缓存）
        if (imgRef.current?.complete && imgRef.current?.naturalHeight !== 0) {
            Promise.resolve().then(() => {
                setImageState('loaded');
            });
        } else {
            Promise.resolve().then(() => {
                setImageState('loading');
            });
        }
    }, [src]);

    const handleLoad = () => {
        setImageState('loaded');
    };

    const handleError = () => {
        setImageState('error');
    };

    return (
        <div className={`relative ${className}`}>
            {/* 加载中占位符 - 使用 Skeleton */}
            {imageState === 'loading' && showSkeleton && (
                <div className="absolute inset-0">
                    <ImageSkeleton className="w-full h-full" />
                </div>
            )}

            {/* 错误占位符 */}
            {imageState === 'error' && (
                <div className="absolute inset-0 bg-linear-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3 text-center px-4">
                        <svg className="w-16 h-16 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-gray-400 text-sm">图片加载失败</p>
                    </div>
                </div>
            )}

            {/* 实际图片 - 只在有效 src 时渲染 */}
            {imageSrc && imageSrc.trim() !== '' && (
                <img
                    ref={imgRef}
                    src={imageSrc}
                    alt={alt}
                    className={`${className} ${imageState === 'loaded' ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
                    loading={loading}
                    onLoad={handleLoad}
                    onError={handleError}
                    decoding="async"
                    fetchPriority={loading === 'eager' ? 'high' : 'auto'}
                />
            )}
        </div>
    );
}
