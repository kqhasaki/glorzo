import { listOSSMusics } from "@glorzo-server/oss";

describe("listBucket", () => {
  test("resolves to a JSON string", async () => {
    let errorOccurred = false;
    try {
      const list = await listOSSMusics();
      console.log("list of bucket: ", list);
    } catch (error) {
      errorOccurred = true;
    }
    expect(errorOccurred).toBe(false);
  });
});
