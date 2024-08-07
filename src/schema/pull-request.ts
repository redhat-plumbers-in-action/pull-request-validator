import { z } from 'zod';

export const pullRequestApiSchema = z.object({
  number: z.number(),
  base: z.string(),
  url: z.string().url(),
  labels: z.array(
    z.object({ name: z.string() }).transform(label => label.name)
  ),
  commits: z.array(
    z.object({
      sha: z.string(),
    })
  ),
  author_association: z.string(),
  auto_merge: z.boolean().nullable(),
  draft: z.boolean(),
  merged: z.boolean(),
  mergeable: z.boolean(),
  mergeable_state: z.string(),
});

export type PullRequestApi = z.infer<typeof pullRequestApiSchema>;

export const checkRunsSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    status: z.string(),
    conclusion: z.string().nullable(),
  })
);

export type CheckRuns = z.infer<typeof checkRunsSchema>;

const stateSchema = z.union([
  z.literal('success'),
  z.literal('pending'),
  z.literal('failure'),
  z.literal('error'),
]);

export const statusSchema = z.object({
  state: stateSchema,
  total_count: z.number(),
  statuses: z.array(
    z.object({
      state: stateSchema,
      context: z.string(),
      description: z.string().nullable(),
    })
  ),
});

export type Status = z.infer<typeof statusSchema>;

export const reviewsSchema = z.array(
  z.object({
    id: z.number(),
    user: z.object({
      login: z.string(),
      type: z.string(),
    }),
    body: z.string(),
    state: z.string(),
    author_association: z.string(),
    submitted_at: z.string().datetime(),
  })
);

export type Reviews = z.infer<typeof reviewsSchema>;

export const reviewRequestsSchema = z.array(
  z
    .object({
      login: z.string(),
    })
    .transform(user => user.login)
);

export type ReviewRequests = z.infer<typeof reviewRequestsSchema>;
