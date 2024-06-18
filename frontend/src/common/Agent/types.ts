import { FragmentType } from '../hooks/apiTypes';

export type MessageType = TextMessageType | ContextMessageType | FinishMessageType;

export type TextMessageType = {
    type: 'ai' | 'human' | 'answer';
    content: string;
};

export type FinishMessageType = {
    type: 'finish';
    content: string;
};

export type ContextMessageType = {
    type: 'context';
    content: FragmentType[];
};
