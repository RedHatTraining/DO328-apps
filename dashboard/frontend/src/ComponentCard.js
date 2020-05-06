import React, {Component} from 'react';
import { Card, CardHeader, CardBody, TextContent,Text } from '@patternfly/react-core'
import { CheckCircleIcon, ErrorCircleOIcon } from '@patternfly/react-icons';

class ComponentCard extends Component {
  static defaultProps = {
    name: "default name",
    url: ""
  }

  constructor(props) {
    super(props);
    this.state = {
        serviceState: {"state": "Unknown", "isAvailable": false}
    };
  }

  componentDidMount() {
    const { endpoint } = this.props

    fetch(`http://${process.env.REACT_APP_GW_ENDPOINT}/${endpoint}`)
        .then(serviceState => serviceState.json())
        .then(serviceState => this.setState({
          serviceState
        }))
        .catch(err => console.log(err));
  }

  render() {
    const { serviceState } = this.state 
    const { name } = this.props
    return (
      <Card style={{margin: '20px'}} >
          <CardHeader>{name}</CardHeader>
          <CardBody>
            <TextContent>
            <Text component="p">
                Service state: {serviceState.state}
              </Text>
              <Text component="p">
                Service availability: {serviceState.isAvailable ? <CheckCircleIcon/> : <ErrorCircleOIcon/>}
              </Text>
            </TextContent>
          </CardBody>
      </Card>
    );
  }
}

export default ComponentCard;
