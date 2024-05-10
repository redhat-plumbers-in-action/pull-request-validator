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
    url: string;
    base: string;
    commits: {
        sha: string;
    }[];
    labels: string[];
    draft: boolean;
    auto_merge: boolean | null;
    author_association: string;
    merged: boolean;
    mergeable: boolean;
    mergeable_state: string;
}, {
    number: number;
    url: string;
    base: string;
    commits: {
        sha: string;
    }[];
    labels: {
        name: string;
    }[];
    draft: boolean;
    auto_merge: boolean | null;
    author_association: string;
    merged: boolean;
    mergeable: boolean;
    mergeable_state: string;
}>;
export type PullRequestApi = z.infer<typeof pullRequestApiSchema>;
export declare const checkRunsSchema: z.ZodArray<z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    status: z.ZodString;
    conclusion: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: number;
    status: string;
    name: string;
    conclusion: string | null;
}, {
    id: number;
    status: string;
    name: string;
    conclusion: string | null;
}>, "many">;
export type CheckRuns = z.infer<typeof checkRunsSchema>;
export declare const statusSchema: z.ZodObject<{
    state: z.ZodUnion<[z.ZodLiteral<"success">, z.ZodLiteral<"pending">, z.ZodLiteral<"failure">]>;
    total_count: z.ZodNumber;
    statuses: z.ZodArray<z.ZodObject<{
        state: z.ZodUnion<[z.ZodLiteral<"success">, z.ZodLiteral<"pending">, z.ZodLiteral<"failure">]>;
        context: z.ZodString;
        description: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        state: "pending" | "failure" | "success";
        description: string | null;
        context: string;
    }, {
        state: "pending" | "failure" | "success";
        description: string | null;
        context: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    state: "pending" | "failure" | "success";
    total_count: number;
    statuses: {
        state: "pending" | "failure" | "success";
        description: string | null;
        context: string;
    }[];
}, {
    state: "pending" | "failure" | "success";
    total_count: number;
    statuses: {
        state: "pending" | "failure" | "success";
        description: string | null;
        context: string;
    }[];
}>;
export type Status = z.infer<typeof statusSchema>;
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
    id: number;
    state: string;
    body: string;
    author_association: string;
    user: {
        type: string;
        login: string;
    };
    submitted_at: string;
}, {
    id: number;
    state: string;
    body: string;
    author_association: string;
    user: {
        type: string;
        login: string;
    };
    submitted_at: string;
}>, "many">;
export type Reviews = z.infer<typeof reviewsSchema>;
export declare const reviewRequestsSchema: z.ZodArray<z.ZodEffects<z.ZodObject<{
    login: z.ZodString;
}, "strip", z.ZodTypeAny, {
    login: string;
}, {
    login: string;
}>, string, {
    login: string;
}>, "many">;
export type ReviewRequests = z.infer<typeof reviewRequestsSchema>;
