import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="site-logo" aria-label="Ghulam Saqlain - Home">
      <svg
        className="site-logo__monogram"
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M17 9H8V31H18V21H13"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <path
          d="M32 9H23V20H32V31H23"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>
      <span className="site-logo__name">
        saqlain<span className="site-logo__dot">.</span>
      </span>
    </Link>
  );
}
