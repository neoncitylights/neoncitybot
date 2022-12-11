import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { BotClient } from '~/types';
import { Command } from './Command';
import { components } from '@octokit/openapi-types';

export const rateLimit: Command = {
	data: new SlashCommandBuilder()
		.setName('ratelimit')
		.setDescription('Get rate limit information for the GitHub API endpoints'),

	run: async (client: BotClient, interaction: CommandInteraction) => {
		if(!interaction.isChatInputCommand()) return;

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
		.setTitle(':stopwatch: GitHub Rate Limit')
		.setDescription(`You have ${remaining} of ${limit} requests remaining.`)
		.setThumbnail('https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png')
		.addFields(
			{ name: 'Limit', value: limit.toString() + " requests allowed per hour", inline: true },
			{ name: 'Used', value: used.toString() + " requests made", inline: true },
			{ name: 'Remaining', value: remaining.toString() + " requests remaining", inline: true },
		)
		.setFooter({
			text: `Resets at ${new Date(reset * 1000).toLocaleString()}.`,
		})
	return embed;
}
