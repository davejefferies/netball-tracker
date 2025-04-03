import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TeamScreen from '../screens/TeamScreen'
import ModifyTeamScreen from '../screens/ModifyTeamScreen'
import ScheduleScreen from '../screens/ScheduleScreen'
import TrainingDetailScreen from '../screens/TrainingDetailScreen'
import MatchScreen from '../screens/MatchScreen'

const Stack = createNativeStackNavigator()

export default () => {

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Team" component={TeamScreen} />
            <Stack.Screen name="ModifyTeam" component={ModifyTeamScreen} />
            <Stack.Screen name="Schedule" component={ScheduleScreen} />
            <Stack.Screen name="TrainingDetail" component={TrainingDetailScreen} />
            <Stack.Screen name="Match" component={MatchScreen} />
        </Stack.Navigator>
      )
}
