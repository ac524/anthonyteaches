export const selectWinner = (user1: string, user2: string) => {
	let result = null;

	switch (user1 + user2) {
		case 'rockscissors':
		case 'scissorspaper':
		case 'paperrock':
			result = 'user1';
			break;
		case 'scissorsrock':
		case 'paperscissors':
		case 'rockpaper':
			result = 'user2';
			break;
		case 'paperpaper':
		case 'scissorsscissors':
		case 'rockrock':
			result = 'tie';
			break;
	}
	return result;
};
