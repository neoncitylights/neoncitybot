import { BotClient } from '~/types';
import { CommandInteraction, Events, InteractionResponse } from 'discord.js';
import { OnDiscordEvent } from '~/listeners';
import { CommandRegistry } from '~/commands/CommandRegistry';

export const onInteractionCreate: OnDiscordEvent = (client: BotClient): void => {
	const discordClient = client.discordClient;
	discordClient.on(Events.InteractionCreate, async (interaction) => {
		if (
			interaction.isCommand()
			|| interaction.isContextMenuCommand()
			|| interaction.isChatInputCommand()
		) {
			await handleSlashCommand(client, interaction);
		}
	});
};

const handleSlashCommand = async (client: BotClient, interaction: CommandInteraction) =>
{
	const slashCommand = CommandRegistry.find(c => c.data.name === interaction.commandName);
	if (!slashCommand) {
		await interaction.reply({
			content: `The slash command ${interaction.commandName} could not be found.`,
			ephemeral: true });
		return;
	}

	try {
		await slashCommand.run(client, interaction);
	} catch (error) {
		console.error(error);
	}
};
