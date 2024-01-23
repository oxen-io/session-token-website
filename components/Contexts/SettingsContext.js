'use client'
import { createContext } from "react"

export const SettingsContext = createContext()

export const SettingsProvider = ({ children, value }) => {
    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    )
}