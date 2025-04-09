'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface Stop {
  id: string;
  stopType: string;
  stopDescription: string;
  stopDate: string;
  stopTime: string;
  nextSteps: string;
  endStopDate: string | null;
  endStopTime: string | null;
}

export default function EquipmentStopsToggle({ stops }: { stops: Stop[] }) {
  const [showStops, setShowStops] = useState(false);

  return (
    <div>
      <Button onClick={() => setShowStops((prev) => !prev)} className="mb-4">
        {showStops ? 'Закрити зупинки' : 'Показати зупинки?'}
      </Button>

      {showStops &&
        stops.map((stop) => (
          <div key={stop.id} className="flex flex-col">
            <span className="font-semibold">stopDate:</span>
            <p>{stop.stopDate}</p>
            <span className="font-semibold">stopTime:</span>
            <p>{stop.stopTime}</p>
            <span className="font-semibold">stopType:</span>
            <p>{stop.stopType}</p>

            <span className="font-semibold">stopDescription:</span>
            <p>{stop.stopDescription}</p>
            <span className="font-semibold">nextSteps:</span>
            <p>{stop.nextSteps}</p>
            <span className="font-semibold">endStopDate:</span>
            <p>{stop.endStopDate || '—'}</p>
            <span className="font-semibold">endStopTime:</span>
            <p>{stop.endStopTime || '—'}</p>
          </div>
        ))}
    </div>
  );
}
