import React from 'react';
import { Box, styled } from '@mui/system';

const Dot = styled('div')(({ theme }) => ({
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
    animation: 'blink 1.4s infinite both',
    '&:nth-of-type(1)': {
        animationDelay: '0s'
    },
    '&:nth-of-type(2)': {
        animationDelay: '0.2s'
    },
    '&:nth-of-type(3)': {
        animationDelay: '0.4s'
    },
    '@keyframes blink': {
        '0%': {
            opacity: 0.2
        },
        '20%': {
            opacity: 1
        },
        '100%': {
            opacity: 0.2
        }
    }
}));

const DotsLoadingIndicator = ({ className }: { className?: string }) => (
    <Box className={className}>
        <Dot />
        <Dot />
        <Dot />
    </Box>
);

const StyledDotsLoadingIndicator = styled(DotsLoadingIndicator)({
    display: 'flex',
    alignItems: 'center',
    gap: 6
});

export default StyledDotsLoadingIndicator;
