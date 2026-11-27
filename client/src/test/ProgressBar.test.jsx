import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProgressBar from '../components/ProgressBar.jsx';

describe('ProgressBar', () => {
  it('рендерить доступну шкалу з відсотком зібраної суми', () => {
    render(<ProgressBar collected={25000} goal={100000} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '25');
    expect(screen.getByText('25%')).toBeInTheDocument();
  });
});
