import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function Ratings({ value }) {
  return (
    <Stack spacing={1}>
      <Rating
        name='half-rating-read'
        defaultValue={4}
        value={value}
        precision={0.1}
        readOnly
        size='large'
      />
    </Stack>
  );
}
