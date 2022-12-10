import { ApplicationCommandDataResolvable, Client, Events } from 'discord.js';
import { CommandRegistry } from './../CommandRegistry';

export const onReady = (client: Client): void => {
	client.once(Events.ClientReady, async () => {
		if (!client.user || !client.application) {
			return;
		}

		const commandJson: ApplicationCommandDataResolvable[] = [];
		CommandRegistry.forEach((command) => {
			commandJson.push(command.data.toJSON());
		});

		await client.application.commands.set(commandJson);
		console.log(`${client.user.username} (${client.user.tag}) is online`);
	});
};
