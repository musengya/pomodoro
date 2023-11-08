import * as Progress from '@radix-ui/react-progress';
import { useEffect, useState } from 'react';

export default function ProgressDemo() {
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Progress.Root className="ProgressRoot" value={progress}>
      <Progress.Indicator className="ProgressIndicator" style={{ transform: `translateX(${100 - progress}%)` }} />
    </Progress.Root>
  );
}
