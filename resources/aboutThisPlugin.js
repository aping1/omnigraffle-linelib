(() => {
	var action = new PlugIn.Action(function(selection,sender){
		var versNum = this.plugIn.version.versionString
		var pluginName = this.plugIn.displayName
		var pluginID = this.plugIn.identifier
		var pluginDescription = this.plugIn.description
		var pluginAuthor = this.plugIn.author
		var pluginLibraries = this.plugIn.libraries
		if (pluginLibraries.length != 0){
			libraryNames = []
			pluginLibraries.forEach(function(aLibrary){
				libraryName = aLibrary.name
				libraryVersion = aLibrary.version.versionString
				displayString = libraryName + ' v' + libraryVersion
				libraryNames.push(displayString)
			})
			libraryNamesString = "LIBRARIES:"
			libraryNamesString = libraryNamesString + '\n' + libraryNames.join('\n')
		} else {
			libraryNamesString = "This plugin has no libraries."
		}
		var pluginActions = this.plugIn.actions
		var actionTitles = new Array()
		pluginActions.forEach(action => {
			actionTitles.push(action.label)
		})
		actionTitles.sort()
		var actionNamesString = "ACTIONS:"
		actionNamesString = actionNamesString + '\n' + actionTitles.join('\n')
		alertTitle = pluginName + ' v' + versNum
		var companyURL = 'https://omni-automation.com'
		var documentationURL = 'https://omni-automation.com/plugins/docs/canvas-tools.html'
		var copyrightYear = new Date().getFullYear().toString()
		alertMessage = "©" + copyrightYear + " " + pluginAuthor + '\n'
		alertMessage = alertMessage + pluginID + '\n'
		alertMessage = alertMessage + companyURL + '\n' + '\n'
		alertMessage = alertMessage + pluginDescription + '\n' + '\n' 
		alertMessage = alertMessage + libraryNamesString + '\n' + '\n'
		alertMessage = alertMessage + actionNamesString
		var alert = new Alert(alertTitle, alertMessage)
		alert.addOption("OK")
		alert.addOption("Documentation")
		alert.show(function(result){
			if (result == 0){
				// do nothing
			} else {
				url = URL.fromString(documentationURL)
				url.call(function(result){})
			}
		})
	});

	// routine determines if menu item is enabled
	action.validate = function(selection){
		return true
	};

	return action;
})();