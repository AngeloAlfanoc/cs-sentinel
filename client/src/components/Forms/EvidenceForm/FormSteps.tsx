import React from 'react';
import EvidenceForm from './EvidenceForm';
import TypeSelectionForm from './TypeSelectionForm';

export type EvidenceType = 'Image' | 'Text' | 'Video' | 'Demo';

export enum EvidenceSteps {
  StepOne,
  StepTwo
}

export const steps = [
  <TypeSelectionForm key={EvidenceSteps.StepOne} />,
  <EvidenceForm key={EvidenceSteps.StepTwo} />
];
