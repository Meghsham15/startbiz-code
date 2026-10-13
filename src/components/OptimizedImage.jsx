import { useEffect, useState } from 'react';

/**
 * Reserves the image box, shows a shimmer until the file has fully decoded,
 * then shows the picture. Hiding the img until onLoad avoids the
 * top-strip paint that large files show on a slow connection.
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  imgClassName = 'object-contain',
  priority = false,
  fill = false,
}) {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setReady(false);
    setFailed(false);
  }, [src]);

  return (
    <div
      className={`relative overflow-hidden bg-[#d5e4e7] ${fill ? 'h-full w-full' : ''} ${className}`}
      style={!fill && width && height ? { aspectRatio: `${width} / ${height}` } : undefined}
    >
      {!ready && !failed ? <div className="img-skeleton absolute inset-0" aria-hidden="true" /> : null}
      {failed ? (
        <div className="absolute inset-0 flex items-center justify-center px-4 text-center text-sm text-brand-text-soft">
          Image unavailable
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          decoding="async"
          loading="eager"
          fetchPriority={priority ? 'high' : 'auto'}
          ref={(node) => {
            if (node && node.complete && node.naturalWidth > 0) setReady(true);
          }}
          onLoad={() => setReady(true)}
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full ${imgClassName} ${
            ready ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
}
