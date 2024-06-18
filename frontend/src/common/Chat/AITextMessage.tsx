import React from 'react';
import { styled } from '@mui/system';
import { CircularProgress } from '@mui/material';
import Card from '../ui/Card';
import AIMessage from './AIMessage';

type AITextMessageProps = {
    className?: string;
    message: React.ReactNode;
};

function AITextMessage({ className, message }: AITextMessageProps) {
    return (
        <AIMessage className={className}>
            <Card
                sx={{
                    width: '100%',
                    whiteSpace: 'pre-wrap',
                    backgroundColor: t => t.palette.primary.main,
                    color: t => t.palette.primary.contrastText,
                    p: 2
                }}>
                {!message && <CircularProgress color="primary" size={15} />}
                {message}
            </Card>
        </AIMessage>
    );
}

export default styled(AITextMessage)({
    width: '100%'
});
