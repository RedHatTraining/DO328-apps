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
        return (
            <React.Fragment>
                {this.renderTitle()}
                {this.renderError()}
                {this.renderSpinner()}
                {this.props.children}
            </React.Fragment>
        );
    }

    private renderTitle(): React.ReactNode {
        return this.props.title && <TextContent>
            <Text component="h2">{this.props.title}</Text>
        </TextContent>;
    }

    private renderError(): React.ReactNode {
        const {
            showError,
            errorTitle,
            errorDescription,
            onErrorClosed
        } = this.props;
        return showError &&
            <Alert
                className="popup"
                variant="danger"
                title={errorTitle}
                action={<AlertActionCloseButton onClose={onErrorClosed} />}
            >
                {errorDescription}
            </Alert>;
    }

    private renderSpinner(): React.ReactNode {
        return this.props.showLoader && <BullseyeSpinner />;
    }
}
