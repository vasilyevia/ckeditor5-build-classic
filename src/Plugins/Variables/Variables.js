/* global console */

import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import {
	createDropdown,
	addListToDropdown
} from "@ckeditor/ckeditor5-ui/src/dropdown/utils";
import Collection from "@ckeditor/ckeditor5-utils/src/collection";
import Model from "@ckeditor/ckeditor5-ui/src/model";

export default class Variables extends Plugin {
	init() {
		const editor = this.editor;

		editor.ui.componentFactory.add("variables", locale => {
			const dropdown = createDropdown(locale);

			dropdown.buttonView.set({
				label: "Available variables",
				withText: true
			});

			const items = new Collection();

			items.add({
				type: "button",
				model: new Model({
					withText: true,
					label: "First item",
					labelStyle: "color: red"
				})
			});

			items.add({
				type: "button",
				model: new Model({
					withText: true,
					label: "Second item",
					labelStyle: "color: green",
					class: "foo"
				})
			});

			addListToDropdown(dropdown, items);

			return dropdown;
		});

		console.log("Variables plugin was initialized");
	}
}
