(() => {
	// "identifier": "com.omni-automation.libraries.LineLib",
	var action = new PlugIn.Action(function(selection, sender) {
		function loadLibrary(plugInID,libraryName){
			try {
				plugInIDs = PlugIn.all.map(function(plugin){return plugin.identifier})
				if (plugInIDs.includes(plugInID)){
					plugIn = PlugIn.find(plugInID) 
				} else {throw new Error("PlugIn " + plugInID.toString() + " not installed in " +libraryName)}
				libraryNames = plugIn.libraries.map(function(library){return library.name})
				if (libraryNames.includes(libraryName)){
					return plugIn.library(libraryName)
				} else {throw new Error("PlugIn " + plugInID.toString() + " not found")}
			} catch(err){
				errTitle = "MISSING RESOURCE"
				alert = new Alert(errTitle,err.message).show(function(result){})
				throw err.message
			}
		}
		var lineLib=loadLibrary("com.apt-miss.fill-tools","LineLib")
	    var canvases=null
		if (typeof selection == 'undefined'){
			selection = document.windows[0].selection
		}
		if (typeof selection.canvases == 'undefined'){
			canvases=[document.windows[0].selection.canvas]}
		else {
			canvases=selection.canvases
		}

		if (typeof selection.graphics == 'undefined') {
			return
		}
		var lrects=selection.graphics
		canvases.forEach(function(canvas){
			for(lc=0; lc<lrects.length; lc++){
				var linerect = lrects[lc];
				lineLib.fillRect(canvas, linerect);
			}
		});
	});

	action.validate = function(selection, sender){
		// validation code
		// selection options: canvas, document, graphics, lines, solids, view
		return true
	};
	
	return action;
})();	

	 
function displayErrorMessage(errorString){
 new Alert('ERROR', errorString).show(function(result){})
	 throw new Error(errorString)
	}
