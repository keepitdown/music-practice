'use client'
import { Provider } from "jotai"
import { ReactNode } from "react"

type TStateProvider = {
  children: ReactNode;
};

export default function StateProvider({ children }: TStateProvider) {
  return (
    <Provider>
      {children}
    </Provider>
  )
}