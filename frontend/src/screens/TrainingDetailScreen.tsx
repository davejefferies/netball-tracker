import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useRoute } from '@react-navigation/native';

type TrainingItem = {
    id: string;
    title: string;
    duration: string;
    notes?: string;
};

const mockItems: TrainingItem[] = [
    { id: '1', title: 'Warm-up', duration: '10 mins' },
    { id: '2', title: 'Passing Drills', duration: '15 mins' },
    { id: '3', title: 'Shooting Practice', duration: '20 mins' },
    { id: '4', title: 'Scrimmage', duration: '15 mins' },
];

const isWeb = Platform.OS !== 'ios' && Platform.OS !== 'android'

const TrainingDetailScreen: React.FC = () => {
    const route = useRoute<any>();
    const { team, event } = route.params;

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={isWeb ? styles.container : ''}>
                <View style={isWeb ? styles.box : ''}>
                    <View style={styles.header}>
                        <Text style={styles.heading}>{ team.name } Training Schedule - {event.date}</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        {mockItems.map(item => (
                            <View style={styles.scheduleItem} key={item.id}>
                                <View>
                                    <Text style={styles.itemTitle}>{item.title}</Text>
                                    <Text style={styles.itemDuration}>{item.duration}</Text>
                                    {item.notes && <Text style={styles.itemNotes}>{item.notes}</Text>}
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        </ScrollView>
    )
    /*return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{event.title}</Text>
                <Text style={styles.datetime}>{event.date}</Text>
            </View>

            <Text style={styles.subheading}>Training Schedule</Text>

            <FlatList
                data={mockItems}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                <View style={styles.scheduleItem}>
                    <View>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        <Text style={styles.itemDuration}>{item.duration}</Text>
                        {item.notes && <Text style={styles.itemNotes}>{item.notes}</Text>}
                    </View>
                </View>
                )}
                contentContainerStyle={{ paddingBottom: 20 }}
            />

            <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>+ Add Activity</Text>
            </TouchableOpacity>
        </View>
    );*/
};

export default TrainingDetailScreen;

const styles = StyleSheet.create({
    scrollContainer: {},
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
    itemContainer: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        gap: 12,
        justifyContent: 'flex-start',
        marginTop: 15,
        width: '100%'
    },
    scheduleItem: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    itemDuration: {
        fontSize: 14,
        color: '#1c7ed6',
    },
    itemNotes: {
        fontSize: 12,
        color: '#555',
        marginTop: 4,
    }
    /*container: {
        flex: 1,
        backgroundColor: '#f1f3f5',
        padding: 20,
    },
    header: {
        
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 4,
    },
    datetime: {
        color: '#555',
        fontSize: 14,
    },
    subheading: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
    },
    scheduleItem: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        marginBottom: 12,
        elevation: 2,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    itemDuration: {
        fontSize: 14,
        color: '#1c7ed6',
    },
    itemNotes: {
        fontSize: 12,
        color: '#555',
        marginTop: 4,
    },
    addButton: {
        backgroundColor: '#1c7ed6',
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 10,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    }*/
});
  