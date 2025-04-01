import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { white, black } from '../../utils/colors';

const TextButton = ({ text, style = {}, ...rest }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <TouchableOpacity
      {...rest}
      style={[
        {
          backgroundColor: isPressed ? black : white,
          borderColor: black,
          borderWidth: 1,
          borderRadius: 5,
          padding: 10,
          width: 150,
          alignItems: 'center',
          marginVertical: 10,
          cursor: 'pointer'
        },
        style
      ]}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
    >
      <Text style={{
        fontSize: 18,
        color: isPressed ? white : black
      }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default TextButton;