import React from 'react';
import { HelperText } from 'react-native-paper';

const CHelper = (props) => {
    return (
        <HelperText type={props.type} visible={true}>
            {props.message}
        </HelperText>
    )
}


export default CHelper