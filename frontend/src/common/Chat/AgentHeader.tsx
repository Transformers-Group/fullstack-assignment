import React from 'react';
import Typography from '@mui/material/Typography';
import AITextMessage from './AITextMessage';
import { AgentSelectionType } from '../hooks/apiTypes';

function AgentHeader() {
    const { data } = {
        data: {
            name: 'Astrid',
            description: 'Astrid is a virtual assistant that can help you with your questions.'
        }
    };

    return (
        <>
            <AITextMessage
                message={
                    <>
                        <Typography gutterBottom variant="h4">
                            {data?.name}
                        </Typography>
                        <Typography variant="body2">
                            {data?.description || 'No description available'}
                        </Typography>
                    </>
                }
            />
        </>
    );
}

export default AgentHeader;
