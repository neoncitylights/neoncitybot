import { Client } from 'discord.js';
import { Octokit } from 'octokit';

export type BotClient = {
	githubClient: Octokit;
	discordClient: Client;
}

export type ConfigFileSchema = {
	tokens: {
		github: string;
		discord: string;
	},
	github: {
		userAgent: string;
		timeZone: string;
	}
}
