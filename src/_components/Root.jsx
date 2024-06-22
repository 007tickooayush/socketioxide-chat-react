import React, { useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ErrorFallback';
import { AppContext } from '../_utils/context';


const Root = ({ children }) => {
    const [username, setUsername] = useState(null);
    return (
        <AppContext.Provider value={{ username, setUsername }}>
            <ErrorBoundary FallbackComponent={ErrorFallback} onError={(err, InfoAbout) => { console.error("Error occured: >>", err); console.error("Error occured: >>", err) }}>
                {children}
            </ErrorBoundary>
        </AppContext.Provider>
    )
}

export default Root;