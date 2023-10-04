import { z } from 'zod';
export declare const pullRequestApiSchema: z.ZodObject<{
    number: z.ZodNumber;
    base: z.ZodString;
    url: z.ZodString;
    labels: z.ZodArray<z.ZodEffects<z.ZodObject<{
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
    }, {
        name: string;
    }>, string, {
        name: string;
    }>, "many">;
    commits: z.ZodArray<z.ZodObject<{
        sha: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        sha: string;
    }, {
        sha: string;
    }>, "many">;
    author_association: z.ZodString;
    auto_merge: z.ZodNullable<z.ZodBoolean>;
    draft: z.ZodBoolean;
    merged: z.ZodBoolean;
    mergeable: z.ZodBoolean;
    mergeable_state: z.ZodString;
}, "strip", z.ZodTypeAny, {
    number: number;
    base: string;
    url: string;
    commits: {
        sha: string;
    }[];
    labels: string[];
    author_association: string;
    auto_merge: boolean | null;
    draft: boolean;
    merged: boolean;
    mergeable: boolean;
    mergeable_state: string;
}, {
    number: number;
    base: string;
    url: string;
    commits: {
        sha: string;
    }[];
    labels: {
        name: string;
    }[];
    author_association: string;
    auto_merge: boolean | null;
    draft: boolean;
    merged: boolean;
    mergeable: boolean;
    mergeable_state: string;
}>;
export type PullRequestApi = z.infer<typeof pullRequestApiSchema>;
export declare const checkRunsSchema: z.ZodObject<{
    total_count: z.ZodNumber;
    check_runs: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
        status: z.ZodString;
        conclusion: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        status: string;
        name: string;
        conclusion: string | null;
        id: number;
    }, {
        status: string;
        name: string;
        conclusion: string | null;
        id: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    total_count: number;
    check_runs: {
        status: string;
        name: string;
        conclusion: string | null;
        id: number;
    }[];
}, {
    total_count: number;
    check_runs: {
        status: string;
        name: string;
        conclusion: string | null;
        id: number;
    }[];
}>;
export type CheckRuns = z.infer<typeof checkRunsSchema>;
export declare const checkSuitesSchema: z.ZodObject<{
    total_count: z.ZodNumber;
    check_suites: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        status: z.ZodString;
        conclusion: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        status: string;
        conclusion: string | null;
        id: number;
    }, {
        status: string;
        conclusion: string | null;
        id: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    total_count: number;
    check_suites: {
        status: string;
        conclusion: string | null;
        id: number;
    }[];
}, {
    total_count: number;
    check_suites: {
        status: string;
        conclusion: string | null;
        id: number;
    }[];
}>;
export type CheckSuites = z.infer<typeof checkSuitesSchema>;
export declare const reviewsSchema: z.ZodArray<z.ZodObject<{
    id: z.ZodNumber;
    user: z.ZodObject<{
        login: z.ZodString;
        type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
        login: string;
    }, {
        type: string;
        login: string;
    }>;
    body: z.ZodString;
    state: z.ZodString;
    author_association: z.ZodString;
    submitted_at: z.ZodString;
}, "strip", z.ZodTypeAny, {
    author_association: string;
    id: number;
    user: {
        type: string;
        login: string;
    };
    body: string;
    state: string;
    submitted_at: string;
}, {
    author_association: string;
    id: number;
    user: {
        type: string;
        login: string;
    };
    body: string;
    state: string;
    submitted_at: string;
}>, "many">;
export type Reviews = z.infer<typeof reviewsSchema>;
