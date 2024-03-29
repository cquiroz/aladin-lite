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
 * File HealpixCache
 *
 * Author: Thomas Boch[CDS]
 *
 *****************************************************************************/
import { HealpixIndex } from './HealpixIndex';

// class holding some HEALPix computations for better performances
//
// it is made of :
// - a static cache for HEALPix corners at nside=8
// - a dynamic cache for
const HealpixCache = (function() {

    var HealpixCache = {};

    HealpixCache.staticCache = {corners: {nside8: []}};
    // TODO : utilisation du dynamicCache
    HealpixCache.dynamicCache = {};

    HealpixCache.lastNside = 8;

    HealpixCache.hpxIdxCache = null;

    // TODO : conserver en cache le dernier résultat ?

    HealpixCache.init = function() {
      // pre-compute corners position for nside=8
      var hpxIdx = new HealpixIndex(8);
      var npix = HealpixIndex.nside2Npix(8);
        var corners;
      for (var ipix=0; ipix<npix; ipix++) {
            corners =  hpxIdx.corners_nest(ipix, 1);
        HealpixCache.staticCache.corners.nside8.push(corners);
      }

      HealpixCache.hpxIdxCache = hpxIdx;
    };

    HealpixCache.init();

    HealpixCache.corners_nest = function(ipix, nside) {
      if (nside===8) {
        return HealpixCache.staticCache.corners.nside8[ipix];
      }

      if (nside !== HealpixCache.lastNside) {
        HealpixCache.hpxIdxCache = new HealpixIndex(nside);
        HealpixCache.lastNside = nside;
      }

      return HealpixCache.hpxIdxCache.corners_nest(ipix, 1);

    };

    return HealpixCache;
})();

export default HealpixCache;
