import axios from "axios";

export const fetchApiData = async () => {
  try {
    const response = await axios.get(
      "https://open.assembly.go.kr/portal/openapi/nwvrqwxyaytdsfvhu",
      {
        params: {
          KEY: "7ad0870915b64a82a334a394151caee5",
          Type: "json",
          pIndex: 1,
          pSize: 300,
        },
      }
    );
    return response.data.nwvrqwxyaytdsfvhu[1].row;
  } catch (error) {
    console.error("API 호출 오류:", error);
    return [];
  }
};