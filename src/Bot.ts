import { Client, GatewayIntentBits } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { Octokit } from 'octokit';
import { onReady } from './listeners/ready';
import { onInteractionCreate } from './listeners/interactionCreate';

const configFilePath: string = path.join(__dirname, './config.json');
if(!fs.existsSync(configFilePath)) {
	console.error(`${configFilePath} does not exist. Please create a config file.`);
	process.exit(1);
}

const configFile = JSON.parse(fs.readFileSync(configFilePath, 'utf-8'));
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
