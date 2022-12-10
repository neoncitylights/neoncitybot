import { Command } from './Command';
import { ghIssue } from './commands/ghIssue';

export const CommandRegistry: Command[] = [
	ghIssue,
];
