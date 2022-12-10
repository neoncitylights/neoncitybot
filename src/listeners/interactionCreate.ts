import { Client, CommandInteraction, Events } from 'discord.js';
import { CommandRegistry } from './../CommandRegistry';

export const onInteractionCreate = (client: Client): void => {
	client.on(Events.InteractionCreate, async (interaction) => {
		if (interaction.isCommand() || interaction.isContextMenuCommand()) {
			await handleSlashCommand(client, interaction);
		}
	});
};

const handleSlashCommand = async (client: Client, interaction: CommandInteraction): Promise<void> => {
	const slashCommand = CommandRegistry.find(c => c.data.name === interaction.commandName);
	if (!slashCommand) {
		interaction.followUp({ content: 'An error has occurred' });
		return;
	}

	slashCommand.run(interaction);
};
