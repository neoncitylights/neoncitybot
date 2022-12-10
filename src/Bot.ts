import { Client, GatewayIntentBits } from 'discord.js';
import { Octokit } from 'octokit';
import { onReady } from './listeners/ready';
import { onInteractionCreate } from './listeners/interactionCreate';
import configFile from './config.json';

const githubClient = new Octokit({ auth: configFile.githubToken });
const discordClient = new Client({
	intents: [
		GatewayIntentBits.Guilds
	]
});

export type BotClient = {
	githubClient: Octokit;
	discordClient: Client;
}

const botClient: BotClient = {
	githubClient: githubClient,
	discordClient: discordClient,
};

onReady(botClient);
onInteractionCreate(botClient);
discordClient.login(configFile.discordToken);
