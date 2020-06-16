import { Bullseye, Spinner } from "@patternfly/react-core";
import React from "react";

export default function BullseyeSpinner() {
    return (
        <Bullseye>
            <Spinner />
        </Bullseye>
    );
}
