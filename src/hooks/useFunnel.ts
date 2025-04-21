import { useMemo } from "react";
import { FunnelInput } from "../core/funnel_input";
import { FunnelDataConverter } from "../core/funnel_data_converter";

export const useFunnel = (data: FunnelInput[]) => {
  return useMemo(() => {
    return new FunnelDataConverter(data).data;
  }, [data]);
};
