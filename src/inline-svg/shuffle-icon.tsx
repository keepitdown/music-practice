import { TInlineSvg } from "@/utility/types";

export default function ShuffleIcon({ width, height, addStyles, title }: TInlineSvg) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-.03 4.55 20.87 22.9"
      width={width}
      height={height}
      className={addStyles}
    >
      <title>{title}</title>
      <path d="M14.16 5.4v2.97H1.4c-.5 0-.94.44-.94.97v8.25l3.34-2.96c.16-.2.32-.25.47-.35v-2.1h9.88v2.98c0 .87.53 1.12 1.25.5l5.03-4.63a.98.98 0 0 0 .37-.75c0-.28-.15-.56-.37-.75L15.4 4.91c-.72-.63-1.25-.38-1.25.5zm6.15 9-3.31 3c-.16.13-.38.23-.5.32v2.1H6.66v-3c0-.88-.53-1.1-1.25-.48L.34 20.97a.95.95 0 0 0-.34.75 1 1 0 0 0 .34.75l5.07 4.6c.72.62 1.25.4 1.25-.48v-2.97h12.71c.54 0 .94-.43.94-.96V14.4z" />
    </svg>
  );
}