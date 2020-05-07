import React, {Component} from "react";
import { Button, Card, CardHeader, CardBody, TextContent,Text } from "@patternfly/react-core";
import { RebootingIcon ,ErrorCircleOIcon, OkIcon } from "@patternfly/react-icons";

class ComponentCard extends Component {
  static defaultProps = {
    name: "default name",
    endpoint: ""
  }

  constructor(props) {
    super(props);
    this.state = {
      serviceState: {"state": "Unknown", "isAvailable": false}
    };
  }

  componentDidMount() {
    this.refreshServiceState();
  }

  refreshServiceState = () => {
    const { endpoint } = this.props;
    const backendEndpoint = process.env.REACT_APP_BACKEND_ENDPOINT || "backend";
    const fullURL = `http://${process.env.REACT_APP_GW_ENDPOINT}/${backendEndpoint}/${endpoint}`;
    console.log(`Checking ${fullURL}`);

    fetch(fullURL)
      .then(serviceState => serviceState.json())
      .then(serviceState => this.setState({
        serviceState
      }))
      .catch(err => {
        console.log(err);
        this.setState({serviceState: {"state": "Down", "isAvailable": false}});
      });
  }

  render() {
    const { serviceState } = this.state; 
    const { name } = this.props;
    return (
      <Card className={serviceState.isAvailable ? "border-top-blue": "border-top-red"} style={{margin: "20px"}} >
          
        <CardHeader>
          {name}
          <Button onClick={this.refreshServiceState} variant="plain" aria-label="Action">
            <RebootingIcon />
          </Button>
        </CardHeader>
            
        <CardBody>
          <TextContent>
            <Text component="p">
                Service state: {serviceState.state}
            </Text>
            <Text component="p">
                Service availability: {serviceState.isAvailable ? <OkIcon/> : <ErrorCircleOIcon/>}
            </Text>
          </TextContent>
        </CardBody>
      </Card>
    );
  }
}

export default ComponentCard;
