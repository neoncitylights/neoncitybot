import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { BotClient } from '~/types';
import { Command } from './Command';
import { truncateString, getIssueStatus, getLabels } from 'utils';

export const ghIssue: Command = {
	data: new SlashCommandBuilder()
		.setName('ghissue')
		.setDescription('Get information about a GitHub issue')
		.addStringOption(option => option
			.setName('repository')
			.setDescription('The owner and repository name')
			.setRequired(true))
		.addIntegerOption(option => option
			.setName('number')
			.setDescription('The issue number')
			.setRequired(true)),

	run: async (client: BotClient, interaction: CommandInteraction) => {
		if(!interaction.isChatInputCommand()) return;

		const ownerRepo = interaction.options.getString('repository') as string;
		const issueNumber = interaction.options.getInteger('number') as number;

		const gh = client.githubClient;
		const [owner, repo] = ownerRepo.split('/');
		const ghIssue = await gh.rest.issues.get({issue_number: issueNumber, owner: owner, repo: repo});

		if (ghIssue.status === 200) {
			const embedTitle = `[${ownerRepo}] #${ghIssue.data.number}: ${ghIssue.data.title}`;
			const regexHtmlComments = /(\<!--.*?\-->)/g;
			const cleanedBody = ghIssue.data.body?.replace(regexHtmlComments, '') ?? '';

			const embed = new EmbedBuilder()
				.setTitle(embedTitle)
				.setURL(ghIssue.data.html_url)
				.setDescription(truncateString(cleanedBody, 512))
				.setThumbnail(ghIssue.data.repository?.owner?.avatar_url as string)
				.setAuthor({
					name: ghIssue.data.user?.login as string,
					iconURL: ghIssue.data.user?.avatar_url as string,
					url: ghIssue.data.user?.html_url as string,
				})
				.setFields([
					{
						name: 'Assignee',
						value: ghIssue.data.assignee?.login ?? 'None',
						inline: true
					},
					{
						name: 'State',
						value: getIssueStatus(ghIssue),
						inline: true
					},
					{
						name: 'Labels',
						value: getLabels(ghIssue),
						inline: true},
				])
			
			await interaction.reply({
				embeds: [embed],
			})
		}
	},
};
