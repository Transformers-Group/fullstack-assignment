import React from 'react';
import { styled } from '@mui/system';
import AIMessage from './AIMessage';
import DotsLoadingIndicator from '../ui/DotsLoadingIndicator';

type AILoadingMessageProps = {
    className?: string;
};

function AILoadingMessage({ className }: AILoadingMessageProps) {
    return (
        <AIMessage className={className}>
            <DotsLoadingIndicator sx={{ paddingTop: 3, marginLeft: 1 }} />
        </AIMessage>
    );
}

export default styled(AILoadingMessage)({
    display: 'flex',
    alignItems: 'center'
});
