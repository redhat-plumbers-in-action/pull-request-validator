import { Endpoints } from '@octokit/types';

import { statusSchema } from '../../../src/schema/pull-request';

const statusAPIResponseSuccessRaw: Endpoints['GET /repos/{owner}/{repo}/commits/{ref}/status']['response']['data'] =
  {
    state: 'success',
    statuses: [
      {
        url: 'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/statuses/dbb57d34622b6ada191e0ffba12e75d5d34fd299',
        avatar_url: 'https://avatars.githubusercontent.com/u/679338?v=4',
        id: 25643551563,
        node_id: 'SC_kwDOFVWNns8AAAAF-HmLSw',
        state: 'success',
        description: 'build passed (ping @mrc0mmand for any questions)\n ',
        target_url:
          'https://jenkins-systemd.apps.ocp.cloud.ci.centos.org/job/rhel9-centos9-sanitizers/129/',
        context: 'CentOS CI (CentOS Stream 9 + sanitizers)',
        created_at: '2023-10-18T14:50:57Z',
        updated_at: '2023-10-18T14:50:57Z',
      },
      {
        url: 'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/statuses/dbb57d34622b6ada191e0ffba12e75d5d34fd299',
        avatar_url: 'https://avatars.githubusercontent.com/u/679338?v=4',
        id: 25644074809,
        node_id: 'SC_kwDOFVWNns8AAAAF-IGHOQ',
        state: 'success',
        description: 'build passed (ping @mrc0mmand for any questions)\n ',
        target_url:
          'https://jenkins-systemd.apps.ocp.cloud.ci.centos.org/job/rhel9-centos9/136/',
        context: 'CentOS CI (CentOS Stream 9)',
        created_at: '2023-10-18T15:10:07Z',
        updated_at: '2023-10-18T15:10:07Z',
      },
    ],
    sha: 'dbb57d34622b6ada191e0ffba12e75d5d34fd299',
    total_count: 2,
    repository: {
      id: 357928350,
      node_id: 'MDEwOlJlcG9zaXRvcnkzNTc5MjgzNTA=',
      name: 'systemd-rhel9',
      full_name: 'redhat-plumbers/systemd-rhel9',
      private: false,
      owner: {
        login: 'redhat-plumbers',
        id: 84723483,
        node_id: 'MDEyOk9yZ2FuaXphdGlvbjg0NzIzNDgz',
        avatar_url: 'https://avatars.githubusercontent.com/u/84723483?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/redhat-plumbers',
        html_url: 'https://github.com/redhat-plumbers',
        followers_url: 'https://api.github.com/users/redhat-plumbers/followers',
        following_url:
          'https://api.github.com/users/redhat-plumbers/following{/other_user}',
        gists_url:
          'https://api.github.com/users/redhat-plumbers/gists{/gist_id}',
        starred_url:
          'https://api.github.com/users/redhat-plumbers/starred{/owner}{/repo}',
        subscriptions_url:
          'https://api.github.com/users/redhat-plumbers/subscriptions',
        organizations_url: 'https://api.github.com/users/redhat-plumbers/orgs',
        repos_url: 'https://api.github.com/users/redhat-plumbers/repos',
        events_url:
          'https://api.github.com/users/redhat-plumbers/events{/privacy}',
        received_events_url:
          'https://api.github.com/users/redhat-plumbers/received_events',
        type: 'Organization',
        site_admin: false,
      },
      html_url: 'https://github.com/redhat-plumbers/systemd-rhel9',
      description: '9️ systemd source-git for RHEL9',
      fork: false,
      url: 'https://api.github.com/repos/redhat-plumbers/systemd-rhel9',
      forks_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/forks',
      keys_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/keys{/key_id}',
      collaborators_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/collaborators{/collaborator}',
      teams_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/teams',
      hooks_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/hooks',
      issue_events_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/issues/events{/number}',
      events_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/events',
      assignees_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/assignees{/user}',
      branches_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/branches{/branch}',
      tags_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/tags',
      blobs_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/git/blobs{/sha}',
      git_tags_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/git/tags{/sha}',
      git_refs_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/git/refs{/sha}',
      trees_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/git/trees{/sha}',
      statuses_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/statuses/{sha}',
      languages_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/languages',
      stargazers_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/stargazers',
      contributors_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/contributors',
      subscribers_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/subscribers',
      subscription_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/subscription',
      commits_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/commits{/sha}',
      git_commits_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/git/commits{/sha}',
      comments_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/comments{/number}',
      issue_comment_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/issues/comments{/number}',
      contents_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/contents/{+path}',
      compare_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/compare/{base}...{head}',
      merges_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/merges',
      archive_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/{archive_format}{/ref}',
      downloads_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/downloads',
      issues_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/issues{/number}',
      pulls_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/pulls{/number}',
      milestones_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/milestones{/number}',
      notifications_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/notifications{?since,all,participating}',
      labels_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/labels{/name}',
      releases_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/releases{/id}',
      deployments_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/deployments',
    },
    commit_url:
      'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/commits/dbb57d34622b6ada191e0ffba12e75d5d34fd299',
    url: 'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/commits/dbb57d34622b6ada191e0ffba12e75d5d34fd299/status',
  };

const statusAPIResponseFailedRaw: Endpoints['GET /repos/{owner}/{repo}/commits/{ref}/status']['response']['data'] =
  {
    state: 'failure',
    statuses: [
      {
        url: 'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/statuses/271ec5d14b429d26dec3b1cf209d59ad130bfa0e',
        avatar_url: 'https://avatars.githubusercontent.com/u/679338?v=4',
        id: 25345406312,
        node_id: 'SC_kwDOFVWNns8AAAAF5rQ1aA',
        state: 'failure',
        description: 'build failed (ping @mrc0mmand for any questions)\n ',
        target_url:
          'https://jenkins-systemd.apps.ocp.cloud.ci.centos.org/job/rhel9-centos9-sanitizers/126/',
        context: 'CentOS CI (CentOS Stream 9 + sanitizers)',
        created_at: '2023-09-29T18:31:42Z',
        updated_at: '2023-09-29T18:31:42Z',
      },
      {
        url: 'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/statuses/271ec5d14b429d26dec3b1cf209d59ad130bfa0e',
        avatar_url: 'https://avatars.githubusercontent.com/u/679338?v=4',
        id: 25345607910,
        node_id: 'SC_kwDOFVWNns8AAAAF5rdI5g',
        state: 'failure',
        description: 'build failed (ping @mrc0mmand for any questions)\n ',
        target_url:
          'https://jenkins-systemd.apps.ocp.cloud.ci.centos.org/job/rhel9-centos9/133/',
        context: 'CentOS CI (CentOS Stream 9)',
        created_at: '2023-09-29T18:43:11Z',
        updated_at: '2023-09-29T18:43:11Z',
      },
    ],
    sha: '271ec5d14b429d26dec3b1cf209d59ad130bfa0e',
    total_count: 2,
    repository: {
      id: 357928350,
      node_id: 'MDEwOlJlcG9zaXRvcnkzNTc5MjgzNTA=',
      name: 'systemd-rhel9',
      full_name: 'redhat-plumbers/systemd-rhel9',
      private: false,
      owner: {
        login: 'redhat-plumbers',
        id: 84723483,
        node_id: 'MDEyOk9yZ2FuaXphdGlvbjg0NzIzNDgz',
        avatar_url: 'https://avatars.githubusercontent.com/u/84723483?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/redhat-plumbers',
        html_url: 'https://github.com/redhat-plumbers',
        followers_url: 'https://api.github.com/users/redhat-plumbers/followers',
        following_url:
          'https://api.github.com/users/redhat-plumbers/following{/other_user}',
        gists_url:
          'https://api.github.com/users/redhat-plumbers/gists{/gist_id}',
        starred_url:
          'https://api.github.com/users/redhat-plumbers/starred{/owner}{/repo}',
        subscriptions_url:
          'https://api.github.com/users/redhat-plumbers/subscriptions',
        organizations_url: 'https://api.github.com/users/redhat-plumbers/orgs',
        repos_url: 'https://api.github.com/users/redhat-plumbers/repos',
        events_url:
          'https://api.github.com/users/redhat-plumbers/events{/privacy}',
        received_events_url:
          'https://api.github.com/users/redhat-plumbers/received_events',
        type: 'Organization',
        site_admin: false,
      },
      html_url: 'https://github.com/redhat-plumbers/systemd-rhel9',
      description: '9️ systemd source-git for RHEL9',
      fork: false,
      url: 'https://api.github.com/repos/redhat-plumbers/systemd-rhel9',
      forks_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/forks',
      keys_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/keys{/key_id}',
      collaborators_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/collaborators{/collaborator}',
      teams_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/teams',
      hooks_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/hooks',
      issue_events_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/issues/events{/number}',
      events_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/events',
      assignees_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/assignees{/user}',
      branches_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/branches{/branch}',
      tags_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/tags',
      blobs_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/git/blobs{/sha}',
      git_tags_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/git/tags{/sha}',
      git_refs_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/git/refs{/sha}',
      trees_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/git/trees{/sha}',
      statuses_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/statuses/{sha}',
      languages_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/languages',
      stargazers_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/stargazers',
      contributors_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/contributors',
      subscribers_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/subscribers',
      subscription_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/subscription',
      commits_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/commits{/sha}',
      git_commits_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/git/commits{/sha}',
      comments_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/comments{/number}',
      issue_comment_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/issues/comments{/number}',
      contents_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/contents/{+path}',
      compare_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/compare/{base}...{head}',
      merges_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/merges',
      archive_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/{archive_format}{/ref}',
      downloads_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/downloads',
      issues_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/issues{/number}',
      pulls_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/pulls{/number}',
      milestones_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/milestones{/number}',
      notifications_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/notifications{?since,all,participating}',
      labels_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/labels{/name}',
      releases_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/releases{/id}',
      deployments_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/deployments',
    },
    commit_url:
      'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/commits/271ec5d14b429d26dec3b1cf209d59ad130bfa0e',
    url: 'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/commits/271ec5d14b429d26dec3b1cf209d59ad130bfa0e/status',
  };

const statusAPIResponseFailedAndPendingRaw: Endpoints['GET /repos/{owner}/{repo}/commits/{ref}/status']['response']['data'] =
  {
    state: 'failure',
    statuses: [
      {
        url: 'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/statuses/271ec5d14b429d26dec3b1cf209d59ad130bfa0e',
        avatar_url: 'https://avatars.githubusercontent.com/u/679338?v=4',
        id: 25345406312,
        node_id: 'SC_kwDOFVWNns8AAAAF5rQ1aA',
        state: 'pending',
        description: 'build pending (ping @mrc0mmand for any questions)\n ',
        target_url:
          'https://jenkins-systemd.apps.ocp.cloud.ci.centos.org/job/rhel9-centos9-sanitizers/126/',
        context: 'CentOS CI (CentOS Stream 9 + sanitizers)',
        created_at: '2023-09-29T18:31:42Z',
        updated_at: '2023-09-29T18:31:42Z',
      },
      {
        url: 'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/statuses/271ec5d14b429d26dec3b1cf209d59ad130bfa0e',
        avatar_url: 'https://avatars.githubusercontent.com/u/679338?v=4',
        id: 25345607910,
        node_id: 'SC_kwDOFVWNns8AAAAF5rdI5g',
        state: 'failure',
        description: 'build failed (ping @mrc0mmand for any questions)\n ',
        target_url:
          'https://jenkins-systemd.apps.ocp.cloud.ci.centos.org/job/rhel9-centos9/133/',
        context: 'CentOS CI (CentOS Stream 9)',
        created_at: '2023-09-29T18:43:11Z',
        updated_at: '2023-09-29T18:43:11Z',
      },
    ],
    sha: '271ec5d14b429d26dec3b1cf209d59ad130bfa0e',
    total_count: 2,
    repository: {
      id: 357928350,
      node_id: 'MDEwOlJlcG9zaXRvcnkzNTc5MjgzNTA=',
      name: 'systemd-rhel9',
      full_name: 'redhat-plumbers/systemd-rhel9',
      private: false,
      owner: {
        login: 'redhat-plumbers',
        id: 84723483,
        node_id: 'MDEyOk9yZ2FuaXphdGlvbjg0NzIzNDgz',
        avatar_url: 'https://avatars.githubusercontent.com/u/84723483?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/redhat-plumbers',
        html_url: 'https://github.com/redhat-plumbers',
        followers_url: 'https://api.github.com/users/redhat-plumbers/followers',
        following_url:
          'https://api.github.com/users/redhat-plumbers/following{/other_user}',
        gists_url:
          'https://api.github.com/users/redhat-plumbers/gists{/gist_id}',
        starred_url:
          'https://api.github.com/users/redhat-plumbers/starred{/owner}{/repo}',
        subscriptions_url:
          'https://api.github.com/users/redhat-plumbers/subscriptions',
        organizations_url: 'https://api.github.com/users/redhat-plumbers/orgs',
        repos_url: 'https://api.github.com/users/redhat-plumbers/repos',
        events_url:
          'https://api.github.com/users/redhat-plumbers/events{/privacy}',
        received_events_url:
          'https://api.github.com/users/redhat-plumbers/received_events',
        type: 'Organization',
        site_admin: false,
      },
      html_url: 'https://github.com/redhat-plumbers/systemd-rhel9',
      description: '9️ systemd source-git for RHEL9',
      fork: false,
      url: 'https://api.github.com/repos/redhat-plumbers/systemd-rhel9',
      forks_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/forks',
      keys_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/keys{/key_id}',
      collaborators_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/collaborators{/collaborator}',
      teams_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/teams',
      hooks_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/hooks',
      issue_events_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/issues/events{/number}',
      events_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/events',
      assignees_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/assignees{/user}',
      branches_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/branches{/branch}',
      tags_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/tags',
      blobs_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/git/blobs{/sha}',
      git_tags_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/git/tags{/sha}',
      git_refs_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/git/refs{/sha}',
      trees_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/git/trees{/sha}',
      statuses_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/statuses/{sha}',
      languages_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/languages',
      stargazers_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/stargazers',
      contributors_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/contributors',
      subscribers_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/subscribers',
      subscription_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/subscription',
      commits_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/commits{/sha}',
      git_commits_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/git/commits{/sha}',
      comments_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/comments{/number}',
      issue_comment_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/issues/comments{/number}',
      contents_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/contents/{+path}',
      compare_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/compare/{base}...{head}',
      merges_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/merges',
      archive_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/{archive_format}{/ref}',
      downloads_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/downloads',
      issues_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/issues{/number}',
      pulls_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/pulls{/number}',
      milestones_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/milestones{/number}',
      notifications_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/notifications{?since,all,participating}',
      labels_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/labels{/name}',
      releases_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/releases{/id}',
      deployments_url:
        'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/deployments',
    },
    commit_url:
      'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/commits/271ec5d14b429d26dec3b1cf209d59ad130bfa0e',
    url: 'https://api.github.com/repos/redhat-plumbers/systemd-rhel9/commits/271ec5d14b429d26dec3b1cf209d59ad130bfa0e/status',
  };

// https://github.com/redhat-plumbers/systemd-rhel9/pull/203
// https://api.github.com/repos/redhat-plumbers/systemd-rhel9/commits/dbb57d34622b6ada191e0ffba12e75d5d34fd299/status
export const statusAPIResponseSuccess = statusSchema.parse(
  statusAPIResponseSuccessRaw
);

// https://github.com/redhat-plumbers/systemd-rhel9/pull/201
// https://api.github.com/repos/redhat-plumbers/systemd-rhel9/commits/271ec5d14b429d26dec3b1cf209d59ad130bfa0e/status
export const statusAPIResponseFailed = statusSchema.parse(
  statusAPIResponseFailedRaw
);

export const statusAPIResponseFailedAndPending = statusSchema.parse(
  statusAPIResponseFailedAndPendingRaw
);
