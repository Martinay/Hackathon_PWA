import React, { Component } from 'react';
import azureApi from "../services/AzureApi";
import notificationService from "../services/NotificationService";
import { BuildInfo } from '../models/BuildInfo';
import Build from './Build'
import { List } from 'semantic-ui-react'

interface BuildsState{
  builds:BuildInfo[];
}

class Builds extends Component<any, BuildsState> {

  public urlB64ToUint8Array(base64String:string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

    public async componentDidMount() {
      this.updateBuilds();
      setInterval(() => this.updateBuilds(), 20000);
    }
    
  private async updateBuilds() {
    const buildInfos = await azureApi.getBuilds();
    this.setState({ builds: buildInfos });
    notificationService.showNotification("updated build")
  }

  render() {


    if(this.state == null)
      return(<div>Loading</div>)
      
    return (
      <List selection verticalAlign='middle'>
        {this.state.builds.map(x=> <Build build={x} key={x.id}/>)}
      </List>
    );
  }
}

export default Builds;
