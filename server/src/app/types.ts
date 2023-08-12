type JSONArray = Array<JSONValue>;
type JSONObject = { [k: string]: JSONValue };
export type JSONValue = undefined | null | string | number | JSONArray | JSONObject;

export type JSONResponseSuccessType<T = JSONValue> = T extends JSONValue
  ? {
      success: true;
      data: T;
    }
  : {
      success: true;
      data: JSONValue;
    };

export type ResponseErrorType = {
  success: false;
  message: string;
};
