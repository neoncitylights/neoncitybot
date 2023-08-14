import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { Command } from './Command';
import { BotClient } from './../types';
import { formatNumber } from './../utils';

const OptionUsername = 'username';

export const ghUser: Command = {
	data: new SlashCommandBuilder()
		.setName('ghuser')
		.setDescription('Get information about a GitHub user')
		.addStringOption(option => option
			.setName(OptionUsername)
			.setDescription('The GitHub username to get information about')
			.setRequired(true)),

	run: async (client: BotClient, interaction: CommandInteraction) => {
		if(!interaction.isChatInputCommand()) return;

		const username = interaction.options.getString(OptionUsername) as string;
		const gh = client.githubClient;
		const ghUser = await gh.rest.users.getByUsername({username: username as string});

		const embed = new EmbedBuilder()
			.setTitle(`${ghUser.data.name} (${ghUser.data.login})`)
			.setDescription(ghUser.data.bio ?? '')
			.setURL(ghUser.data.html_url)
			.setThumbnail(ghUser.data.avatar_url)
			.setFields([
				{ name: 'Followers', value: formatNumber(ghUser.data.followers), inline: true },
				{ name: 'Following', value: formatNumber(ghUser.data.following), inline: true },
			]);

		await interaction.reply({
			embeds: [embed],
		});
	}
};
