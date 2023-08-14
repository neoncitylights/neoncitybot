import { Command } from './Command';
import { ghCommit } from './ghCommit';
import { ghIssue } from './ghIssue';
import { ghUser } from './ghUser';
import { rateLimit } from './rateLimit';

export const CommandRegistry: Command[] = [
	ghCommit,
	ghIssue,
	ghUser,
	rateLimit,
];
