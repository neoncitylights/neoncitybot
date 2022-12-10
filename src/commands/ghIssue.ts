import { Command } from './../Command';
import { ApplicationCommandType, Client, CommandInteraction, SlashCommandBuilder } from 'discord.js';

export const ghIssue: Command = {
	data: new SlashCommandBuilder()
		.setName('ghissue')
		.setDescription('Get information about a GitHub issue'),
	run: async (interaction: CommandInteraction) => {
		await interaction.reply({
			content: 'This is the ghIssue command',
		});
	},
};
