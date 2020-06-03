import React from "react";
import { Alert, AlertActionCloseButton, Text, TextContent } from "@patternfly/react-core";
import BullseyeSpinner from "./BullseyeSpinner";


type LoadingDataProps = {
    title?: string,
    showLoader: boolean,
    showError: boolean
    errorTitle: string,
    errorDescription: string,
    onErrorClosed: () => void
}

/**
 * Use this component when you need to show a loader while loading data
 * and possibly show an error alert if data can't be loaded
 */
export default class LoadingData extends React.Component<LoadingDataProps> {

    public render() {
        const {
            title,
            showLoader,
            showError,
            errorTitle,
            errorDescription,
            onErrorClosed,
            children
        } = this.props;
        return (
            <React.Fragment>
                {showError &&
                    <Alert
                        className="popup"
                        variant="danger"
                        title={errorTitle}
                        action={<AlertActionCloseButton onClose={onErrorClosed} />}>
                        {errorDescription}
                    </Alert>}
                {title &&<TextContent>
                    <Text component="h2">{title}</Text>
                </TextContent>}
                {showLoader && <BullseyeSpinner />}
                {children}
            </React.Fragment>
        );
    }
}