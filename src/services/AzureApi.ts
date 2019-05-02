import axios from "axios";
import { BuildInfo } from "../models/BuildInfo";
import { BuildResult } from "../models/BuildResult";

export class AzureApi {

    public async getBuilds(): Promise<BuildInfo[]> {
        const devopsProjectUrl = "enter your devops project url here";
        const response = await axios.get(
            devopsProjectUrl + "/_apis/build/builds?api-version=5.0",
            {
                auth : {
                   username: "enter your username here",
                   password: "enter your api token here",
                }
            });

        const data = response.data.value.map((x: any) => <BuildInfo>{ id: x.id, buildName:x.buildNumber, result:this.convertResult(x.result), requestedFor:x.requestedFor.displayName });

        console.log(data);
        return data;
    }

    private convertResult(result:string) : BuildResult{
        switch (result) {
            case undefined:
                return BuildResult.none;
            case "succeeded":
                return BuildResult.succeeded;                
            case "failed":
            return BuildResult.failed;
            case "canceled":
            return BuildResult.canceled;
            default:
                throw `BuildResult is not provided ${result}`;                
        }
    }
}

const api = new AzureApi();
export default api;