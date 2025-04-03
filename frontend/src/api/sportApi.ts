import { apiClient } from './apiClient'

export const fetchSportPositions = () => apiClient('/api/sport/1/position')