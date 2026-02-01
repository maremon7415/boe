"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { User } from "@/lib/types"

interface AuthContextType {
    user: User | null
    token: string | null
    loading: boolean
    login: (token: string, userData: User) => void
    logout: () => void
    refreshProfile: () => Promise<void>
    loggedIn: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [loggedIn, setLoggedIn] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        // Initial check on mount
        const storedToken = localStorage.getItem("token")
        const storedUser = localStorage.getItem("user")

        if (storedToken && storedUser) {
            setToken(storedToken)
            setLoggedIn(true)
            try {
                setUser(JSON.parse(storedUser))
            } catch (e) {
                console.error("Failed to parse user data", e)
                localStorage.removeItem("token")
                localStorage.removeItem("user")
            }
        }
        setLoading(false)
    }, [])

    const login = (newToken: string, userData: User) => {
        setToken(newToken)
        setUser(userData)
        localStorage.setItem("token", newToken)
        localStorage.setItem("user", JSON.stringify(userData))
    }

    const logout = () => {
        setToken(null)
        setUser(null)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        router.push("/login")
        setLoggedIn(false)
    }

    // Function to re-fetch user profile from API (if we have an endpoint for it)
    // For now, it will just re-read from local storage or do nothing if no API exists yet
    const refreshProfile = async () => {
        if (!token) return

        try {
            const res = await fetch("/api/auth/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.ok) {
                const data = await res.json()
                setUser(data.user)
                localStorage.setItem("user", JSON.stringify(data.user))
            } else {
                // If token is invalid/expired, logout
                logout()
            }
        } catch (error) {
            console.error("Failed to refresh profile", error)
        }
    }

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout, refreshProfile, loggedIn }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
