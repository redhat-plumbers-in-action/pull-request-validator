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
export declare const checkRunsSchema: z.ZodArray<z.ZodObject<{
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
export type CheckRuns = z.infer<typeof checkRunsSchema>;
export declare const statusSchema: z.ZodObject<{
    state: z.ZodUnion<[z.ZodLiteral<"success">, z.ZodLiteral<"pending">, z.ZodLiteral<"failure">]>;
    total_count: z.ZodNumber;
    statuses: z.ZodArray<z.ZodObject<{
        state: z.ZodUnion<[z.ZodLiteral<"success">, z.ZodLiteral<"pending">, z.ZodLiteral<"failure">]>;
        context: z.ZodString;
        description: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        state: "failure" | "success" | "pending";
        context: string;
        description: string | null;
    }, {
        state: "failure" | "success" | "pending";
        context: string;
        description: string | null;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    state: "failure" | "success" | "pending";
    total_count: number;
    statuses: {
        state: "failure" | "success" | "pending";
        context: string;
        description: string | null;
    }[];
}, {
    state: "failure" | "success" | "pending";
    total_count: number;
    statuses: {
        state: "failure" | "success" | "pending";
        context: string;
        description: string | null;
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
    author_association: string;
    id: number;
    state: string;
    user: {
        type: string;
        login: string;
    };
    body: string;
    submitted_at: string;
}, {
    author_association: string;
    id: number;
    state: string;
    user: {
        type: string;
        login: string;
    };
    body: string;
    submitted_at: string;
}>, "many">;
export type Reviews = z.infer<typeof reviewsSchema>;
export declare const reviewRequestsSchema: z.ZodArray<z.ZodObject<{
    login: z.ZodString;
}, "strip", z.ZodTypeAny, {
    login: string;
}, {
    login: string;
}>, "many">;
export type ReviewRequests = z.infer<typeof reviewRequestsSchema>;
