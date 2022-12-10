import { BotClient } from 'Bot';
import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

export interface Command {
	data: SlashCommandBuilder;
	run: (client: BotClient, interaction: CommandInteraction) => Promise<void>;
}
