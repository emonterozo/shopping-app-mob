import React, { useState } from 'react';
import { Snackbar } from 'react-native-paper';

const CSnackbar = (props) => {
    const [ isVisible, setIsVisible ] = useState(true)
    return (
        <Snackbar
        visible={isVisible}
        duration={2000}
        onDismiss={() => setIsVisible(false) }>
            {props.description}
        </Snackbar>
    )
}

export default CSnackbar