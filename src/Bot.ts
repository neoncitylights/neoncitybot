import { Client, GatewayIntentBits } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { Octokit } from 'octokit';
import { onReady } from './listeners/ready';
import { onInteractionCreate } from './listeners/interactionCreate';
import { BotClient, ConfigFileSchema } from '~/types';

const configFilePath: string = path.join(__dirname, './config.json');
if(!fs.existsSync(configFilePath)) {
	console.error(`${configFilePath} does not exist. Please create a config file.`);
	process.exit(1);
}

const configFile = JSON.parse(fs.readFileSync(configFilePath, 'utf-8')) as ConfigFileSchema;
const githubClient = new Octokit({
	auth: configFile.tokens.github,
	userAgent: configFile.github.userAgent,
	timeZone: configFile.github.timeZone,
});

const discordClient = new Client({
	intents: [
		GatewayIntentBits.Guilds
	],
});

const botClient: BotClient = {
	githubClient: githubClient,
	discordClient: discordClient,
};

onReady(botClient);
onInteractionCreate(botClient);
discordClient.login(configFile.tokens.discord);
