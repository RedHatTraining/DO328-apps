import React from "react";
import { List, ListItem } from "@patternfly/react-core";


export default class AnimalList extends React.Component {

    public render() {
        return (
            <List>
                <ListItem>Animal 1 <button>Adopt</button></ListItem>
                <ListItem>Animal 2 <button>Adopt</button></ListItem>
                <ListItem>Animal 3 <button>Adopt</button></ListItem>
            </List>
        );
    }

}
