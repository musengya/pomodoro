import * as PrimitiveProgress from '@radix-ui/react-progress';
import PropTypes from 'prop-types';

Progress.propTypes = {
  initialTime: PropTypes.number.isRequired,
  timeRemaining: PropTypes.number.isRequired,
};

export default function Progress({ initialTime, timeRemaining }) {
  const progress = timeRemaining === initialTime ? 0 : 100 - (timeRemaining / initialTime) * 100;

  return (
    <PrimitiveProgress.Root className="ProgressRoot" value={progress}>
      <PrimitiveProgress.Indicator
        className="ProgressIndicator"
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </PrimitiveProgress.Root>
  );
}
