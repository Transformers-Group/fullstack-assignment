import { UUID } from 'crypto';

export type CollectionsWithoutContentType = {
    uuid: UUID;
    name: string;
    description?: string;
};

export type ApiErrorType = {
    status: number;
    message: string;
};

export type OpenApiFunctionSimplifiedType = {
    name: string;
    description?: string;
    frontend_metadata: any;
    display_name: string;
    display_description: string;
};

export type AgentType = {
    uuid: UUID;
    name: string;
    description?: string;
    system_prompt?: string;
    collections?: CollectionsWithoutContentType[];
    openapi_functions?: OpenApiFunctionSimplifiedType[];
};

export type HardcodedAgentType = {
    name: string;
    description: string;
    collections?: CollectionsWithoutContentType[];
    openapi_functions?: OpenApiFunctionSimplifiedType[];
};

export type FragmentType = {
    source: {
        uuid?: UUID | string;
        name?: string;
        type: 'YOUTUBE' | 'PDF' | string;
        collection?: {
            [key: string]: any;
            name: string;
            description: string;
        };
        is_external?: boolean;
        url: string;
    };
    metadata: PdfMetadata & WebMetadata & YouTubeMetadata;
};

export type PdfMetadata = {
    page?: number;
};

export type WebMetadata = {
    processed?: Date;
};

export type YouTubeMetadata = {
    start?: number;
};

export type AgentSelectionType = 'rag' | UUID;

export const isAgentSelectionType = (agentId?: string): agentId is AgentSelectionType => {
    return (
        agentId === 'rag' ||
        (typeof agentId === 'string' && agentId.length === 36 && agentId.split('-').length === 5)
    );
};
