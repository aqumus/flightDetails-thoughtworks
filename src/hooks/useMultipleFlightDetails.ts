import { useState, useCallback } from 'react';

export const useMultipleFlightDetails = () => {
  const [showDetails, _toggleDetails] = useState(false);
  const toggleDetails = useCallback(() => {
    _toggleDetails(!showDetails);
  }, [showDetails, _toggleDetails]);

  return { showDetails, toggleDetails };
};
