export default function MuraiBird() {
  return (
    <div
      className="pointer-events-none fixed bottom-4 right-4 z-10 w-20 sm:w-24 opacity-90"
      aria-hidden="true"
    >
      <svg
        className="murai-bird drop-shadow-[4px_4px_0px_rgba(0,0,0,0.45)] dark:drop-shadow-[4px_4px_0px_rgba(253,230,138,0.22)]"
        viewBox="0 0 96 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="murai-note">
          <path d="M73 13v13" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-amber-500 dark:text-amber-200" />
          <circle cx="69" cy="27" r="4" fill="currentColor" className="text-amber-400 dark:text-amber-200" />
        </g>
        <path
          className="murai-tail text-black dark:text-amber-100"
          d="M53 52C67 55 79 66 85 83C68 77 56 69 48 58L53 52Z"
          fill="#111827"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M20 46C20 29 33 18 50 22C65 26 74 39 72 54C70 68 56 76 40 72C27 69 20 59 20 46Z"
          fill="#111827"
          stroke="currentColor"
          strokeWidth="4"
          className="text-black dark:text-amber-100"
        />
        <path
          d="M35 56C43 62 54 62 63 54C60 68 48 73 38 68C34 66 32 62 35 56Z"
          fill="#fbbf24"
          stroke="currentColor"
          strokeWidth="3"
          className="text-black dark:text-amber-100"
        />
        <path
          className="murai-wing text-black dark:text-amber-100"
          d="M32 44C40 35 53 36 60 47C50 50 40 50 32 44Z"
          fill="#60a5fa"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          d="M69 39L82 34L72 48Z"
          fill="#f59e0b"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinejoin="round"
          className="text-black dark:text-amber-100"
        />
        <circle cx="58" cy="35" r="4" fill="#f8fafc" stroke="#000" strokeWidth="2" />
        <circle cx="59" cy="35" r="1.5" fill="#000" />
        <path
          d="M15 73H72"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          className="text-black dark:text-violet-200"
        />
        <path
          d="M41 70V79M52 69V78"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className="text-black dark:text-amber-100"
        />
      </svg>
    </div>
  );
}
