import React, { createContext, useContext, useEffect, useState } from 'react'
import { saveItem, getItem, deleteItem } from '../utils/storage'
import { useNavigation } from '@react-navigation/native'

type AuthContextType = {
    isAuthenticated: boolean
    user: any | null
    token: string | null
    login: (email: string, password: string) => Promise<void>
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

let logoutCallback: () => void

export const logoutUser = () => {
    if (logoutCallback) logoutCallback();
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null)
    const [user, setUser] = useState<any | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const restoreToken = async () => {
            const savedToken = await getItem('userToken')
            const savedUser = await getItem('user')

            if (savedToken) {
                setToken(savedToken)
                if (savedUser) setUser(JSON.parse(savedUser))
            }

            setLoading(false)
        }

        restoreToken()
    }, [])

    const login = async (email: string, password: string) => {
        const res = await fetch('http://localhost:4000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })

        if (!res.ok) {
            const error = await res.json()
            throw new Error(error.message || 'Login failed')
        }

        const data = await res.json()

        await saveItem('userToken', data.token)
        await saveItem('refreshToken', data.refreshToken)

        setToken(data.token)
        setUser(data.user)
    }

    const logout = async () => {
        await deleteItem('userToken')
        await deleteItem('user')

        setToken(null)
        setUser(null)
    }

    useEffect(() => {
        logoutCallback = logout;
    }, [])

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: !!token,
                user,
                token,
                login,
                logout,
            }}
        >
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within an AuthProvider')
    return context
}
