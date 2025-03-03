import { useState, useEffect } from 'react';
import { UUID } from 'crypto';
import { ContextMessageType, MessageType, TextMessageType } from './types';

export function useAgentHistory(agentId: string) {
    const [history, setHistory] = useState<MessageType[]>([]);
    const [conversationUUID, setConversationUUID] = useState<UUID>(crypto.randomUUID());

    useEffect(() => {
        setHistory([]);
        setConversationUUID(crypto.randomUUID());
    }, [agentId]);

    const addMessage = (message: MessageType) => {
        setHistory(prevState => [...prevState, message]);
    };

    const handleAnswerEvent = (event: TextMessageType) => {
        setHistory(prevState => {
            if (prevState[prevState.length - 1]?.type !== 'ai') {
                const newMessage: TextMessageType = {
                    type: 'ai',
                    content: event.content as string
                };
                return [...prevState, newMessage];
            }
            return prevState.map((message, i, prev) => {
                if (prev.length - 1 === i) {
                    return {
                        ...message,
                        content: message.content + event.content
                    } as TextMessageType;
                }
                return message;
            });
        });
    };

    const handleContextEvent = (event: ContextMessageType) => {
        setHistory(prevState => {
            const contextMessage: ContextMessageType = {
                type: 'context',
                content: event.content
            };
            return [...prevState, contextMessage];
        });
    };

    const callBack = (message: MessageType) => {
        if (message.type === 'context') {
            handleContextEvent(message);
        } else if (message.type === 'answer') {
            handleAnswerEvent(message);
        }
    };

    return {
        history,
        addMessage,
        conversationUUID,
        callBack
    };
}
