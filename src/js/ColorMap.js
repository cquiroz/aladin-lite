// Copyright 2013 - UDS/CNRS
// The Aladin Lite program is distributed under the terms
// of the GNU General Public License version 3.
//
// This file is part of Aladin Lite.
//
//    Aladin Lite is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, version 3 of the License.
//
//    Aladin Lite is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    The GNU General Public License is available in COPYING file
//    along with Aladin Lite.
//



/******************************************************************************
 * Aladin Lite project
 *
 * File ColorMap.js
 *
 * Author: Thomas Boch[CDS]
 *
 *****************************************************************************/
import AladinUtils from './AladinUtils';

const ColorMap = (function() {


    // constructor
    const ColorMap = function(view) {
        this.view = view;
        this.reversed = false;
        this.mapName = 'native';
        this.sig = this.signature();
    };

ColorMap.MAPS = {};

    ColorMap.MAPS['eosb'] = {
            name: 'Eos B',
            r: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,9,18,27,36,45,49,57,72,81,91,100,109,118,127,
                136,131,139,163,173,182,191,200,209,218,227,213,221,255,255,255,255,255,
                255,255,255,229,229,255,255,255,255,255,255,255,255,229,229,255,255,255,
                255,255,255,255,255,229,229,255,255,255,255,255,255,255,255,229,229,255,
                255,255,255,255,255,255,255,229,229,255,255,255,255,255,255,255,255,229,
                229,255,255,255,255,255,255,255,255,229,229,255,255,255,255,255,255,255,
                255,229,229,255,255,255,255,255,255,255,255,229,229,255,253,251,249,247,
                245,243,241,215,214,235,234,232,230,228,226,224,222,198,196,216,215,213,
                211,209,207,205,203,181,179,197,196,194,192,190,188,186,184,164,162,178,
                176,175,173,171,169,167,165,147,145,159,157,156,154,152,150,148,146,130,
                128,140,138,137,135,133,131,129,127,113,111,121,119,117,117],
            g: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,15,23,31,39,47,55,57,64,79,87,95,
                103,111,119,127,135,129,136,159,167,175,183,191,199,207,215,200,207,239,
                247,255,255,255,255,255,255,229,229,255,255,255,255,255,255,255,255,229,
                229,255,255,255,255,255,255,255,255,229,229,255,250,246,242,238,233,229,
                225,198,195,212,208,204,199,195,191,187,182,160,156,169,165,161,157,153,
                148,144,140,122,118,127,125,123,121,119,116,114,112,99,97,106,104,102,
                99,97,95,93,91,80,78,84,82,80,78,76,74,72,70,61,59,63,61,59,57,55,53,50,
                48,42,40,42,40,38,36,33,31,29,27,22,21,21,19,16,14,12,13,8,6,3,1,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            b: [116,121,127,131,136,140,144,148,153,
                157,145,149,170,174,178,182,187,191,195,199,183,187,212,216,221,225,229,
                233,238,242,221,225,255,247,239,231,223,215,207,199,172,164,175,167,159,
                151,143,135,127,119,100,93,95,87,79,71,63,55,47,39,28,21,15,7,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0]
    };
    ColorMap.MAPS['rainbow'] = {
            name: 'Rainbow',
            r: [0,4,9,13,18,22,27,31,36,40,45,50,54,
                58,61,64,68,69,72,74,77,79,80,82,83,85,84,86,87,88,86,87,87,87,85,84,84,
                84,83,79,78,77,76,71,70,68,66,60,58,55,53,46,43,40,36,33,25,21,16,12,4,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,8,12,21,25,29,33,42,
                46,51,55,63,67,72,76,80,89,93,97,101,110,114,119,123,131,135,140,144,153,
                157,161,165,169,178,182,187,191,199,203,208,212,221,225,229,233,242,246,
                250,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,
                255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,
                255,255,255,255,255,255,255,255,255,255,255,255,255,255],
            g: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,4,8,16,21,25,29,38,42,46,51,55,63,67,72,76,84,89,93,97,
                106,110,114,119,127,131,135,140,144,152,157,161,165,174,178,182,187,195,
                199,203,208,216,220,225,229,233,242,246,250,255,255,255,255,255,255,255,
                255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,
                255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,
                255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,
                255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,
                255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,
                255,250,242,238,233,229,221,216,212,208,199,195,191,187,178,174,170,165,
                161,153,148,144,140,131,127,123,119,110,106,102,97,89,85,80,76,72,63,59,
                55,51,42,38,34,29,21,17,12,8,0],
            b: [0,3,7,10,14,19,23,28,32,38,43,48,53,
                59,63,68,72,77,81,86,91,95,100,104,109,113,118,122,127,132,136,141,145,
                150,154,159,163,168,173,177,182,186,191,195,200,204,209,214,218,223,227,
                232,236,241,245,250,255,255,255,255,255,255,255,255,255,255,255,255,255,
                255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,
                255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,
                255,255,255,255,255,255,246,242,238,233,225,220,216,212,203,199,195,191,
                187,178,174,170,165,157,152,148,144,135,131,127,123,114,110,106,102,97,
                89,84,80,76,67,63,59,55,46,42,38,34,25,21,16,12,8,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    };
    ColorMap.MAPS['cubehelix'] = {
            name: 'Cubehelix',
            r: [0,1,3,4,6,8,9,10,12,13,14,15,17,18,
                19,20,20,21,22,23,23,24,24,25,25,25,26,26,26,26,26,26,26,26,26,26,26,25,
                25,25,25,24,24,24,23,23,23,23,22,22,22,21,21,21,21,21,21,20,20,20,21,21,
                21,21,21,22,22,22,23,23,24,25,26,27,27,28,30,31,32,33,35,36,38,39,41,43,
                45,47,49,51,53,55,57,60,62,65,67,70,72,75,78,81,83,86,89,92,95,98,101,104,
                107,110,113,116,120,123,126,129,132,135,138,141,144,147,150,153,155,158,
                161,164,166,169,171,174,176,178,181,183,185,187,189,191,193,194,196,198,
                199,201,202,203,204,205,206,207,208,209,209,210,211,211,211,212,212,212,
                212,212,212,212,212,211,211,211,210,210,210,209,208,208,207,207,206,205,
                205,204,203,203,202,201,201,200,199,199,198,197,197,196,196,195,195,194,
                194,194,193,193,193,193,193,193,193,193,193,193,194,194,195,195,196,196,
                197,198,199,200,200,202,203,204,205,206,208,209,210,212,213,215,217,218,
                220,222,223,225,227,229,231,232,234,236,238,240,242,244,245,247,249,251,
                253,255],
            g: [0,0,1,1,2,2,3,4,4,5,6,6,7,8,9,10,
                11,11,12,13,14,15,17,18,19,20,21,22,24,25,26,28,29,31,32,34,35,37,38,40,
                41,43,45,46,48,50,52,53,55,57,58,60,62,64,66,67,69,71,73,74,76,78,79,81,
                83,84,86,88,89,91,92,94,95,97,98,99,101,102,103,104,106,107,108,109,110,
                111,112,113,114,114,115,116,116,117,118,118,119,119,120,120,120,121,121,
                121,121,122,122,122,122,122,122,122,122,122,122,122,122,122,122,122,121,
                121,121,121,121,121,121,121,121,120,120,120,120,120,120,120,120,120,120,
                121,121,121,121,121,122,122,122,123,123,124,124,125,125,126,127,127,128,
                129,130,131,131,132,133,135,136,137,138,139,140,142,143,144,146,147,149,
                150,152,154,155,157,158,160,162,164,165,167,169,171,172,174,176,178,180,
                182,183,185,187,189,191,193,194,196,198,200,202,203,205,207,208,210,212,
                213,215,216,218,219,221,222,224,225,226,228,229,230,231,232,233,235,236,
                237,238,239,240,240,241,242,243,244,244,245,246,247,247,248,248,249,250,
                250,251,251,252,252,253,253,254,255],
            b: [0,1,3,4,6,8,9,11,13,15,17,19,21,23,
                25,27,29,31,33,35,37,39,41,43,45,47,48,50,52,54,56,57,59,60,62,63,65,66,
                67,69,70,71,72,73,74,74,75,76,76,77,77,77,78,78,78,78,78,78,78,77,77,77,
                76,76,75,75,74,73,73,72,71,70,69,68,67,66,66,65,64,63,61,60,59,58,58,57,
                56,55,54,53,52,51,51,50,49,49,48,48,47,47,47,46,46,46,46,46,47,47,47,48,
                48,49,50,50,51,52,53,55,56,57,59,60,62,64,65,67,69,71,74,76,78,81,83,86,
                88,91,94,96,99,102,105,108,111,114,117,120,124,127,130,133,136,140,143,
                146,149,153,156,159,162,165,169,172,175,178,181,184,186,189,192,195,197,
                200,203,205,207,210,212,214,216,218,220,222,224,226,227,229,230,231,233,
                234,235,236,237,238,239,239,240,241,241,242,242,242,243,243,243,243,243,
                243,243,243,243,243,242,242,242,242,241,241,241,241,240,240,240,239,239,
                239,239,239,238,238,238,238,238,238,238,238,239,239,239,240,240,240,241,
                242,242,243,244,245,246,247,248,249,250,252,253,255]
    };



    ColorMap.MAPS_CUSTOM = ['cubehelix', 'eosb', 'rainbow'];
    ColorMap.MAPS_NAMES = ['native', 'grayscale'].concat(ColorMap.MAPS_CUSTOM);

    ColorMap.prototype.reverse = function(val) {
        if (val) {
            this.reversed = val;
        }
        else {
            this.reversed = ! this.reversed;
        }
        this.sig = this.signature();
        this.view.requestRedraw();
    };


    ColorMap.prototype.signature = function() {
        var s = this.mapName;

        if (this.reversed) {
            s += ' reversed';
        }

        return s;
    };

    ColorMap.prototype.update = function(mapName) {
        this.mapName = mapName;
        this.sig = this.signature();
        this.view.requestRedraw();
    };

    ColorMap.prototype.apply = function(img) {
        if ( this.sig==='native' ) {
            return img;
        }

        if (img.cmSig===this.sig) {
            return img.cmImg; // return cached pixels
        }

        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var pixelData = imageData.data;
        var length = pixelData.length;
        var a, b, c;
        var switchCase = 3;
        if (this.mapName==='grayscale') {
            switchCase = 1;
        }
        else if (ColorMap.MAPS_CUSTOM.indexOf(this.mapName)>=0) {
            switchCase = 2;
        }
        for (var i = 0; i < length; i+= 4) {
            switch(switchCase) {
                case 1:
                    a = b = c = AladinUtils.myRound((pixelData[i]+pixelData[i+1]+pixelData[i+2])/3);
                    break;
                case 2:
                    if (this.reversed) {
                        a = ColorMap.MAPS[this.mapName].r[255-pixelData[i]];
                        b = ColorMap.MAPS[this.mapName].g[255-pixelData[i+1]];
                        c = ColorMap.MAPS[this.mapName].b[255-pixelData[i+2]];
                    }
                    else {
                        a = ColorMap.MAPS[this.mapName].r[pixelData[i]];
                        b = ColorMap.MAPS[this.mapName].g[pixelData[i+1]];
                        c = ColorMap.MAPS[this.mapName].b[pixelData[i+2]];
                    }
                    break;
                default:
                    a = pixelData[i];
                    b = pixelData[i + 1];
                    c = pixelData[i + 2];

            }
            if (switchCase!==2 && this.reversed) {
                a = 255-a;
                b = 255-b;
                c = 255-c;

            }
            pixelData[i]     = a;
            pixelData[i + 1] = b;
            pixelData[i + 2] = c;

        }
        imageData.data = pixelData;
        ctx.putImageData(imageData, 0, 0);

        // cache image with color map applied
        img.cmSig = this.sig;
        img.cmImg = canvas;

        return img.cmImg;
    };

    return ColorMap;
})();

export default ColorMap;

