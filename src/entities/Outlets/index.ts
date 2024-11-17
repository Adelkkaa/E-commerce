export { useGetOutletsQuery } from "./api/outletsApi";
export {
  type IOutletsDialogSchemaInitialType,
  type IOutletsDialogSchemaType,
  OutletsDialogSchema,
} from "./model/OutletsDialog.schema";
export { outletsActions, outletsReducer } from "./model/OutletsSlice";
export type { IOutletsItem, IOutletsResponse } from "./model/types";
