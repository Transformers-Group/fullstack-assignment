import React from 'react';
import { Card as MuiCard } from '@mui/material';
import { styled } from '@mui/system';

function Card({ children, className }: { children?: React.ReactNode; className?: string }) {
    return <MuiCard className={className}>{children}</MuiCard>;
}

export default styled(Card)({});
