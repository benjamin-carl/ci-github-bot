'use strict';

/**
 /**
 * ci-gitHub-bot
 *
 * Github communication bot for CI/CD workflows.
 *
 * Simplified abstraction on Github's PR/Review-Comment API.
 * Supports templates for comments based on PUG template engine.
 *
 * MIT License
 *
 * @copyright 2017 clickalicious, Benjamin Carl
 */

// Imports
const path = require('path');
const dotenv = require('dotenv');
const { CiGithubBot } = require('./../lib/ci-github-bot');
const { ConfigurationComment } = require('./../lib/configuration/comment');
const { ConfigurationGithub } = require('./../lib/configuration/github');

// Current directory
const applicationDirectory = path.dirname(require.main.filename);

// Simulate CI Env
dotenv.config({
  path: applicationDirectory + '/.env.ci',
});

// Create a Github configuration
const configurationGithub = new ConfigurationGithub(
  process.env.CI_GITHUB_BOT_USERNAME,
  process.env.CI_GITHUB_BOT_TOKEN
);

// Load configuration from PR URL
configurationGithub.loadFromPullRequestUrl(process.env.CI_GITHUB_PR_URL);

// Create a bot instance
const ciGithubBot = new CiGithubBot(configurationGithub);

// Publish comment
ciGithubBot.createComment(
  new ConfigurationComment(
    process.env.CI_TEMPLATES.split('|'),
    {
      stageUrl: process.env.CI_STAGE_LINK_URL,
      stageText: process.env.CI_STAGE_LINK_TEXT
    }
  )
);

