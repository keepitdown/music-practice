import { TInlineSvg } from "@/utility/types";

export default function NoneIcon({ width, height, addStyles, title }: TInlineSvg) {
  return (
    <svg
      viewBox="0 0 212 212"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={addStyles}
    >
      <title>{title}</title>
      <circle fill="none" strokeWidth="28" cx="105.8" cy="105.8" r="92.1" />
      <path strokeWidth="28" strokeLinecap="round" d="M192 20 19 191" />
    </svg>
  );
}
