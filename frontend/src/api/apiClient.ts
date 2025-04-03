import { logoutUser } from '../context/AuthContext'
import { getItem, saveItem } from '../utils/storage'

const API_BASE = 'http://localhost:4000'

const refreshAccessToken = async () => {
    const refreshToken = await getItem('refreshToken')

    if (!refreshToken) throw new Error('No refresh token available')

    const res = await fetch(`${API_BASE}/api/auth/refresh`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refreshToken })
    })

    if (!res.ok) throw new Error('Failed to refresh token')

    const data = await res.json()
    await saveItem('userToken', data.token)
    await saveItem('refreshToken', data.refreshToken)
    await saveItem('user', JSON.stringify(data.user))

    return data.accessToken
}

export const apiClient = async (url: string, options: RequestInit = {}, retry = true): Promise<any> => {
    let token = await getItem('userToken')

    const res = await fetch(`${API_BASE}${url}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers
        }
    })

    if (res.status === 401 && retry) {
        try {
            const newToken = await refreshAccessToken()
            return apiClient(url, options, false)
        } catch (err) {
            logoutUser()
            throw new Error('Session expired. Please log in again.')
        }
    }

    if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.message || 'API error')
    }

    return res.json()
}

/*export const apiClient = async (url: string, options: RequestInit = {}) => {
    const token = await getItem('userToken')

    const res = await fetch(`http://localhost:4000${url}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers
        }
    })
  
    if (res.status === 401) {
        logoutUser()
        throw new Error('Session expired. Please log in again.')
    }
    
    if (!res.ok) throw new Error((await res.json()).message || 'API error')
  
    return res.json()
}*/