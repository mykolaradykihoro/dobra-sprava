import React from 'react';
import { formatMoney, getProgress } from '../lib/format.js';

export default function ProgressBar({ collected, goal, compact = false }) {
  const progress = getProgress(collected, goal);
  return (
    <div className={`progress ${compact ? 'progress--compact' : ''}`}>
      <div className="progress__numbers">
        <strong>{formatMoney(collected)}</strong>
        <span>{progress}%</span>
      </div>
      <div
        className="progress__track"
        role="progressbar"
        aria-label="Прогрес збору коштів"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={progress}
      >
        <span className="progress__fill" style={{ width: `${progress}%` }} />
      </div>
      {!compact && <div className="progress__foot"><span>Зібрано</span><span>Ціль: {formatMoney(goal)}</span></div>}
    </div>
  );
}
