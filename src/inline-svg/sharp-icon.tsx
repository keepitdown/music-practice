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
      <path d="M124.8 7v41L88.6 65.3v-33L74 32.2v38.4L51 80.9V104l23-10.3v53l-23 10.2v23l23-10.3v34.2h14.7v-39.4l36.2-17.6v33h14.6v-38.3l23-10.2v-23.1l-23.1 10.3V65.7l23.2-10.3V32.2l-23.2 10.4V7.1Zm.1 64v52.8l-36.4 17.6v-53Z" />
    </svg>
  );
}