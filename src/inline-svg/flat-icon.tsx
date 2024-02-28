import { TInlineSvg } from "@/utility/types";

export default function SharpIcon({ width, height, addStyles, title }: TInlineSvg) {
  return (
    <svg
      viewBox="0 0 211.7 211.7"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={addStyles}
    >
      <title>{title}</title>
      <path d="M74.7 9.7v192s16.2.2 26.5-1.7a107 107 0 0 0 25.1-8 74.7 74.7 0 0 0 24.6-22.4 40.6 40.6 0 0 0 6.1-23.9s.5-7.8-2.4-17.5c-2.8-9.6-11.3-16.3-11.3-16.3s-6.2-5-14-5.6c-8-.6-12 0-15.6.5-5.9 1-19.8 7.3-20.7 8.8l.4-105.9Zm38.5 114c4.5.1 7.4 1.6 9.6 3.7a23 23 0 0 1 6.4 14.8 61 61 0 0 1-.3 15.3c-.9 4.4-2 11.3-12.9 21.2-10.9 10-22.7 10.6-22.7 10.6v-57.9c1.6-1 5.6-3.7 8.9-5.2 1.9-1 6.5-2.5 11-2.5z" />
    </svg>
  );
}