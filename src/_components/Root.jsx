import React from 'react'
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ErrorFallback';

const Root = ({children}) => {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback} onError={(err,InfoAbout) => {console.error("Error occured: >>",err); console.error("Error occured: >>",err)}}>
            {children}
        </ErrorBoundary>
    )
}

export default Root;