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

type BotClient = {
	githubClient: Octokit;
	discordClient: Client;
}

const botClient: BotClient = {
	githubClient: githubClient,
	discordClient: discordClient,
};

onReady(discordClient);
onInteractionCreate(discordClient);
discordClient.login(configFile.discordToken);
