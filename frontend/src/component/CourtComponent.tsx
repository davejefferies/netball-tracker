import React, { useState } from 'react'
import { View, StyleSheet, ViewStyle, LayoutChangeEvent, Platform } from 'react-native'
import PlayerButton from './PlayerButton'

type CourtComponentProps = {
    width?: number | string
    height?: number
    style?: ViewStyle
    orientation?: 'landscape' | 'portrait'
    includePlayers?: boolean
}

const players = [
    { id: 1, name: 'GS', top: '5%', left: '44%' },
    { id: 2, name: 'GA', top: '26%', left: '10%' },
    { id: 3, name: 'WA', top: '26%', right: '10%' },
    { id: 4, name: 'C', top: '47%', left: '45%' },
    { id: 5, name: 'GD', bottom: '26%', left: '10%' },
    { id: 6, name: 'WD', bottom: '26%', right: '10%' },
    { id: 7, name: 'GK', bottom: '5%', left: '44%' }
];

const CourtComponent: React.FC<CourtComponentProps> = ({ width, height, style, orientation = 'landscape', includePlayers = false}) => {
    const [measuredParentWidth, setMeasuredParentWidth] = useState<number | null>(null)
    const isLandscape = orientation === 'landscape'

    const handleLayout = (e: LayoutChangeEvent) => {
        if (!measuredParentWidth) {
        const w = e.nativeEvent.layout.width;
        setMeasuredParentWidth(w);
        }
    };

    const resolveWidth = (): number | undefined => {
        if (typeof width === 'number') return width;
        if (typeof width === 'string' && measuredParentWidth) {
        const percent = parseFloat(width);
        return measuredParentWidth * (percent / 100);
        }
        return undefined;
    };

    const resolvedWidth = resolveWidth();

    const finalWidth =
        resolvedWidth ??
        (height
        ? isLandscape
            ? height * 2
            : height / 2
        : undefined);

    const finalHeight =
        height ??
        (resolvedWidth
        ? isLandscape
            ? resolvedWidth / 2
            : resolvedWidth * 2
        : undefined);

    const ready = finalWidth !== undefined && finalHeight !== undefined

    return (
        <View style={[{
            width: '100%', 
            alignSelf: 'center',
            alignItems: 'center'
        }]}
        onLayout={typeof width === 'string' ? handleLayout : undefined}>
            {ready && (
                <View
                    style={[
                    styles.rectangle,
                    { width: finalWidth, height: finalHeight },
                    style,
                    ]}
                >
                    <View style={[
                        styles.halfCircle, 
                        isLandscape ? styles.halfCircleLandscape : styles.halfCirclePortrait,
                        isLandscape ? styles.halfCircleOneOneLandscape : styles.halfCircleOneOnePortrait
                    ]} />
                    <View style={[
                        styles.halfCircle, 
                        isLandscape ? styles.halfCircleLandscape : styles.halfCirclePortrait,
                        isLandscape ? styles.halfCircleOneTwoLandscape : styles.halfCircleOneTwoPortrait
                    ]} />
                    <View style={[
                        isLandscape ? styles.lineOneLandscape : styles.lineOnePortrait, 
                        styles.line, 
                        isLandscape ? styles.lineLandscape : styles.linePortrait
                    ]} />
                    <View style={[
                        styles.circle, 
                        isLandscape ? styles.circleLandscape : styles.circlePortrait
                    ]} />
                    <View style={[
                        isLandscape ? styles.lineTwoLandscape : styles.lineTwoPortrait, 
                        styles.line, 
                        isLandscape ? styles.lineLandscape : styles.linePortrait
                    ]} />
                    <View style={[
                        styles.halfCircle, 
                        isLandscape ? styles.halfCircleLandscape : styles.halfCirclePortrait,
                        isLandscape ? styles.halfCircleTwoOneLandscape : styles.halfCircleTwoOnePortrait
                    ]} />
                    <View style={[
                        styles.halfCircle, 
                        isLandscape ? styles.halfCircleLandscape : styles.halfCirclePortrait,
                        isLandscape ? styles.halfCircleTwoTwoLandscape : styles.halfCircleTwoTwoPortrait
                    ]} />
                    {includePlayers ? players.map(player => (
                        <PlayerButton
                            key={player.id}
                            name={player.name}
                            style={{
                                top: player.top,
                                bottom: player.bottom,
                                left: player.left,
                                right: player.right
                            }}
                            onPress={() => console.log(`${player.name} pressed`)}
                        />
                    )) : ''}
                </View>
            )}
        </View>
    )
}

export default CourtComponent

const styles = StyleSheet.create({
    rectangle: {
        backgroundColor: '#4287f5',
        borderColor: '#fff',
        borderWidth: 2
    },
    line: {
        width: 2,
        position: 'absolute',
        borderStyle: 'solid',
        borderColor: '#fff'
    },
    lineLandscape: {
        height: '100%',
        borderLeftWidth: 2
    },
    linePortrait: {
        width: '100%',
        borderTopWidth: 2
    },
    lineOneLandscape: {
        left: '33%',
    },
    lineOnePortrait: {
        top: '33%',
    },
    lineTwoLandscape: {
        left: '66%',
    },
    lineTwoPortrait: {
        top: '66%',
    },
    circle: {
        borderRadius: '50%',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#fff',
        position: 'absolute'
    },
    circleLandscape: {
        width: '6%',
        height: '12%',
        left: '47%',
        top: '44%',
    },
    circlePortrait: {
        height: '6%',
        width: '12%',
        top: '47%',
        left: '44%',
    },
    halfCircle: {
        borderStyle: 'solid',
        borderWidth: 2,
        position: 'absolute'
    },
    halfCircleLandscape: {
        width: '17.5%',
        height: '30%'
    },
    halfCirclePortrait: {
        height: '17.5%',
        width: '35%'
    },
    halfCircleOneOneLandscape: {
        borderLeftColor: '#4287f5',
        borderTopColor: '#fff',
        borderRightColor: '#fff',
        borderBottomColor: '#4287f5',
        borderTopRightRadius: '95%',
        top: '19%'
    },
    halfCircleOneOnePortrait: {
        borderLeftColor: '#4287f5',
        borderBottomColor: '#fff',
        borderRightColor: '#fff',
        borderTopColor: '#4287f5',
        borderBottomRightRadius: '95%',
        right: '19%'
    },
    halfCircleOneTwoLandscape: {
        borderLeftColor: '#4287f5',
        borderTopColor: '#4287f5',
        borderRightColor: '#fff',
        borderBottomColor: '#fff',
        borderBottomRightRadius: '95%',
        top: '48%'
    },
    halfCircleOneTwoPortrait: {
        borderRightColor: '#4287f5',
        borderTopColor: '#4287f5',
        borderLeftColor: '#fff',
        borderBottomColor: '#fff',
        borderBottomLeftRadius: '95%',
        right: '48%'
    },
    halfCircleTwoOneLandscape: {
        borderLeftColor: '#fff',
        borderTopColor: '#fff',
        borderRightColor: '#4287f5',
        borderBottomColor: '#4287f5',
        borderTopLeftRadius: '95%',
        top: '19%',
        left: '82.5%'
    },
    halfCircleTwoOnePortrait: {
        borderLeftColor: '#fff',
        borderTopColor: '#fff',
        borderRightColor: '#4287f5',
        borderBottomColor: '#4287f5',
        borderTopLeftRadius: '95%',
        bottom: 0,
        left: '17.5%'
    },
    halfCircleTwoTwoLandscape: {
        borderLeftColor: '#fff',
        borderTopColor: '#4287f5',
        borderRightColor: '#4287f5',
        borderBottomColor: '#fff',
        borderBottomLeftRadius: '95%',
        top: '48%',
        left: '82.5%'
    },
    halfCircleTwoTwoPortrait: {
        borderRightColor: '#fff',
        borderBottomColor: '#4287f5',
        borderLeftColor: '#4287f5',
        borderTopColor: '#fff',
        borderTopRightRadius: '95%',
        bottom: 0,
        right: '17.5%'
    }
})