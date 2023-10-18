import { useState } from "react";

function useForceUpdate() {
  const [, setTick] = useState(0);
  return () => setTick((tick) => tick + 1);
}

export default useForceUpdate;
