import { TInlineSvg } from "@/utility/types";

export default function NaturalIcon({ width, height, addStyles, title }: TInlineSvg) {
  return (
    <svg
      viewBox="0 0 211.7 211.7"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={addStyles}
    >
      <title>{title}</title>
      <path d="M94 9.2H75V170h11.5l36-21.9v53.7h18.8V41.3h-11.7L94 63.2ZM122.5 69v55l-28.9 18V87Z" />
    </svg>
  );
}