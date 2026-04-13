'use client';

export default function Section8() {
  return (
    <div className="mxd-section padding-grid-pre-pinned">
      <div className="mxd-container">
        <div className="mxd-divider">
          <div className="mxd-divider__img phone-height-add">
            <video 
              src="/img/women-video.webm"
              className="parallax-img"
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: '100%', 
                display: 'block',
                objectFit: 'cover',
                height:'100vh'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}