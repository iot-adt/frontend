export const accessLogsQuery = {
  queryKey: ["temporary-user"],
  queryFn: () =>
    Promise.resolve([
      {
        id: "1",
        timestamp: "2023-06-01 09:15:30",
        success: true,
        name: "홍길동",
        accessMethod: "카드",
        validPeriod: "2023-06-01 ~ 2023-12-31",
      },
      {
        id: "2",
        timestamp: "2023-06-02 14:30:45",
        success: false,
        name: "김철수",
        accessMethod: "지문",
        validPeriod: "2023-05-01 ~ 2023-05-31",
      },
      {
        id: "3",
        timestamp: "2023-06-03 11:20:15",
        success: true,
        name: "이영희",
        accessMethod: "얼굴인식",
        validPeriod: "2023-06-01 ~ 2024-05-31",
      },
      {
        id: "4",
        timestamp: "2023-06-04 16:45:00",
        success: true,
        name: "박지성",
        accessMethod: "카드",
        validPeriod: "2023-06-01 ~ 2023-08-31",
      },
      {
        id: "5",
        timestamp: "2023-06-05 08:00:30",
        success: false,
        name: "최민수",
        accessMethod: "지문",
        validPeriod: "2023-07-01 ~ 2023-12-31",
      },
    ]),
};
