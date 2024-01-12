import "@/Sass/Globals.sass"
import "@/Sass/Reset.sass"

import '@14islands/r3f-scroll-rig/css'

import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"

import { Suspense } from "react"

import { getSettings } from "@/utils"

export const metadata = {
  title: "Session Token",
  description: "",
}

export default async function RootLayout({ children }) {
  const settings = await getSettings()

  return (
    <>
      <Suspense>
        <Header settings={settings} />
      </Suspense>
      {children}
      <Suspense>
        <Footer settings={settings} />
      </Suspense>
    </>
  )
}
