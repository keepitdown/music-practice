import { TInlineSvg } from "@/utility/types";

export default function DecreaseIcon({ title, width, height, addStyles }: TInlineSvg) {
  return (
    <svg className={addStyles} width={width} height={height} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <path fill="none" strokeWidth="3" d="M5 12h14" />
    </svg>
  );
}
