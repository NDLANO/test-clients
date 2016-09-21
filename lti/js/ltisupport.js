/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

LTI = {};

LTI.loadLtiApp = function(configUrl, callback) {
    $.ajax({
        url: "http://api.test.ndla.no/packages/configurl?lti-config-url=" + configUrl,
        dataType: "xml",
        success: function(data) {
            var data = {
                title: $(data).find("blti\\:title").first().text(),
                description: $(data).find("blti\\:description").first().text(),
                launch_url: $(data).find("blti\\:launch_url").first().text()
            };
            callback(data);
        }
    });
};
