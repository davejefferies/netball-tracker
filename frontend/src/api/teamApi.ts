import { apiClient } from './apiClient'

export const fetchTeams = () => apiClient('/api/team')

export const createTeam = (data: any) =>
    apiClient('/api/team', {
        method: 'POST',
        body: JSON.stringify(data)
})

export const updateTeam = (id: number, data: any) =>
    apiClient(`/api/team/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
})