import React, { Component } from 'react';
import { BuildInfo } from '../models/BuildInfo';
import { List } from 'semantic-ui-react'

interface BuildProps{
  build:BuildInfo;
}

class Build extends Component<BuildProps, any> {
    
  render() {      
    return (
        <List.Item>{this.props.build.buildName}:{this.props.build.requestedFor}</List.Item>
    );
  }
}

export default Build;
