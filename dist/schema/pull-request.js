import { z } from 'zod';
export const pullRequestApiSchema = z.object({
    number: z.number(),
    base: z.string(),
    url: z.string().url(),
    labels: z.array(z.object({ name: z.string() }).transform(label => label.name)),
    commits: z.array(z.object({
        sha: z.string(),
    })),
    author_association: z.string(),
    auto_merge: z.boolean().nullable(),
    draft: z.boolean(),
    merged: z.boolean(),
    mergeable: z.boolean(),
    mergeable_state: z.string(),
});
export const checkRunsSchema = z.object({
    total_count: z.number(),
    check_runs: z.array(z.object({
        id: z.number(),
        name: z.string(),
        status: z.string(),
        conclusion: z.string().nullable(),
    })),
});
const stateSchema = z.union([
    z.literal('success'),
    z.literal('pending'),
    z.literal('failure'),
]);
export const statusSchema = z.object({
    state: stateSchema,
    total_count: z.number(),
    statuses: z.array(z.object({
        state: stateSchema,
        context: z.string(),
        description: z.string(),
    })),
});
export const reviewsSchema = z.array(z.object({
    id: z.number(),
    user: z.object({
        login: z.string(),
        type: z.string(),
    }),
    body: z.string(),
    state: z.string(),
    author_association: z.string(),
    submitted_at: z.string().datetime(),
}));
//# sourceMappingURL=pull-request.js.map