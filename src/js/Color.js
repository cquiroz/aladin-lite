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
 * File Color
 *
 * Author: Thomas Boch[CDS]
 *
 *****************************************************************************/

export default class Color {

    static curIdx = 0;
    static colors = ['#ff0000', '#0000ff', '#99cc00', '#ffff00','#000066', '#00ffff', '#9900cc', '#0099cc', '#cc9900', '#cc0099', '#00cc99', '#663333', '#ffcc9a', '#ff9acc', '#ccff33', '#660000', '#ffcc33', '#ff00ff', '#00ff00', '#ffffff'];

    static getNextColor() {
        const c = Color.colors[Color.curIdx % (Color.colors.length)];
        Color.curIdx++;
        return c;
    }

    /** return most suited (ie readable) color for a label, given a background color
     * bkgdColor: color, given as a 'rgb(<r value>, <g value>, <v value>)' . This is returned by $(<element>).css('background-color')
     *
     * example call: Color.getLabelColorForBackground('rgb(3, 123, 42)')
     * adapted from http://stackoverflow.com/questions/1855884/determine-font-color-based-on-background-color
     */
    static getLabelColorForBackground(rgbBkgdColor) {
        const lightLabel = '#eee'
        const darkLabel = '#111'
        const rgb = rgbBkgdColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        if (rgb==null) {
            // we return the dark label color if we can't parse the color
            return darkLabel
        }
        const r = parseInt(rgb[1]);
        const g = parseInt(rgb[2]);
        const b = parseInt(rgb[3]);

        // Counting the perceptive luminance - human eye favors green color...
        const a = 1 - ( 0.299 * r + 0.587 * g + 0.114 * b) / 255;

        if (a < 0.5) {
            return darkLabel; // bright color --> dark font
        }
        else {
            return lightLabel; // dark color --> light font
        }
    }
}
