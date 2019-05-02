import { BuildResult } from "./BuildResult";
export interface BuildInfo {
    id: number;
    result: BuildResult;
    buildName: string;
    requestedFor: string;
    
}
