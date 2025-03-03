import React from 'react';
import { Box, styled } from '@mui/system';
import { Avatar } from '@mui/material';

type AIMessageProps = {
    className?: string;
    children: React.ReactNode;
};
function AIMessage({ className, children }: AIMessageProps) {
    return (
        <Box className={className}>
            <Box
                sx={{
                    width: '100%',
                    pr: {
                        xs: '25px',
                        md: '45%'
                    },
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'left',
                    alignItems: 'top'
                }}>
                <Avatar alt="AI" src="/ai.png" sx={{ mr: 1, mt: 1 }} />
                <Box
                    sx={{
                        flexGrow: 1,
                        overflow: 'hidden'
                    }}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
}

export default styled(AIMessage)({
    width: '100%'
});
