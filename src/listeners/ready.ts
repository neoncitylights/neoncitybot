import { ApplicationCommandDataResolvable, Events } from 'discord.js';
import { CommandRegistry } from './../commands/CommandRegistry';
import { OnDiscordEvent } from './../listeners';
import { BotClient } from './../types';

export const onReady: OnDiscordEvent = (client: BotClient): void => {
	const discordClient = client.discordClient;
	client.discordClient.once(Events.ClientReady, async () => {
		if (!discordClient.user || !discordClient.application) {
			return;
		}

		const commandJson: ApplicationCommandDataResolvable[] = [];
		CommandRegistry.forEach((command) => {
			commandJson.push(command.data.toJSON());
		});

		await discordClient.application.commands.set(commandJson);
		console.log(`${discordClient.user.username} (${discordClient.user.tag}) is online`);
	});
};
