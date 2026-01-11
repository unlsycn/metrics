describe("RecentAnalyzer", () => {
  test("handles events without commits", async () => {
    const {RecentAnalyzer} = await import("../source/plugins/languages/analyzer/recent.mjs")
    const rest = {
      activity: {
        listEventsForAuthenticatedUser: jest.fn().mockResolvedValue({
          data: [
            {
              type: "PushEvent",
              actor: {login: "someone"},
              repo: {name: "someone/repo"},
              payload: {ref: "refs/heads/main"},
              created_at: new Date().toISOString(),
            },
          ],
        }),
      },
      request: jest.fn(),
    }
    const analyzer = new RecentAnalyzer("tester", {rest, context: {mode: "user"}, load: 1})
    await expect(analyzer.patches()).resolves.toEqual([])
    expect(rest.request).not.toHaveBeenCalled()
  })
})
