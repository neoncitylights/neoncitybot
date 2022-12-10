import { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods';
import { snakeCaseToTitleCase } from './strings';

/**
 * Formats the issue status into a more human-readable format.
 * Examples of the output:
 *  - `○` Open
 *  - `◌` Open (Draft)
 *  - `●` Closed
 *  - `●` Closed (Completed)
 *  - `⨂` Closed (Not Planned)
 */
export const getIssueStatus = (issue: RestEndpointMethodTypes['issues']['get']['response']): string => {
	const state = issue.data.state as 'open' | 'closed';
	const OpenCircle = '\u{25CB}';
	const DottedCircle = '\u{25CC}';
	const FilledCirlce = '\u{25A0}';

	switch(state) {
	case 'open':
		return !issue.data.draft
			? `\`${OpenCircle}\` Open`
			: `\`${DottedCircle}\` Open (Draft)`;

	case 'closed':
		return `\`${FilledCirlce}\` Closed${issue.data.state_reason
			? ' ' + snakeCaseToTitleCase(issue.data.state_reason)
			: ''}`;
	}
}

export const getLabels = (issue: RestEndpointMethodTypes['issues']['get']['response']): string => {
	return issue.data.labels?.map(label => {
		if(typeof label !== 'string') {
			return `\`${label.name}\``;
		}
	}).join(', ') ?? 'None';
}
