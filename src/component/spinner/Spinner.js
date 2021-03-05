import React, { useEffect, useState } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';

const CSpinner = () => {
    
    return (
        <Spinner
        visible={true}
        textContent={'Loading...'}
      />
    )
}

export default CSpinner