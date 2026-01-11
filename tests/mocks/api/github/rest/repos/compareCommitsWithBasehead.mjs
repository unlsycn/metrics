/**Mocked data */
export default async function({faker}, target, that, [{owner, repo, basehead}]) {
  console.debug(`metrics/compute/mocks > mocking rest api result > rest.repos.compareCommitsWithBasehead (${owner}/${repo} ${basehead})`)
  return ({
    status: 200,
    url: `https://api.github.com/repos/${owner}/${repo}/compare/${basehead}`,
    data: {
      commits: [
        {
          sha: "MOCKED_SHA",
          url: "https://api.github.com/repos/gh-metrics/metrics/commits/MOCKED_SHA",
          commit: {
            author: {
              name: faker.person.firstName(),
              email: "author@example.com",
              date: `${faker.date.recent({days: 7})}`,
            },
            committer: {
              name: faker.person.firstName(),
              email: "committer@example.com",
              date: `${faker.date.recent({days: 7})}`,
            },
            message: "Mocked commit fetched via compare",
          },
        },
      ],
    },
  })
}
