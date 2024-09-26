import { getInput } from '@actions/core';
import { z } from 'zod';
import { Config } from './config';
import { getFailedMessage, getSuccessMessage, raise, removeLabel, setLabels, } from './util';
async function action(octokit, owner, repo, pr) {
    let message = [];
    let err = [];
    let labels = { add: [], remove: [] };
    const config = await Config.getConfig(octokit);
    const isCiWaived = pr.currentLabels.includes(config.labels['waiving-failing-ci']);
    const ciPassed = await pr.isCIGreen(config.ignoreChecks);
    if (!ciPassed.result && !isCiWaived) {
        labels.add.push(config.labels['missing-failing-ci']);
        err.push(`🔴 ${ciPassed.message}`);
    }
    else {
        if (pr.currentLabels.includes(config.labels['missing-failing-ci'])) {
            removeLabel(octokit, owner, repo, pr.number, config.labels['missing-failing-ci']);
        }
        isCiWaived
            ? message.push(`🟡 CI - Waived`)
            : message.push(`🟢 CI - All checks have passed`);
    }
    await pr.reviews.initialize();
    const requiredApprovalsRay = z.coerce
        .number()
        .safeParse(getInput('required-approvals'));
    const requiredApprovals = requiredApprovalsRay.success
        ? requiredApprovalsRay.data
        : 1;
    if (!pr.reviews.isReviewed(requiredApprovals)) {
        labels.add.push(config.labels['missing-review']);
        err.push(`🔴 Review - Missing review from a member (_**${requiredApprovals}** required_)`);
        if (pr.reviews.reviews.size > 0) {
            message.push(`🟢 Review - Reviewed by ${pr.reviews.reviews.forEach((_value, key, _map) => {
                return `\`${key}\` `;
            })}`);
        }
        if (pr.currentLabels.includes(config.labels['changes-requested'])) {
            removeLabel(octokit, owner, repo, pr.number, config.labels['changes-requested']);
        }
    }
    else {
        if (pr.currentLabels.includes(config.labels['missing-review'])) {
            removeLabel(octokit, owner, repo, pr.number, config.labels['missing-review']);
        }
        message.push(`🟢 Review - Reviewed by a member`);
        if (!pr.reviews.isApproved()) {
            labels.add.push(config.labels['changes-requested']);
            err.push(`🔴 Approval - missing or changes were requested`);
        }
        else {
            if (pr.currentLabels.includes(config.labels['changes-requested'])) {
                removeLabel(octokit, owner, repo, pr.number, config.labels['changes-requested']);
            }
            message.push(`🟢 Approval - Changes were approved`);
        }
    }
    setLabels(octokit, owner, repo, pr.number, labels.add);
    if (err.length > 0) {
        const result = getFailedMessage(err) + '\n\n' + getSuccessMessage(message);
        if (isCiWaived) {
            return result;
        }
        raise(result);
    }
    return getSuccessMessage(message);
}
export default action;
//# sourceMappingURL=action.js.map