import React, {useCallback} from 'react';
import {Box, styled} from '@mui/system';
import {Grid} from '@mui/material';
import Chat from '../Chat';
import {AgentSelectionType} from '../hooks/apiTypes';
import {MessageType} from "./types";

type IndexProps = {
    className?: string;
};

function Agent({ className }: IndexProps) {
    //implement the agent logic

    const history: MessageType[] = [
        {
            type: 'ai',
            content: 'Hello! Welcome!'
        },
        {
            type: 'human',
            content: 'Thank you, how are you today?'
        },
        {
            type: 'ai',
            content: "As an AI I don't have feelings"
        }
    ];

    const submit = (val: string) => {
        console.log('I should be submitting:', val);
    };

    return (
        <Box className={className}>
            <Grid container spacing={3} sx={{ height: '100%' }}>
                <Grid item xs={12} md={8}>
                    <Box
                        sx={{
                            flexBasis: 200,
                            flexGrow: 2,
                            height: '100%',
                            position: 'relative'
                        }}>
                        <Chat
                            sx={{ overflowY: 'auto', overflowX: 'hidden', position: 'absolute' }}
                            history={history}
                            error={undefined}
                            isPending={false}
                            submit={submit}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default styled(Agent)({});
