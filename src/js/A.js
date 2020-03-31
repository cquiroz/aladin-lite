import Overlay from './Overlay';
import MOC from './MOC';
import URLBuilder from './URLBuilder';
import Coo from './coo';
import Circle from './Circle';
import Polyline from './Polyline';
import Footprint from './Footprint';
import HpxImageSurvey from './HpxImageSurvey';
import ProgressiveCat from './ProgressiveCat';
import Catalog from './Catalog';
import Aladin from './Aladin';
import Source from './Source';
import $ from 'jquery';

    // API
    let footprintsFromSTCS = function(stcs) {
        var footprints = Overlay.parseSTCS(stcs);

        return footprints;
    };

    // API
    let MOCFromURL = function(url, options, successCallback) {
        var moc = new MOC(options);
        moc.dataFromFITSURL(url, successCallback);

        return moc;
    };

    // API
    let MOCFromJSON = function(jsonMOC, options) {
        var moc = new MOC(options);
        moc.dataFromJSON(jsonMOC);

        return moc;
    };
    // TODO: try first without proxy, and then with, if param useProxy not set
    // API
    let catalogFromURL = function(url, options, successCallback, useProxy) {
        var catalog = catalog(options);
        // TODO: should be self-contained in Catalog class
        Catalog.parseVOTable(url, function(sources) {
                catalog.addSources(sources);
                if (successCallback) {
                    successCallback(sources);
                }
            },
            catalog.maxNbSources, useProxy,
            catalog.raField, catalog.decField
        );

        return catalog;
    };

    // API
    // @param target: can be either a string representing a position or an object name, or can be an object with keys 'ra' and 'dec' (values being in decimal degrees)
    let catalogFromSimbad = function(target, radius, options, successCallback) {
        options = options || {};
        if (! ('name' in options)) {
            options['name'] = 'Simbad';
        }
        var url = URLBuilder.buildSimbadCSURL(target, radius);
        return catalogFromURL(url, options, successCallback, false);
    };

    // API
    let catalogFromNED = function(target, radius, options, successCallback) {
        options = options || {};
        if (! ('name' in options)) {
            options['name'] = 'NED';
        }
        var url;
        if (target && (typeof target  === "object")) {
            if ('ra' in target && 'dec' in target) {
                url = URLBuilder.buildNEDPositionCSURL(target.ra, target.dec, radius);
            }
        }
        else {
    	    var isObjectName = /[a-zA-Z]/.test(target);
            if (isObjectName)  {
                url = URLBuilder.buildNEDObjectCSURL(target, radius);
            }
            else {
                var coo = new Coo();
                coo.parse(target);
                url = URLBuilder.buildNEDPositionCSURL(coo.lon, coo.lat, radius);
            }
        }

        return catalogFromURL(url, options, successCallback);
    };

    // API
    let catalogFromVizieR = function(vizCatId, target, radius, options, successCallback) {
        options = options || {};
        if (! ('name' in options)) {
            options['name'] = 'VizieR:' + vizCatId;
        }
        var url = URLBuilder.buildVizieRCSURL(vizCatId, target, radius, options);

        return catalogFromURL(url, options, successCallback, false);
    };

    // API
    let catalogFromSkyBot = function(ra, dec, radius, epoch, queryOptions, options, successCallback) {
        queryOptions = queryOptions || {};
        options = options || {};
        if (! ('name' in options)) {
            options['name'] = 'SkyBot';
        }
        var url = URLBuilder.buildSkyBotCSURL(ra, dec, radius, epoch, queryOptions);
        return catalogFromURL(url, options, successCallback, false);
    };
//@API
let aladin = function(divSelector, options) {
  return new Aladin($(divSelector)[0], options);
};

//@API
// TODO : lecture de properties
let imageLayer = function(id, name, rootUrl, options) {
    return new HpxImageSurvey(id, name, rootUrl, null, null, options);
};

// @API
let source = function(ra, dec, data, options) {
    return new Source(ra, dec, data, options);
};

// @API
let marker = function(ra, dec, options, data) {
    options = options || {};
    options['marker'] = true;
    return source(ra, dec, data, options);
};

// @API
let polygon = function(raDecArray) {
    var l = raDecArray.length;
    if (l>0) {
        // close the polygon if needed
        if (raDecArray[0][0]!=raDecArray[l-1][0] || raDecArray[0][1]!=raDecArray[l-1][1]) {
            raDecArray.push([raDecArray[0][0], raDecArray[0][1]]);
        }
    }
    return new Footprint(raDecArray);
};

//@API
let polyline = function(raDecArray, options) {
    return new Polyline(raDecArray, options);
};


// @API
let circle = function(ra, dec, radiusDeg, options) {
    return new Circle([ra, dec], radiusDeg, options);
};

// @API
let graphicOverlay = function(options) {
    return new Overlay(options);
};

// @API
let catalog = function(options) {
    return new Catalog(options);
};

// @API
let catalogHiPS = function(rootURL, options) {
    return new ProgressiveCat(rootURL, null, null, options);
};


export {circle, catalog, marker, catalogFromURL, footprintsFromSTCS, source, aladin};
