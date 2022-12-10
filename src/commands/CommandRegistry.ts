import { Command } from './Command';
import { ghIssue } from './ghIssue';
import { ghUser } from './ghUser';

export const CommandRegistry: Command[] = [
	ghIssue,
	ghUser
];
