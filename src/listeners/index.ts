import { BotClient } from 'Bot';

export type OnDiscordEvent = (client: BotClient) => void;
export * from './interactionCreate';
export * from './ready';
