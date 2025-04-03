import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Platform } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { fetchTeams } from '../api/teamApi'
import { CourtComponent } from '../component'

type Team = {
    id: string
    name: string
    coach?: string
}

const isWeb = Platform.OS !== 'ios' && Platform.OS !== 'android'

const TeamScreen: React.FC = () => {
    const [teams, setTeams] = useState([])
    const [loading, setLoading] = useState(true)

    const navigation = useNavigation()

    const handleDelete = async (teamId: string) => {}

    const loadTeams = async () => {
        try {
            const { data } = await fetchTeams()
            setTeams(data || [])
        } catch (err: any) {
            console.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    useFocusEffect(
        useCallback(() => {
            loadTeams()
        }, [])
    )

    const renderTeam = ({ item }: { item: Team }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.teamName}>{item.name}</Text>
                <View style={styles.iconActions}>
                    <TouchableOpacity onPress={() => navigation.navigate('ModifyTeam', { team: item })}>
                    <Ionicons name="create-outline" size={20} color="#1c7ed6" style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <Ionicons name="trash-outline" size={20} color="#e03131" style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.coach}>Coach: {item.coach || 'To Be Confirmed'}</Text>
            <View style={styles.actions}>
                <TouchableOpacity style={styles.actionButtonDisabled} disabled={true}>
                    <Text style={styles.actionText}>Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={() => {
                    navigation.navigate("Schedule", { team: item })
                }}>
                    <Text style={styles.actionText}>Schedule</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButtonDisabled} disabled={true}>
                    <Text style={styles.actionText}>Stats</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

    return (
        <View style={isWeb ? styles.container : ''}>
            <View style={isWeb ? styles.box : ''}>
                <View style={styles.header}>
                    <Text style={styles.heading}>Your Teams</Text>
                    <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("ModifyTeam")}>
                        <Text style={styles.addButtonText}>+ New Team</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={teams}
                    keyExtractor={(item) => item.id}
                    renderItem={renderTeam}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    style={styles.listView}
                />
            </View>
        </View>
    )
}

export default TeamScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1c7ed6',
        alignItems: 'center',
        justifyContent: 'center'
    },
    box: {
        backgroundColor: '#f9f9f9',
        padding: 24,
        borderRadius: 16,
        width: '90%',
        maxWidth: 800,
        alignItems: 'center',
        elevation: 5,
        flex: 1,
        margin: 20
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    heading: {
        fontSize: 22,
        fontWeight: '700'
    },
    addButton: {
        backgroundColor: '#1c7ed6',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 6
    },
    addButtonText: {
        color: '#fff',
        fontWeight: '600'
    },
    card: {
        backgroundColor: '#fff',
        padding: 16,
        marginTop: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 2,
        width: '100%'
    },
    teamName: {
        fontSize: 18,
        fontWeight: '600'
    },
    iconActions: {
        flexDirection: 'row',
        gap: 8,
    },
    icon: {
        marginLeft: 12,
    },
    coach: {
        marginTop: 4,
        color: '#555'
    },
    actions: {
        flexDirection: 'row',
        marginTop: 12,
        gap: 8
    },
    actionButton: {
        flex: 1,
        backgroundColor: '#e3f2fd',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center'
    },
    actionText: {
        color: '#1c7ed6',
        fontWeight: '600'
    },
    actionButtonDisabled: {
        flex: 1,
        backgroundColor: '#e3f2fd',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        opacity: 0.5
    },
    listView: {
        width: '100%'
    }
})