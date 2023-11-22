import { Platform,StyleSheet, Text } from 'react-native'
import React from 'react'

const AppText = ({inputText,stylesLing,onPress,placeholder,numberOfLines}) => {
  return (
    <Text  onPress={onPress} numberOfLines={numberOfLines}>
      {inputText}
    </Text>
  )
}

export default AppText