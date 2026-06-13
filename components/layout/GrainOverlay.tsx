const NOISE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>
      <filter id='n'>
        <feTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/>
        <feColorMatrix type='saturate' values='0'/>
      </filter>
      <rect width='100%' height='100%' filter='url(#n)'/>
    </svg>`,
  );

/** Cinematic film grain + vignette. Static, pointer-transparent, top layer. */
export function GrainOverlay() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60] opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage: `url("${NOISE}")`,
          backgroundSize: "200px 200px",
        }}
      />
      <div
        aria-hidden
        className="vignette pointer-events-none fixed inset-0 z-[59]"
      />
    </>
  );
}
