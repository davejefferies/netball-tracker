import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { CourtComponent } from '../component'

const mockEvents = [
    { id: '1', opponent: 'Hurricanes addsfdsg ssf', date: '10 Jul 2025, 10:00', type: { id: 2, name: 'Match', text: null, description: null } },
    { id: '2', opponent: 'Team Training', date: '12 Jul 2025, 17:00', type: { id: 1, name: 'Training', text: 'Evening Practice', description: null } },
    { id: '3', opponent: 'Storm', date: '15 Jul 2025, 12:00', type: { id: 2, name: 'Match', text: null, description: null } }
]

const isWeb = Platform.OS !== 'ios' && Platform.OS !== 'android'

const ScheduleScreen: React.FC = () => {
    const route = useRoute()
    const { team } = route.params

    const navigation = useNavigation()

    return (
        <View style={isWeb ? styles.container : ''}>
            <View style={isWeb ? styles.box : ''}>
                <View style={styles.header}>
                    <Text style={styles.heading}>{ team.name } Schedule</Text>
                    <TouchableOpacity style={styles.addButton}>
                        <Text style={styles.addButtonText}>+ New Event</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.tileContainer}>
                    {mockEvents.map(item => (
                        <TouchableOpacity key={item.id} style={styles.eventCard} onPress={() => {
                            if (item.type.id === 1) navigation.navigate("TrainingDetail", { team, event: item })
                            else if (item.type.id === 2) navigation.navigate("Match", { team, event: item })
                        }}>
                            <View>
                                <View style={styles.eventCourt}>
                                    <CourtComponent orientation={'landscape'} width={200} style={{ margin: 16 }} />
                                </View>
                                <Text style={styles.eventType}>{ item.type.name }</Text>
                                <Text style={styles.eventTitle}>{ item.type.text || 'vs ' + item.opponent }</Text>
                            </View>
                            <Text style={styles.eventDate}>{item.date}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    )
}

export default ScheduleScreen

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
    tileContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        justifyContent: 'flex-start',
        marginTop: 15
    },
    eventCard: {
        borderRadius: 10,
        marginBottom: 12,
        width: 232,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 3,
        elevation: 3,
        cursor: 'pointer'
      },
      eventCourt: {
        backgroundColor: '#4287f5', 
        opacity: 0.5,
        width: '100%'
    },
      eventTitle: {
        fontSize: 26,
        fontWeight: 500,
        marginBottom: 4,
        textAlign: 'center',
        position: 'absolute',
        top: '37%',
        left: 0,
        right: 0
      },
      eventType: {
        color: '#0254d8', 
        fontSize: 20,
        marginBottom: 2,
        fontWeight: 500,
        textAlign: 'center',
        position: 'absolute',
        top: '16%',
        left: 0,
        right: 0
      },
      eventDate: {
        fontSize: 20,
        color: '#000',
        textAlign: 'center',
        margin: 10
      }
})