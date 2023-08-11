type JSONArray = Array<JSONValue>;
type JSONObject = { [k: string]: JSONValue };
export type JSONValue =
  | undefined
  | null
  | string
  | number
  | JSONArray
  | JSONObject;

export type JSONResponseSuccessType = {
  success: true;
  data: JSONValue;
};

export type ResponseErrorType = {
  success: false;
  message: string;
};
