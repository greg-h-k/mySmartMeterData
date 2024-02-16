
import React from "react";
import { View } from "react-native";

import { Text, Divider } from "react-native-paper";

import { GraphContainerInput } from "../types/GraphContainerInput";

export const GraphContainer = ({title, ...props}: GraphContainerInput) => {
    return (
        <View style={{ padding: 10 }}>
            <Divider /> 
            <Text variant='titleLarge'>{title}</Text>
            {props.children}
        </View>
    )
}