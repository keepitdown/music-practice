import { TInlineSvg } from "@/utility/types";

export default function MetronomeIcon({ width, height, addStyles, title }: TInlineSvg) {
  return (
    <svg
      viewBox="0 0 800 800"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={addStyles}
    >
      <title>{title}</title>
      <path d="M319 50c-8 0-16 7-18 14L133 735c-2 8 3 14 11 14h532c8 0 13-6 11-14L517 64c-2-7-10-14-18-14Zm86 45c8 0 14 6 14 14v109h13c9-1 13 5 10 12l-15 40-7 8 2 333a14 14 0 0 1-29 0l-2-333-6-8-17-39c-3-7 1-13 9-13h14V109c0-8 6-14 14-14z" />
    </svg>
  );
}
