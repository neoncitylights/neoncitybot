import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { BotClient } from 'Bot';
import { Command } from './Command';
import { components } from '@octokit/openapi-types';

export const rateLimit: Command = {
	data: new SlashCommandBuilder()
		.setName('ratelimit')
		.setDescription('Get Rate limit information for REST API clients')
		.addStringOption(option => option
			.setName('client')
			.setDescription('The REST API client to query for')
			.setRequired(true)
			.addChoices(
				{ name: 'GitHub', value: 'github' },
				{ name: 'Discord', value: 'discord' }
			)),

	run: async (client: BotClient, interaction: CommandInteraction) => {
		if(!interaction.isChatInputCommand()) return;

		const givenClient = interaction.options.getString('client') as 'github' | 'discord';
		const gh = client.githubClient;
		const ghRateLimit = await gh.rest.rateLimit.get();
		const ghRateLimitData = ghRateLimit.data;

		await interaction.reply({
			embeds: [
				formatRateLimit(ghRateLimitData.resources.core)
			]
		})
	}
};

const formatRateLimit = (rateLimit: components['schemas']['rate-limit']) => {
	const { limit, remaining, reset, used } = rateLimit;
	const embed = new EmbedBuilder()
		.setTitle(':stopwatch: Rate Limit')
		.setDescription(`You have ${remaining} of ${limit} requests remaining.`)
		.addFields(
			{ name: 'Limit', value: limit.toString() + " requests allowed per hour", inline: true },
			{ name: 'Used', value: used.toString() + " requests made", inline: true },
			{ name: 'Remaining', value: remaining.toString() + " requests remaining", inline: true },
			{ name: 'Reset', value: new Date(reset * 1000).toLocaleString(), inline: true },
		)
		.setFooter({
			text: 'GitHub API',
			iconURL: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
		})
	return embed;
}
