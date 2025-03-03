import React from 'react';
import { styled } from '@mui/system';

function Logo({ className }: { className?: string }) {
    return <img className={className} src={'/transformers.svg'} />;
}

export default styled(Logo)({});
