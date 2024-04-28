export interface userType {
    avatar:string;
    exp:number;
    iat:number;
    id:string;
    identity:string;
    name:string;
}

export interface taskType {
    id:string;
    name:string;
    creator:string;
    description:string;
    progressPercentage:number;
    timestamp: number;
}

export interface repositoryType{
    id: number;
    name: string;
    description: string;
    language: string;
    stargazers_count: number;
    forks_count: number;
    html_url: string;
}
