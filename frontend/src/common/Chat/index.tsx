import React, { useEffect, useRef, useState } from 'react';
import AIMessage from './AITextMessage';
import { Box, styled } from '@mui/system';
import HumanMessage from './HumanTextMessage';
import { Alert } from '@mui/material';
import AgentHeader from './AgentHeader';
import ChatInput from './ChatInput';
import LoadingMessage from './LoadingMessage';
import { MessageType } from '../Agent/types';

type ChatProps = {
    className?: string;
    history: MessageType[];
    error: any;
    isPending: boolean;
    submit: (query: string) => void;
};

function Chat({ className, history, error, isPending, submit }: ChatProps) {
    const [userInput, setUserInput] = useState('');
    const scollboxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Scroll to the bottom when the box grows but only if the user is not scolled up
        if (scollboxRef.current) {
            scollboxRef.current.scrollTop = scollboxRef.current.scrollHeight;
        }
    }, [scollboxRef.current?.scrollHeight | 0, scollboxRef]);

    const isLastMessageNotAi = history?.length > 0 && history[history.length - 1].type !== 'ai';

    const innerSubmit = (query?: string) => {
        query = query || userInput;
        submit(query);
        setUserInput('');
    };

    return (
        <Box className={className} ref={scollboxRef}>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    Er is iets mis gegaan.
                </Alert>
            )}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: t => t.spacing(2)
                }}>
                <AgentHeader></AgentHeader>
                {history?.map((message, i) => {
                    if (message.type === 'human') {
                        return <HumanMessage key={i} message={message.content} />;
                    } else if (message.type === 'ai') {
                        return <AIMessage key={i} message={message.content} />;
                    }
                })}
                {isPending && isLastMessageNotAi && <LoadingMessage />}
            </Box>
            <ChatInput
                sx={{ mt: 2 }}
                submit={innerSubmit}
                value={userInput}
                setValue={setUserInput}
                showSuggestions={history?.length === 0}
                disabled={isPending}></ChatInput>
        </Box>
    );
}

export default styled(Chat)({
    height: '100%'
});
