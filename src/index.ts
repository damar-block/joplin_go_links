import joplin from 'api';

joplin.plugins.register({
	onStart: async function() {
		console.info('Hello world. JoplinGoLinks plugin started!');
		function updateBody(noteBody) {
			const regex = /([\n\s])go\/(\w+)/ig;
			return noteBody.replaceAll(regex, '$1[go/$2](https://go.sqprod.co/$2)');
		}

		async function updateGoLinks() {
			console.info('updateGoLinks called');
			const note = await joplin.workspace.selectedNote();
			if (note) {
				console.info('note changed', note);
				var noteBody = note.body;
				const newBody = updateBody(noteBody);
				if (noteBody != newBody) {
					await joplin.data.put(['notes', note.id], null, { body: newBody });
					console.info('note updated');
				}
			}
		}

		await joplin.workspace.onNoteChange(() => {
			updateGoLinks();
		});
	},
});
