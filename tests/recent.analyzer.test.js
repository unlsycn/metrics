describe("RecentAnalyzer", () => {
  test("handles events without commits", async () => {
    const {RecentAnalyzer} = await import("../source/plugins/languages/analyzer/recent.mjs")
    const {faker} = await import("@faker-js/faker")
    const listEvents = (await import("./mocks/api/github/rest/activity/listEventsForAuthenticatedUser.mjs")).default
    const compareCommitsWithBasehead = (await import("./mocks/api/github/rest/repos/compareCommitsWithBasehead.mjs")).default
    const requestMock = (await import("./mocks/api/github/rest/request.mjs")).default
    const rest = {
      activity: {
        listEventsForAuthenticatedUser: (...args) => listEvents({faker}, null, null, args),
      },
      repos: {
        compareCommitsWithBasehead: (...args) => compareCommitsWithBasehead({faker}, null, null, args),
      },
      request: (...args) => requestMock({faker}, null, null, args),
    }
    const analyzer = new RecentAnalyzer("tester", {rest, context: {mode: "user"}, load: 5})
    const patches = await analyzer.patches()
    expect(Array.isArray(patches)).toBe(true)
    expect(patches.length).toBeGreaterThan(0)
  })
})
