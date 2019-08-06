import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Collection from '@ckeditor/ckeditor5-utils/src/collection';
import Model from '@ckeditor/ckeditor5-ui/src/model';
import {
	createDropdown,
	addListToDropdown
} from '@ckeditor/ckeditor5-ui/src/dropdown/utils';

export default class Variables extends Plugin {
	init() {
		const editor = this.editor;

		const variables = editor.config.get( 'variables' );

		editor.ui.componentFactory.add( 'variables', locale => {
			const dropdown = createDropdown( locale );

			dropdown.buttonView.set( {
				label: 'Variables',
				withText: true
			} );

			if ( !Array.isArray( variables ) || variables.length < 1 ) {
				// hide dropdown

				dropdown.buttonView.isVisible = false;
			} else {
				// populate dropdown

				const items = new Collection();

				for ( const i in variables ) {
					const variable = variables[ i ];

					items.add( {
						type: 'button',
						model: new Model( {
							withText: true,
							label: variable.text,
							code: variable.code
						} )
					} );
				}

				addListToDropdown( dropdown, items );

				dropdown.on( 'execute', evtInfo => {
					const button = evtInfo.source;
					const code = button.code;
					const cursorPosition = editor.model.document.selection.getFirstPosition();

					editor.model.change( writer => {
						writer.insertText( code, cursorPosition );
					} );
				} );
			}

			return dropdown;
		} );
	}
}
