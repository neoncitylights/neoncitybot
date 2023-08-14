import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { BotClient } from './../types';
import { getCommitDiffStats } from './../utils';
import { Command } from './Command';

const OptionRepo = 'repository';
const OptionSha = 'sha';

export const ghCommit: Command = {
	data: new SlashCommandBuilder()
		.setName('ghcommit')
		.setDescription('Get information about a GitHub commit')
		.addStringOption(option => option
			.setName(OptionRepo)
			.setDescription('The repository to get the commit from')
			.setRequired(true))
		.addStringOption(option => option
			.setName(OptionSha)
			.setDescription('The unique commit identifier')
			.setRequired(true)),

	run: async (client: BotClient, interaction: CommandInteraction) => {
		if(!interaction.isChatInputCommand()) return;

		const ownerRepo = interaction.options.getString(OptionRepo) as string;
		const shaValue = interaction.options.getString(OptionSha) as string;
		const [owner, repo] = ownerRepo.split('/');

		const gh = client.githubClient;
		const ghCommit = await gh.rest.repos.getCommit({
			owner: owner,
			repo: repo,
			ref: shaValue});

		const ghCommitData = ghCommit.data;

		const ghRepo = await gh.rest.repos.get({owner: owner, repo: repo});
		const embed = new EmbedBuilder()
			.setTitle(`Commit ${ghCommitData.sha}`)
			.setURL(ghCommitData.html_url)
			.setAuthor({
				name: ghCommitData.commit.author?.name as string,
				iconURL: ghCommitData.author?.avatar_url as string,
				url: ghCommitData.author?.html_url as string,
			})
			.setTimestamp(new Date(ghCommitData.commit.author?.date as string))
			.setThumbnail(ghRepo.data.owner.avatar_url)
			.setDescription(ghCommitData.commit.message)
			.setFields(
				{
					name: 'Diff',
					value: getCommitDiffStats(ghCommitData.stats),
				}
			)

		await interaction.reply({
			embeds: [embed]
		});
	}
};
