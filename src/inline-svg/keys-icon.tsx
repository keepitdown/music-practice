import { TInlineSvg } from "@/utility/types";

export default function KeysIcon({ width, height, addStyles, title }: TInlineSvg) {
  return (
    <svg
      viewBox="0 0 437 800"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={addStyles}
    >
      <title>{title}</title>
      <path d="M269 580h141c14 0 26 12 26 27v50c0 15-12 27-26 27H269v-12c0-10-8-18-18-18H0v-44h251c10 0 18-8 18-18zm-18-42c10 0 18 8 18 19v11h141c14 0 26-12 26-27v-50c0-14-12-26-26-26H24c-13 0-24 10-24 24v49zm18 170c0 10-8 18-18 18H0v47c0 15 12 27 27 27h384c14 0 25-12 25-27v-50c0-14-12-26-26-26H269ZM0 74h251c10 0 18 8 18 18v11h141c14 0 26-12 26-26V27c0-15-12-27-26-27H27C12 0 0 12 0 27Zm269 54c0 10-8 18-18 18H0v44h251c10 0 18 8 18 18v12h141c14 0 26-12 26-27v-50c0-15-12-27-26-27H269Zm0 232c0 10-8 18-18 18H0v49c0 13 11 25 24 25h387c14 0 26-12 26-27v-50c0-15-12-27-26-27H269Zm0-117c0 11-8 19-18 19H0v43h251c10 0 18 9 18 19v11h141c14 0 26-12 26-26v-50c0-15-12-27-26-27H269Z" />
    </svg>
  );
}