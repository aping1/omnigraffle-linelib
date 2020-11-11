/*{
  "type": "library",
  "targets": ["omnigraffle"],
  "identifier": "com.omni-automation.libraries.LineLib",
  "version": "1.2"
  }*/
(() => {
 /* function to dump objects to console.log */
 function mydump(arr,level) { var dumped_text=""; if(!level) level = 0; var level_padding = ""; for(var j=0;j<level+1;j++) level_padding += "    ";
 if(typeof(arr) == 'object') { for(var item in arr) { var value = arr[item]; if(typeof(value) == 'object') { dumped_text += level_padding + "'" + item + "' ...\n";
 dumped_text += mydump(value,level+1); } else { dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n"; } }
 } else { dumped_text = "===>"+arr+"<===("+typeof(arr)+")"; } return dumped_text;
 }

 Array.prototype.rotate = (function() {
         /* rotate is used to cycle through arrays */
         return function (reverse){
            if(reverse) { this.unshift(this.pop()); } else { this.push(this.shift());} return this;
         }
         })();
 var LineLib = new PlugIn.Library(new Version("1.3"));
 LineLib.solidsProps=new Map();
 LineLib.getLibraryFunctions = function() {
 var functionTitles = ["getLibraryFunctions()","lineProps(solid)","fillRect(cnvs, solid)", "reg_property(solid, metaName, propName, constructor, a_default)"];
 var methods = Object.getOwnPropertyNames(this);
 console.log(methods);
 return "###### LineLib Functions #####\n\t--> " + functionTitles.join("\n\t--> ");
 }
 LineLib.canvas_scale = function(cnvs, cnvspageSizeInchesWide=9.25, cnvspageSizeInchesHigh=7.75) {
    var pageSizeInches =  { height: cnvspageSizeInchesHigh, width: cnvspageSizeInchesWide}
     var s_height = pageSizeInches["height"] / cnvs.pageSize.height;
     var s_width = pageSizeInches["width"] / cnvs.pageSize.width;
     if (cnvs.canvasSizeIsMeasuredInPage){
         s_height=cnvs.rect.height/ cnvs.verticalPage;
         s_width=cnvs.rect.width / cnvs.horizontalPage;
     }
     return ({height: s_height, width: s_width})
 };
 LineLib.reg_property = function(solid, metaName, propName=null, constructor=String, a_default=null) {
     /* this function will register a property to a solid's registry that is a native javscript map
        you can describe a function that will be given the prop and placed in the map in the key propName
        if propNmae isnt provided then to metaName,` */
     try{
            /* start by creating a map for the solid or getting one that currently exists */
            var solidsProps = this.solidsProps.get(solid);
            if (solidsProps == undefined ){
                solidsProps =new Map();
                /* we use the solid as the key */
                this.solidsProps.set(solid, solidsProps)
            }
            /* metaName is the name in the object's metadata, 
                propName is what it will be calls in the properties map */
            if (!metaName) { return; }
            propName = propName ? propName : metaName;
            /* use these flags to treate the "constructor" argument as it was intedented. */
            var factory_is_type = typeof(constructor) != "undefined" && typeof(constructor) != "function" && constructor.prototype && constructor.prototype instanceof Object;
            var factory_is_function = typeof(constructor) != "undefined" && typeof(constructor) == "function";

            var setit = function(prop){
                /* this closure sets the property object in the registry map
                    the magic that calls that the factory constructor, or creates a new object is in here
                    and it's pretty verbose becasue it's pretty fundamental and a pain debug*/
                var setnew = function(newobj){ 
                    console.log(`${propName} -> ${typeof(newobj)} ${newobj == null ? "!" : (typeof(newobj) == typeof([]) ? mydump(newobj) : newobj)}`); 
                    if(typeof(newobj) != 'undefined') {
                        if (!solidsProps.has(propName)) {
                            solidsProps.set(propName, newobj);
                            console.log(`Set prop ${propName} -> ${typeof(solidsProps.get(propName))}`)
                        } else if (solidsProps.get(propName) != newobj) {
                            console.log(`overwriting value ${propName}: ${mydump(solidsProps.get(propName))}`);
                            solidsProps.set(propName, newobj); 
                        } else {
                            console.log(`Wont set prop ${propName} -> ${newobj == null ? "!" : (typeof(newobj) == typeof([]) ? mydump(newobj) : newobj)}`); 
                        }
                    } else {
                        console.warn(`Setting ${propName} ${mydump(prop)}-> undefined ${newobj} from constructor ${constructor})`); 
                    } // end typeof(newobj) != undefined
                }
                if (solidsProps.has(propName) && (typeof(prop) == 'undefined' || prop == null)) {
                    console.log(`Deleting prop ${propName}: no prop was given`)
                    solidsProps.delete(propName);
                }  else if (typeof(prop) != 'undefined') {
                    if (factory_is_type){ 
                        try{ 
                            console.log(`Calling constructor as Type "${constructor}" "${constructor.prototype}" for prop ${mydump(prop)}`);
                            setnew(new constructor(prop));
                        } catch(e) { 
                            console.warn(`Failed setting prop ${propName} w/type ${mydump(constructor)}`, e); 
                        }
                    } else if(factory_is_function) {
                        try{
                            console.log(`Calling constructor function for prop ${mydump(prop)}: ${constructor}}`);
                            setnew(constructor(prop, solidsProps));
                        } catch(e) {
                            console.warn(`Failed setting prop ${propName} ${mydump(prop)} w/function ${constructor} registration ${e.message}`, e);
                        }
                    } else {
                        /*  prop exists but there is no new prop*/
                        console.log(`setting prop ${propName} to direct value ${mydump(prop)}`); 
                        setnew(prop);
                    } // end if(factory_is_type)
                } // end solidsProps.has(propName) && typeof(prop) == 'undefined'

                return solidsProps;
     }
        var solid_prop=solid.userData[metaName];
        /* check that the prop from the solid is defined, parse/set it  */ 
        if (typeof(solid_prop) != "undefined") {
            try {
                console.log(`Register property ${metaName} as ${propName} from user value: ${mydump(solid_prop)}`);
                setit(solid_prop);
                return(solidsProps);
            } catch(e) {
                /* still try to supply the default if failed to use the provied property from the solid */
                console.warn(`Failed Attempt to use default_value from supplied ${a_default != null && a_default.prototype && a_default.prototype instanceof Object ? "type: " + typeof(a_default) : (typeof(a_default) == "function" ? a_default : mydump(a_default))}`);
            }
        }
        /*  parse/set the default if it's provided */ 
        try{
            var default_value=a_default;
            /* use provided default if it is a type of a function*/
            if (default_value == null) {
                console.log(`${propName} has no default prop or default supplied`);
                return solidsProps
            } else if(a_default.prototype && a_default.prototype instanceof Object ) {
                default_value=new a_default(solidsProps);
            } else if (typeof(a_default) == "function") {
                default_value=a_default(solidsProps);
            }
            console.log(`Register property ${metaName} as ${propName} from default object Value : ${typeof(default_value)} ${mydump(default_value)}`);
            setit(default_value);
            return solidsProps;
        } catch(e) { 
            console.warn(`Failed Attempt to use default_value from supplied ${a_default && a_default.prototype && a_default.prototype instanceof Object ? "type: " + typeof(a_default) : (typeof(a_default) == "function" ? a_default : mydump(a_default))}`);
        }
     } catch(e) {
     console.warn(`Failed Defining registration ${e.message}`, e);
 }
}
LineLib.lineProps = function(solid) {
    function an_array(func) { 
        // return a function that will  be applied to each solid_prop that in a json list 
        return function (solid_prop, solidsProps) {
            try{
                if(typeof(solid_prop) != "undefined" && solid_prop) {
                    var ts=JSON.parse(solid_prop)
                        if(ts && func && func.prototype && func.prototype instanceof Object) {
                            return [].concat(ts.map((l) => { if(l=='...') {return new String("...")}{return new func(l)}}));
                        } else if(ts && func && typeof(func) == "function") {
                            return [].concat(ts.map((l) => { return func(l, solidsProps)})); 
                        } else if (typeof(ts) == typeof([])) {
                            return [].concat(ts)
                        }
                } else { console.error("solid_prop undefined")}
            } catch (e){
                console.warn(`parse map failed ${typeof(solid_prop)}: ${solid_prop}: ${e.message}`)
            }
        };
    }
    function parseObject(obj, baseClassName , nullvalue, defValue){
        /* retruns a null value if the obj fits some criteria */
        if((typeof(nullvalue) != "undefined") && (
                    (typeof(nullvalue) == typeof([]) && nullvalue.some((n) => { return(n == baseClassName);})) ||
                    (typeof(nullvalue) == typeof(obj) && obj == nullvalue)
                    )) { console.log(`nullable found "${obj}" is in ${mydump(nullvalue)}`); return(null); }
            /* log the text that will be parsed:
            console.log(`{"obj": ${baseClassName}.${obj != undefined && !!obj ? obj : defValue}}`)*/
            if(typeof(defValue) == "undefined"){
                defValue=null;
            }
        console.log(`"calling ({newobj: ${baseClassName}.${typeof(obj) != "undefined" ? obj : defValue}})`);
        return(Function(`"use strict"; return({newobj: ${baseClassName}.${typeof(obj) != "undefined" ? obj : defValue}});`)().newobj);
    }
    function parseColor(obj) {
        // Evals a Color as text, if the input is "", short curcuit
        var color = parseObject(obj.toLowerCase(obj), "Color", "");
        //console.log(`Color is RGB(${color.red},${color.green},${color.blue},${colora.alpha})`)
        return color;
    }
    function parseStroke(obj) {
        // Evals a StrokeDash as text
        return parseObject(obj, "StrokeDash")
    }
    function parseDecimal(obj) {
        if (typeof(obj) != "undefined") {
            return (obj == '...' ? new String('...'): new Number(obj));
        }
    }
    // Register properties
    // pass the solid (for metadata), the name of the property, and the neame youwant to regiset it as
    // optional pass a constructor function; constructor functions take (theValue, current_registration_map)
    //          you can also pass a type (anything with a this.prototype) which will be called with  theValue
    // optionally pass a default that can be a function that will be called with the current map
    var solidsProps = this.reg_property(solid, "line_height_offsets", "height_offsets", an_array(parseDecimal));
    /* a majorSpaing  */
    this.reg_property(solid, "majorSpacing", "majorSpacing", Number);
    /* line_height_offsets: List of numbers that will apply a offset to an individual line */
    /* vertical_offsets: List of numbers that will apply a offset to a vertical line as it cycles*/
    this.reg_property(solid, "vertical_offsets", "vertical_offsets", an_array(parseDecimal));
    /* "margin" margin/vertical_margin is the number of line spacings before startingn horizontal lines*/
    this.reg_property(solid, "margin", "margin_height", Number);
    this.reg_property(solid, "vertical_margin", "vertical_margin", Number);

    /* line_color is the color of the linem if this is set to "" it will use the original object's color*/
    this.reg_property(solid, "line_color", "line_color", parseColor);
    this.reg_property(solid, "vertical_color", "vertical_color", parseColor);

    /* load in spacing settins manullay. 
       spacing := (canvas:majorGrid / steps) 
       spacing will equal the default canvas:spacing grid size if no values provided
       linewidth = spacing / pitch 
    */
    this.reg_property(solid, "pitch", "pitch", Number);
    this.reg_property(solid, "steps", "steps", Number);
    this.reg_property(solid, "spacing", "spacing", (p, solidsProps) => {
            if (!solidsProps.has("pitch")) { solidsProps.set("pitch", 1) }
            return parseDecimal(p)
            });

    /*  this is a json array of stroke name.
        the name should be valid stroke type and valid in console as "StroeDash."*/
    this.reg_property(solid, "vertical_line_types", "vertical_types", an_array(parseStroke));
    this.reg_property(solid, "line_types", "types", an_array(parseStroke));
    /* this is a json array of sizes that will be set to each line in a rotation */
    this.reg_property(solid, "line_sizes", "sizes", an_array(parseDecimal));
    this.reg_property(solid, "vertical_sizes", "vertical_sizes", an_array(parseDecimal));
    /* Lock the old object after creating the line generation */
    this.reg_property(solid, "lock", "lock", Boolean);
    return solidsProps;
}
LineLib.fillRect = function(cnvs, solid) {
    var t=0, p=0, l=0;
    /* group containers for vertical and horizontal lines */
    var lgroup=new Array(), rgroup=new Array();
    var rect = solid.geometry;
    /* Create a new layer */
    var layer = cnvs.newLayer();
    /* placeholder graphic on this layer to place */
    layer.name = "Lines " + solid.name;
    var s = layer.addShape("Rectangle", rect);
    s.fillColor = Color.clear;
    s.strokeColor = solid.strokeColor != Color.clear ? solid.strokeColor : Color.black;
    s.strokeType = null;
    s.userData = solid.userData;
    s.shadowColor = null;
    solid.locked = false;
    solid.textSize = 12;
    solid.text = ( solid.text == solid.name || solid.text === "") ? solid.name + "\n(<%x%>, <%y%>)\n(<%height%> x <%width%> )\nparent(" + solid.id + ")" : solid.text;
    solid.textColor = Color.lightGray;

    /* get solid properties  */
    var props = this.lineProps(solid);
    /* debug print all the key, values */
    for (let [key, value] of props.entries()) { console.log(`${key} ${typeof(value) != 'undefined' ? mydump(value) : ""}`)}
    /* Locks the original object if poperty "lock" will be set to the evalulation of Boolean(x) where x is the solid metadata for "lock"
        see function LineLib.lineProps() for more detaionls
    */
    var lock = props.get("lock") || false;
    /* Caclulate spacing for lines using "spacing" "majorSpacing" "steps" "pitch" of a solid 
    if nothing is set then the evaluation will use the canvas's settings to get a grid with the same pitch
    as the native line grid
        MajorSpacing: can be overriden with the propety "majorSpacing" but this is truely only supoorted so 
                the created solids could recreate themselves independed of current canvas setting
        Steps: number of steps to fit in the same height as the MajorSpacing or canvase's majorSpacing
        Spacing: the space between lines which should be = canvas.grid.spacing unless you changed any of the aboe
        line_spacing: is the final  calculated value for all this. it will be set to "+line_Spacing" in the placeholder 
        sold it creates, NOTE: it's set with a proceeding + because this will not be used to create solids, just for scaling margins
        x_end, y_end: are the sentery for the line creation, 
            NOTE:currently draws inside the solid rect with no regard for canvas size
    */
    var x_end = rect.y + rect.height;
    var y_end = rect.x + rect.width;
    var steps = props.has("steps") ? props.get("steps") : cnvs.grid.majorSpacing;
    var spacing = props.has("spacing") ? props.get("spacing") : cnvs.grid.spacing.toFixed(3);
    s.setUserData("majorSpacing", cnvs.grid.majorSpacing.toString());
    var line_spacing = spacing * (props.get("majorSpacing") || cnvs.grid.majorSpacing) / steps;
    if (props.has("pitch") && props.get("pitch")) {
        var pitch = props.get("pitch");
        line_spacing  = line_spacing / pitch;
        s.setUserData("pitch", pitch.toFixed(3));
    }
    s.setUserData("spacing", spacing.toString());
    s.setUserData("steps", steps.toString());
    s.setUserData("+line_spacing", line_spacing.toString());
    /* Space per grid */
    var lineTypes = props.get("types") || new Array();
    var sizes = props.get("sizes") || new Array();
    var distances = props.get("height_offsets") || new Array();
    var starty = rect.y 
    /* we'll reuse these but fill them with initial values */
    /* NOTE: if the field exists & is empty, there is logic to inherit the line solid's line color */
    var hColor = props.has("line_color") ? ( props.get("line_color") == null ? (solid.strokeColor != Color.clear ? solid.strokeColor : Color.black) : props.get("line_color") ) : Color.black;
    var vColor = props.has("vertical_color") ? ( props.get("vertical_color") == null ? (solid.strokeColor != Color.clear ? solid.strokeColor : Color.Black) : hColor ) : Color.black;
    var skip_horizontal= false;
    //! ["vertical_offsets", "vertical_types", "vertical_sizes"].some((x) => {return(typeof(props.get(x)) == typeof([]) && ! (props.get(x).length == 1 && !props.get(x)[0]) )});
    
    /* This is the rect that we wull use to change the line's layers */
    if (props.has("vertical_offsets") || props.has("vertical_margin") || props.has('vertical_sizes')) {
        var vSizes = props.get("vertical_sizes") || new Array();
        var vdistances = props.get("vertical_offsets") || new Array();
        var vlineTypes = props.get("vertical_types") || new Array();
        // edge case handling if any array is just '...' and nothing else
        [vSizes, vdistances, vlineTypes, sizes, lineTypes, distances].map(function(x) {
            if (x.length == 1 && x[0] == '...' ){
                x.pop() // simply remove the element so it will act like a zero length array
            }
        });
        var size = vSizes.length > 0 ? vSizes[0] : 1.23;
        // only 1 line if not an array iin vertical offset
        var vMargin = props.has("vertical_margin") ? props.get("vertical_margin") : 0.0;
        var startx = rect.x
        // the next line / the first line will start at margin height
        var vlineType = null;
        /* only draw one line vertical if the spacing is wider than the border or we're giving any array in "vertical_*" */
        var vOnce = ! ["vertical_offsets", "vertical_types", "vertical_sizes"].some((x) => {return(typeof(props.get(x)) == typeof([]))});
        var vcumulative_offset=0;
        var voffset = vMargin;
        var line_x = startx + voffset;
        console.log("Starting vertical lines: line_x(" + line_x.toFixed(3) + ") = startx(" + startx + ") < y_end("  + y_end + ") once:" + vOnce );
        for (var line_num=0; startx + vcumulative_offset + (line_num * line_spacing) + voffset <= y_end ; line_num++) {
            /* keep a gglobal offset as our  new starting point is offset from the previous  line */
            if(line_num>=4096) {break;}
            vcumulative_offset+=voffset;
            vlineType = vlineTypes.length ? vlineTypes[0] : StrokeDash.Solid;
            /* create line */
            line_x = vcumulative_offset + ( line_num * line_spacing ) + startx;
            var sPoint = new Point(line_x, rect.y);
            var ePoint = new Point(line_x, x_end);
            var line = cnvs.addLine(sPoint, ePoint);

            line.shadowColor = null;
            line.name = `${vOnce ? "Only " : ""} { n:${line_num},`;
            if (vlineTypes.length > 0) { line.name += `type(${l},${vlineTypes.length >1 && vlineTypes[1] == '...' ? "!" : ""}${Math.floor(l % vlineTypes.length)}/${vlineTypes.length}):${vlineType}` }
            if (vSizes.length > 0) { line.name += `size:(${p},${vSizes.length >1 && vSizes[1] == '...' ? "!" : ""}${Math.floor(p % vSizes.length)}/${vSizes.length}):${vSizes.length ? vSizes[0] : 1.0}, ` }
            if (vdistances.length>0) { line.name+=`offest(${t},${vdistances.length >1 && vdistances[1] == '...' ? "!" : ""}${Math.floor(t % vdistances.length)}/${vdistances.length}):${voffset},` }
            line.name += `color:${(!vSizes.length || ![0.0,0,null].some((x) => vSizes[0]==x))}}, startx(${startx})+⨊offset(${vcumulative_offset-voffset}) + spacing(${(line_num * line_spacing) + voffset }) = ${line_x} < y_end(${y_end})`;

            line.strokeColor = (!vSizes.length || ![0.0,0,null].some((x) => vSizes[0]==x)) ?  vColor : Color.clear;
            line.strokePattern = vlineType;
            /* NOTE: workaround for older omnifocus where you cant assing <1 pts */
            line.strokeThickness = vSizes.length && vSizes[0] > 1.0 ? vSizes[0] : 1.0;
            //add line in the group on the new layer
            rgroup.push(line);
            line.orderAbove(s);
            if (vOnce) { break; }
            if (vSizes.length > 1 && vSizes[1] != '...') {vSizes.rotate(); p+=1}
            if (vlineTypes.length > 1 && vlineTypes[1] != '...') {vlineTypes.rotate(); l+=1}
            if (vdistances.length > 1 && vdistances[1] != '...' &&  line_num > 0) {vdistances.rotate(); t+=1} else if (vdistances[0] == '...'){vdistances.rotate(true); t-=1;} 
            // set after we rotate
            voffset = vdistances.length  && vdistances[0] != '...' ? vdistances[0] : 0.0;
            console.log("line_x(" + line_x.toFixed(3) + ") = startx(" + startx + ") + offset("+ vcumulative_offset + ") + " + (line_num * line_spacing) + " + voffset(" +  voffset + ") < x_end("  + x_end + ")");
        }
    }
    if(!skip_horizontal) {
    /* start at the top and reset t,d and l counters */
    var cumulative_offset=0
    var line_y = starty;
    var offset = props.has("margin_height") ? props.get("margin_height") : 0.0
    var lineType = lineTypes.length ? lineTypes[0] : StrokeDash.Solid;
    t=0;p=0;l=0;
    console.log("starting line_y(" + line_y.toFixed(3) + ") = starty(" + starty + ") + offset("+ cumulative_offset + ") +  offset(" +  offset + ") < x_end"  + x_end + ")");
    for (line_num=0; starty + cumulative_offset + (line_num * line_spacing) + offset <= x_end ; line_num++) {
        /* run away? */
        if(line_num>=4096) {break;}
        cumulative_offset+=offset;
        lineType = lineTypes.length > 0 ? lineTypes[0] : StrokeDash.Solid;
        line_y = cumulative_offset + ( line_num * line_spacing ) + starty;
        // draw line
        sPoint = new Point(rect.x, line_y);
        ePoint = new Point(y_end, line_y);
        /* create the line */
        line=cnvs.addLine(sPoint, ePoint);
        line.name = `{ n:${line_num},`;
            if (lineTypes.length > 0) { line.name += `type(${l}${lineTypes.length >1 && lineTypes[1] == '...' ? "!" : ""},${Math.floor(l % lineTypes.length)}/${lineTypes.length}):${lineType}` }
            if (sizes.length > 0) { line.name += `size:(${p}${sizes.length >1 && sizes[1] == '...' ? "!" : ""},${Math.floor(p % sizes.length)}/${sizes.length}):${size}, ` }
            if (distances.length>0) { line.name+=`offest(${t}${distances.length >1 && distances[1] == '...' ? "!" : ""},${Math.floor(t % distances.length)}/${distances.length}):${offset},` }
            line.name += `color:${(!sizes.length || ![0.0,0,null].some((x) => sizes[0]==x))}} starty(${starty})+⨊offset(${cumulative_offset-offset}) + spacing(${(line_num * line_spacing) + offset }) = ${line_y} < x_end(${x_end})`;
 
        line.strokeColor = (!sizes.length || ![0.0,0,null].some((x) => sizes[0]==x)) ?  hColor : Color.clear;
        line.strokePattern = lineType;
        line.strokeThickness = ((!!sizes.length && sizes[0] > 1.0) ? sizes[0] : 1.0);
        /* stroke color can be set to null, in this case use the solid's color */
        /* no drop shadow */
        line.shadowColor = null;
        //add line in the group
        line.orderAbove(s);
        // library bug 
        lgroup.push(line);

        if (sizes.length>1 && sizes[1] != '...'){sizes.rotate();p+=1}
        if (lineTypes.length > 1 && lineTypes[1] != '...') {lineTypes.rotate(); l+=1}
        if (distances.length > 1 && distances[1] != '...' &&  line_num > 0) {distances.rotate(); t+=1} else if (distances[0] == '...'){vdistances.rotate(true); t-=1;} 
        offset = distances.length  && distances[0] != '...' ? distances[0] : 0.0;
        console.log("line_y(" + line_y.toFixed(3) + ") = starty(" + starty + ") + offset("+ cumulative_offset + ") + " + (line_num * line_spacing) + " + offset(" +  voffset + ") < x_end("  + x_end + ")");
        }

        var group=new Group(lgroup);
        group.name="Horizontal" + solid.name;
        group.shadowColor = null;
    }
    if (rgroup.length > 0) {
        var rg=new Group(rgroup);
        
        rg.name="Vertical" + solid.name;
    }
    solid.locked = !lock;
    // s.orderAbove(solid)
}
return LineLib;
})();
