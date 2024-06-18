import { createLazyFileRoute } from '@tanstack/react-router';
import React from 'react';

export const Route = createLazyFileRoute('/top-reviewers')({
  component: TopReviewers
});

function TopReviewers() {
  return <div>TopReviewers</div>;
}

export default TopReviewers;
