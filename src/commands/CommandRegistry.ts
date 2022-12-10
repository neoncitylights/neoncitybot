import { Command } from './Command';
import { ghIssue } from './ghIssue';
import { ghUser } from './ghUser';
import { rateLimit } from './rateLimit';

export const CommandRegistry: Command[] = [
	ghIssue,
	ghUser,
	rateLimit,
];
