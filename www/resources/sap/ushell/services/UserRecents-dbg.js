// Copyright (c) 2009-2020 SAP SE, All Rights Reserved

/**
 * @fileOverview The Unified Shell's user activity service.
 * @version 1.93.6
 */
sap.ui.define([
    "sap/ui/base/Object",
    "sap/ushell/services/AppType",
    "sap/ushell/EventHub",
    "sap/ui/thirdparty/jquery",
    "sap/base/Log",
    "sap/ui/Device",
    "sap/ushell/utils",
    "sap/base/util/ObjectPath"
], function (
    BaseObject,
    appType,
    EventHub,
    jQuery,
    Log,
    Device,
    utils,
    ObjectPath
) {
    "use strict";

    var PERSONALIZATION_CONTAINER = "sap.ushell.services.UserRecents";

    /**
     * Base class for all helper classes.
     * @constructor
     * @private
     */
    var UserRecentsBase = BaseObject.extend("sap.ushell.services.UserRecentsBase", {
        constructor: function (personalizationItemName, maxItems, compareItems) {
            this.aRecents = [];
            this.iMaxItems = maxItems;

            this._oPersonalizerPromise = sap.ushell.Container.getServiceAsync("Personalization")
                .then(function (PersonalizationService) {
                    return PersonalizationService.getPersonalizer({
                        container: PERSONALIZATION_CONTAINER,
                        item: personalizationItemName
                    });
                });

            this._compareItems = compareItems;
        }
    });

    UserRecentsBase.prototype._load = function () {
        var oDeferred = new jQuery.Deferred();

        this._oPersonalizerPromise
            .then(function (oPersonalizer) {
                oPersonalizer.getPersData()
                    .done(oDeferred.resolve)
                    .fail(oDeferred.reject);
            })
            .catch(function (error) {
                Log.error("Personalization service does not work:");
                Log.error(error.name + ": " + error.message);

                oDeferred.reject(error);
            });

        return oDeferred.promise();
    };

    UserRecentsBase.prototype._save = function (aList) {
        var oDeferred = new jQuery.Deferred();

        this._oPersonalizerPromise
            .then(function (oPersonalizer) {
                oPersonalizer.setPersData(aList)
                    .done(oDeferred.resolve)
                    .fail(oDeferred.reject);
            })
            .catch(function (error) {
                Log.error("Personalization service does not work:");
                Log.error(error.name + ": " + error.message);

                oDeferred.reject(error);
            });

        return oDeferred.promise();
    };

    UserRecentsBase._itemSorter = function (oItem1, oItem2) {
        return oItem2.iTimestamp - oItem1.iTimestamp;
    };

    /**
     * @constructor
     * @private
     */
    var RecentsList = UserRecentsBase.extend("sap.ushell.services.RecentsList");

    RecentsList.prototype._updateIfAlreadyIn = function (oItem, iTimestampNow) {
        return this.aRecents.some(function (oRecentEntry) {
            var bFound;

            if (this._compareItems(oRecentEntry.oItem, oItem)) {
                oRecentEntry.oItem = oItem;
                oRecentEntry.iTimestamp = iTimestampNow;
                oRecentEntry.iCount = oRecentEntry.iCount + 1;
                bFound = true;
            } else {
                bFound = false;
            }

            return bFound;
        }.bind(this));
    };

    RecentsList.prototype._insertNew = function (oItem, iTimestampNow) {
        var oNewEntry = {
            oItem: oItem,
            iTimestamp: iTimestampNow,
            iCount: 1
        };

        if (this.aRecents.length === this.iMaxItems) {
            this.aRecents.sort(UserRecentsBase._itemSorter);
            this.aRecents.pop();
        }

        this.aRecents.push(oNewEntry);
    };

    RecentsList.prototype.clearAllActivities = function () {
        return this._save([]);
    };

    RecentsList.prototype.newItem = function (oItem) {
        var oDeferred = new jQuery.Deferred();
        var iTimestampNow = Date.now();
        var bAlreadyIn;

        this._load()
            .done(function (aLoadedRecents) {
                this.aRecents = aLoadedRecents || [];

                bAlreadyIn = this._updateIfAlreadyIn(oItem, iTimestampNow);
                if (!bAlreadyIn) {
                    this._insertNew(oItem, iTimestampNow);
                }

                this._save(this.aRecents)
                    .done(function () {
                        oDeferred.resolve();
                    })
                    .fail(function () {
                        oDeferred.reject();
                    });
            }.bind(this));

        return oDeferred.promise();
    };

    RecentsList.prototype.getRecentItems = function () {
        var oDeferred = new jQuery.Deferred();

        this._load()
            .done(function (aLoadedRecents) {
                aLoadedRecents = aLoadedRecents || [];
                aLoadedRecents.sort(UserRecentsBase._itemSorter);
                this.aRecents = aLoadedRecents.slice(0, this.iMaxItems);
                oDeferred.resolve(jQuery.map(this.aRecents, function (oRecentEntry) {
                    return oRecentEntry.oItem;
                }));
            }.bind(this));

        return oDeferred.promise();
    };

    /**
     * @constructor
     * @private
     */
    var RecentActivity = UserRecentsBase.extend("sap.ushell.services.RecentActivity", {
        constructor: function (maxItems) {
            UserRecentsBase.call(this, "RecentActivity", maxItems, RecentActivity._compareItems);
        }
    });

    RecentActivity.MAX_DAYS = 30; // Number of days to be considered "recent"
    RecentActivity.ITEM_COUNT = 30; // Number of items to use for the item feed

    /**
     * @typedef UserRecentsItem
     * @property {sap.ushell.AppType} appType
     * @property {string} url
     * @property {string} appId
     */

    /**
     * Compares items a and b for equality.
     * This does not depend on the identical references or content, but on the properties "appType", "url" and "appId".
     *
     * @param {UserRecentsItem} a The first item to be checked.
     * @param {UserRecentsItem} b The second item to be checked.
     * @returns {boolean} True if both items are considered equal, otherwise false.
     * @private
     */
    RecentActivity._compareItems = function (a, b) {
        if (a.appType === b.appType) {
            if (a.appType !== appType.APP) {
                return a.url === b.url;
            }
            return a.appId === b.appId;
        } else if (a.appType === appType.APP || b.appType === appType.APP) {
            return (a.appId === b.appId) && (a.url === b.url);
        }
        return false;
    };

    RecentActivity.prototype._updateIfAlreadyIn = function (oItem, iTimestampNow) {
        return this.oRecentActivities.recentUsageArray.some(function (oRecentEntry) {
            var bFound;
            if (RecentActivity._compareItems(oRecentEntry.oItem, oItem)) {
                /*
                in case both items considered as equal (by _compareItems function),
                we will override the saved item only in case its type is not type 'Application'.

                As the shell always adds user recent entry after every app closed, it might be that a different
                App as 'OVP' for example will also use API to add its app as user-recent entry, and the information
                they provide regarding the item to save is with higher value then the information the shell constructs (icon title etc)
                */
                if ((oItem.appType === oRecentEntry.oItem.appType) ||
                    (oItem.appType !== appType.APP)) {
                    // override the item
                    jQuery.extend(oRecentEntry.oItem, oItem);
                    oRecentEntry.iTimestamp = iTimestampNow;
                    oRecentEntry.oItem.timestamp = iTimestampNow;
                    oRecentEntry.mobile = undefined;
                    oRecentEntry.tablet = undefined;
                    oRecentEntry.desktop = undefined;

                    // we update the counter if -
                    // - existing item and new item are of the same type OR
                    // - existing item and new item is not of same type BUT both are not Application
                    if ((oItem.appType === oRecentEntry.oItem.appType) ||
                        (oItem.appType !== appType.APP && oRecentEntry.oItem.appType !== appType.APP)) {
                        // update both the usage array's last day and the global entry counter
                        oRecentEntry.aUsageArray[oRecentEntry.aUsageArray.length - 1] += 1;
                        oRecentEntry.iCount += 1;
                    }

                    this.oRecentActivities.recentUsageArray.sort(UserRecentsBase._itemSorter);
                }

                bFound = true;
            } else {
                bFound = false;
            }
            return bFound;
        }.bind(this));
    };

    RecentActivity.prototype._insertNew = function (oItem, iTimestampNow, sIcon) {
        oItem.timestamp = iTimestampNow;
        if (sIcon) {
            oItem.icon = sIcon;
        }
        var oNewEntry = {
            oItem: oItem,
            iTimestamp: iTimestampNow,
            aUsageArray: [1],
            iCount: 1,
            mobile: undefined,
            tablet: undefined,
            desktop: undefined
        };
        if (this.oRecentActivities.recentUsageArray.length === this.iMaxItems) {
            this.oRecentActivities.recentUsageArray.pop();
        }
        this.oRecentActivities.recentUsageArray.unshift(oNewEntry);
    };

    RecentActivity.prototype.newItem = function (oItem) {
        var oDeferred = new jQuery.Deferred();
        var iTimestampNow = Date.now();
        var sIcon = this.getActivityIcon(oItem.appType, oItem.icon);
        var bAlreadyIn;
        var currentDay = this.getDayFromDateObj(new Date());

        this._load()
            .done(function (aLoadedRecents) {
                this.oRecentActivities = this.getRecentActivitiesFromLoadedData(aLoadedRecents);
                // If the current day is different than the recent one -
                // add a new entry (for the current day's usage) to each usage array
                if (currentDay !== this.oRecentActivities.recentDay) {
                    this.addNewDay();
                    this.oRecentActivities.recentDay = currentDay;
                }

                bAlreadyIn = this._updateIfAlreadyIn(oItem, iTimestampNow);
                if (!bAlreadyIn) {
                    this._insertNew(oItem, iTimestampNow, sIcon);
                }

                this._save(this.oRecentActivities)
                    .done(function () {
                        EventHub.emit("newUserRecentsItem", this.oRecentActivities);
                        oDeferred.resolve();
                    }.bind(this))
                    .fail(function () {
                        oDeferred.reject();
                    });
            }.bind(this));

        return oDeferred.promise();
    };

    RecentActivity.prototype.getActivityIcon = function (sAppType, sIcon) {
        switch (sAppType) {
            case appType.SEARCH:
                return sIcon || "sap-icon://search";
            case appType.COPILOT:
                return sIcon || "sap-icon://co";
            case appType.URL:
                return sIcon || "sap-icon://internet-browser";
            default:
                return sIcon || "sap-icon://product";
        }
    };

    RecentActivity.prototype.clearAllActivities = function () {
        var oDeferred = new jQuery.Deferred();

        this._save([])
            .done(function () {
                EventHub.emit("userRecentsCleared", Date.now());
                oDeferred.resolve();
            })
            .fail(function () {
                oDeferred.reject();
            });

        return oDeferred.promise();
    };

    /**
     * getRecentItems return last RecentActivity.ITEM_COUNT activities for current device.
     *   - Check if for the current device we have unresolved entries.
     *   - resolve the unresolved entries and set the attribute according to the current device.
     *   - persist data.
     *   - return the last <maxNumOfActivities> entries or all entries supported by current device (if maxNumOfActivities was not provided).
     */
    RecentActivity.prototype.getRecentItemsHelper = function (maxNumOfActivities) {
        var oDeferred = new jQuery.Deferred();
        var activityIndex;
        var oActivity;
        var sCurrentDevice;
        var bIsResolved = false;
        var aIntentsToResolve = [];
        var aURL = [];
        var currentDay = this.getDayFromDateObj(new Date());

        if (Device.system.desktop) {
            sCurrentDevice = "desktop";
        } else if (Device.system.tablet) {
            sCurrentDevice = "tablet";
        } else {
            sCurrentDevice = "mobile";
        }

        this._load()
            .done(function (aLoadedRecents) {
                this.oRecentActivities = this.getRecentActivitiesFromLoadedData(aLoadedRecents);
                // If the current day is different than the recent one -
                // add a new entry (for the current day's usage) to each usage array
                var bNewDayAdded = false;
                var sMandatoryParams;
                if (currentDay !== this.oRecentActivities.recentDay) {
                    this.addNewDay();
                    this.oRecentActivities.recentDay = currentDay;
                    bNewDayAdded = true;
                }

                //collect all unresolved activities for current device.
                for (activityIndex = 0; activityIndex < this.oRecentActivities.recentUsageArray.length && !bIsResolved; activityIndex++) {
                    oActivity = this.oRecentActivities.recentUsageArray[activityIndex];
                    if (oActivity[sCurrentDevice] === undefined) {
                        // collect URLs without intent
                        if (!(oActivity.oItem.url[0] === "#")) {
                            aURL.push(oActivity.oItem.url);
                            // check if url contains the mandatory parameters then add it to intents
                        } else if (oActivity.oItem.url.indexOf("?") > -1) {
                            sMandatoryParams = oActivity.oItem.url.substring(oActivity.oItem.url.indexOf("?"));
                            // remove search app parameters
                            if (sMandatoryParams.indexOf("&/") > -1) {
                                sMandatoryParams = sMandatoryParams.substring(0, sMandatoryParams.indexOf("&/"));
                            }
                            aIntentsToResolve.push(oActivity.oItem.appId + sMandatoryParams);
                        } else {
                            aIntentsToResolve.push(oActivity.oItem.appId);
                        }
                    } else {
                        //we have resolved the activities from here, no need to continue.
                        bIsResolved = true;
                    }
                }

                // update current device for URLs without intent
                if (aURL.length > 0) {
                    var urlItem;
                    for (activityIndex = 0; activityIndex < this.oRecentActivities.recentUsageArray.length; activityIndex++) {
                        if (!(this.oRecentActivities.recentUsageArray[activityIndex].oItem.url[0] === "#")) {
                            urlItem = this.oRecentActivities.recentUsageArray[activityIndex];
                            urlItem[sCurrentDevice] = true;
                        }
                    }
                    if (aIntentsToResolve.length <= 0) {
                        // persist it.
                        this._save(this.oRecentActivities)
                            .done(function () {
                                var aItems = this._getRecentItemsForDevice(sCurrentDevice, this.oRecentActivities, maxNumOfActivities);

                                oDeferred.resolve(aItems);
                            }.bind(this))
                            .fail(function () {
                                oDeferred.reject();
                            });
                    }
                }

                if (aIntentsToResolve.length > 0) {
                    sap.ushell.Container.getServiceAsync("CrossApplicationNavigation")
                        .then(function (CrossApplicationNavigationService) {
                            //resolve intent support for current device.
                            CrossApplicationNavigationService.isIntentSupported(aIntentsToResolve)
                                .done(function (oResolved) {
                                    //save resolutions in aLoadedRecents
                                    bIsResolved = false;
                                    for (activityIndex = 0; activityIndex < this.oRecentActivities.recentUsageArray.length && !bIsResolved; activityIndex++) {
                                        oActivity = this.oRecentActivities.recentUsageArray[activityIndex];
                                        if (oActivity[sCurrentDevice] === undefined) {
                                            sMandatoryParams = "";
                                            if (oActivity.oItem.url.indexOf("?") > -1) {
                                                sMandatoryParams = oActivity.oItem.url.substring(oActivity.oItem.url.indexOf("?"));
                                                // remove search app parameters
                                                if (sMandatoryParams.indexOf("&/") > -1) {
                                                    sMandatoryParams = sMandatoryParams.substring(0, sMandatoryParams.indexOf("&/"));
                                                }
                                            }
                                            var oItem = oResolved[oActivity.oItem.appId + sMandatoryParams];
                                            oActivity[sCurrentDevice] = !!(oItem && oItem.supported);
                                        } else if (oActivity.oItem.url[0] === "#") {
                                            bIsResolved = true;
                                        }
                                    }

                                    // persist it.
                                    this._save(this.oRecentActivities)
                                        .done(function () {
                                            var aItems = this._getRecentItemsForDevice(sCurrentDevice, this.oRecentActivities, maxNumOfActivities);

                                            oDeferred.resolve(aItems);
                                        }.bind(this))
                                        .fail(function () {
                                            oDeferred.reject();
                                        });
                                }.bind(this))
                                .fail(function (sMsg) {
                                    oDeferred.reject(sMsg);
                                });
                        }.bind(this));
                } else if ((aIntentsToResolve.length <= 0) && (aURL.length <= 0)) {
                    if (bNewDayAdded) {
                        // If a new day was added, persist it.
                        this._save(this.oRecentActivities)
                            .done(function () {
                                var aItems = this._getRecentItemsForDevice(sCurrentDevice, this.oRecentActivities, maxNumOfActivities);

                                oDeferred.resolve(aItems);
                            }.bind(this))
                            .fail(function () {
                                oDeferred.reject();
                            });
                    } else {
                        var aItems = this._getRecentItemsForDevice(sCurrentDevice, this.oRecentActivities, maxNumOfActivities);

                        oDeferred.resolve(aItems);
                    }
                }
            }.bind(this))
            .fail(function () {
                oDeferred.reject();
            });

        return oDeferred.promise();
    };

    RecentActivity.prototype._getRecentItemsForDevice = function (device, recents, maxNumOfActivities) {
        var aRecentItemsForDevice = [];
        var iDeviceDependentActivities = 0;
        var oActivity;

        for (var iRecentActivities = 0;
             iRecentActivities < recents.recentUsageArray.length && (!maxNumOfActivities || iDeviceDependentActivities < maxNumOfActivities);
             iRecentActivities++) {
            oActivity = recents.recentUsageArray[iRecentActivities];

            if (oActivity[device]) {
                aRecentItemsForDevice.push(oActivity);
                iDeviceDependentActivities++;
            }
        }

        return aRecentItemsForDevice;
    };

    RecentActivity.prototype.getRecentItems = function () {
        var oDeferred = new jQuery.Deferred();

        this.getRecentItemsHelper(RecentActivity.ITEM_COUNT)
            .done(function (recentItems) {
                oDeferred.resolve(jQuery.map(recentItems, function (oRecentEntry) {
                    return oRecentEntry.oItem;
                }));
            })
            .fail(function () {
                oDeferred.reject();
            });

        return oDeferred.promise();
    };

    RecentActivity.prototype.getFrequentItems = function () {
        var oDeferred = new jQuery.Deferred();

        this.getRecentItemsHelper()
            .done(function (recentItems) {
                var activityIndex;
                var iWorkingDaysCounter = 0;
                var aFrequentActivity = [];
                var oActivity;
                var previousActivityDate = recentItems[0] ? new Date(recentItems[0].iTimestamp) : undefined;
                var currentActivityDate;
                // Go through the recent activities list and leave only activities from the last MAX_DAYS working days
                for (activityIndex = 0; activityIndex < recentItems.length && iWorkingDaysCounter < RecentActivity.MAX_DAYS; activityIndex++) {
                    oActivity = recentItems[activityIndex];
                    // Add only activities that happened more than once
                    if (oActivity.iCount > 1) {
                        aFrequentActivity.push(oActivity);
                    }
                    currentActivityDate = new Date(oActivity.iTimestamp);
                    if (previousActivityDate.toDateString() !== currentActivityDate.toDateString()) {
                        // If found an activity with a different date than the previous one, increase the days counter
                        iWorkingDaysCounter++;
                        previousActivityDate = currentActivityDate;
                    }
                }
                // Sort in descending order according to the count
                aFrequentActivity.sort(function (a, b) {
                    return b.iCount - a.iCount;
                });
                // Take only first items (ITEM_COUNT most frequent items)
                aFrequentActivity = aFrequentActivity.slice(0, RecentActivity.ITEM_COUNT);
                oDeferred.resolve(jQuery.map(aFrequentActivity, function (oRecentEntry) {
                    return oRecentEntry.oItem;
                }));
            })
            .fail(function () {
                oDeferred.reject();
            });

        return oDeferred.promise();
    };

    RecentActivity.prototype.addNewDay = function () {
        var activityIndex,
            aCurrentActivityArray;
        for (activityIndex = 0; activityIndex < this.oRecentActivities.recentUsageArray.length; activityIndex++) {
            // Get the array of app usage
            if (this.oRecentActivities.recentUsageArray[activityIndex].aUsageArray) {
                aCurrentActivityArray = this.oRecentActivities.recentUsageArray[activityIndex].aUsageArray;
            } else {
                // If no array exists, add an empty array and also set iCount to 0
                aCurrentActivityArray = [];
                this.oRecentActivities.recentUsageArray[activityIndex].aUsageArray = aCurrentActivityArray;
                this.oRecentActivities.recentUsageArray[activityIndex].iCount = 0;
            }

            // Add an item in the Array for the new day
            aCurrentActivityArray[aCurrentActivityArray.length] = 0;

            // If the array size is > iMaximumDays, remove the first (oldest) entry and update the count accordingly
            if (aCurrentActivityArray.length > RecentActivity.MAX_DAYS) {
                this.oRecentActivities.recentUsageArray[activityIndex].iCount -= aCurrentActivityArray[0];
                aCurrentActivityArray.shift();
            }
        }
    };

    RecentActivity.prototype.getDayFromDateObj = function (dateObj) {
        return (dateObj.getUTCFullYear() + "/" + (dateObj.getUTCMonth() + 1) + "/" + dateObj.getUTCDate());
    };

    RecentActivity.prototype.getRecentActivitiesFromLoadedData = function (loadedRecents) {
        var recentActivities;
        if (Array.isArray(loadedRecents)) {
            recentActivities = {
                recentDay: null,
                recentUsageArray: loadedRecents
            };
        } else {
            recentActivities = loadedRecents || {
                recentDay: null,
                recentUsageArray: []
            };
        }

        // Validate entries
        recentActivities.recentUsageArray = (recentActivities.recentUsageArray || []).filter(function (oActivity) {
            var bIsValid = oActivity && oActivity.oItem && oActivity.oItem.url;
            if (!bIsValid) {
                Log.error("FLP Recent Activity", oActivity, "is not valid. The activity is removed from the list.");
            }
            return bIsValid;
        });

        return recentActivities;
    };

    /**
     * User action collector counter of user usage of applications according to the URL hash.
     *
     * @constructor
     * @private
     */
    var RecentAppsUsage = UserRecentsBase.extend("sap.ushell.services.RecentAppsUsage", {
        constructor: function () {
            UserRecentsBase.call(this, "AppsUsage");
        }
    });

    RecentAppsUsage.MAX_DAYS = 30; // Number of days to be considered "recent"

    /**
     * Initialization of RecentAppsUsage.
     * Called from shell.controller's <code>init</code> function
     *   - Loads user personalized data
     *   - Defines a new day is the data structure, if needed
     *   - Cleans empty hash usage arrays
     *
     * @private
     */
    RecentAppsUsage.prototype.init = function () {
        var sCurrentDay = this.getDayFromDateObj(new Date());
        var bDataLoadedTriggered = false;

        if (this._oInitDeferred === undefined) {
            this._oInitDeferred = new jQuery.Deferred();
        }

        // Personalized data not loaded yet
        if (!bDataLoadedTriggered || sCurrentDay !== this.oAppsUsageData.recentDay) {
            bDataLoadedTriggered = true;

            // Load data
            this._load()
                .done(function (data) {
                    // Initialize structure from the loaded data, or define new
                    this.oAppsUsageData = data || {
                        recentDay: null,
                        recentAppsUsageMap: {}
                    };

                    // Update usage
                    this.calculateInitialUsage(sCurrentDay);
                    this._oInitDeferred.resolve(this.oAppsUsageData);
                }.bind(this))
                .fail(function () {
                    Log.error("UShell-lib ; RecentAppsUsage ; Load data in Init failed");
                    this._oInitDeferred.reject();
                }.bind(this));
        }
        return this._oInitDeferred.promise();
    };

    /**
     * @private
     * @param {string} currentDay The current day in the format YYYY/mm/dd.
     */
    RecentAppsUsage.prototype.calculateInitialUsage = function (currentDay) {
        // If the current day is different than the recent one -
        // add a new entry (for the current day's usage) to each hash usage array
        if (currentDay !== this.oAppsUsageData.recentDay) {
            this.addNewDay();
            this.oAppsUsageData.recentDay = currentDay;

            // Remove hash entries that weren't touched lately
            // postpone to not delay main flow
            setTimeout(function () {
                this.cleanUnusedHashes();
            }.bind(this), 3000);

            // Save the data after the "new day" routine
            this.saveAppsUsage(this.oAppsUsageData);
        }
    };

    /**
     * Records applications usage according to URL hashes
     *   - Check hash validity
     *   - Gets the relevant hash usage array
     *   - Add this usage (increment the value) or create a new array if needed
     *   - Save the data structure
     *
     * @param {string} hash The hash of the application for which a usage should be registered.
     * @private
     */
    RecentAppsUsage.prototype.addAppUsage = function (hash) {
        // Check hash validity
        if (!utils.validHash(hash)) {
            return (new jQuery.Deferred()).reject("Non valid hash").promise();
        }

        return this.init()
            .done(function () {
                // Get the data (usage per day) for the given hash
                var aAppUsageArray = this.oAppsUsageData.recentAppsUsageMap[hash] || [];

                // New app that wasn't opened so far. Insert "1" since this is the first time it is opened
                if (aAppUsageArray.length === 0) {
                    aAppUsageArray[0] = 1;
                } else {
                    // Increment the existing counter of this day for this hash (i.e. the last entry in the array)
                    aAppUsageArray[aAppUsageArray.length - 1] += 1;
                }
                this.oAppsUsageData.recentAppsUsageMap[hash] = aAppUsageArray;
                this.saveAppsUsage(this.oAppsUsageData);
            }.bind(this))
            .fail(function () {
                Log.error("Ushell-lib ; addAppUsage ; Initialization falied!");
            });
    };

    /**
     * Summarises and returns the usage per hash and the minimum and maximum values
     */
    RecentAppsUsage.prototype.getAppsUsage = function () {
        var result;
        var oDeferred = new jQuery.Deferred();

        this.init()
            .done(function () {
                result = this.summarizeUsage();
                oDeferred.resolve(result);
            }.bind(this))
            .fail(function () {
                oDeferred.reject("Not initialized yet");
            });

        return oDeferred.promise();
    };

    RecentAppsUsage.prototype.summarizeUsage = function () {
        var usageMap = {};
        var maxUsage,
            minUsage;
        var firstHashUsage = true;

        for (var hash in this.oAppsUsageData.recentAppsUsageMap) {
            usageMap[hash] = this.getHashUsageSum(hash);
            if (firstHashUsage) {
                maxUsage = minUsage = usageMap[hash];
                firstHashUsage = false;
            } else if (usageMap[hash] < minUsage) {
                minUsage = usageMap[hash];
            } else if (usageMap[hash] > maxUsage) {
                maxUsage = usageMap[hash];
            }
        }
        return { usageMap: usageMap, maxUsage: maxUsage, minUsage: minUsage };
    };

    RecentAppsUsage.prototype.addNewDay = function () {
        var aAppUsageArray;
        for (var hash in this.oAppsUsageData.recentAppsUsageMap) {
            // Get the array of app/hash usage
            aAppUsageArray = this.oAppsUsageData.recentAppsUsageMap[hash];

            // Add an item in the Array for the new day
            aAppUsageArray[aAppUsageArray.length] = 0;

            // If the array size is > iMaximumDays, remove the first (oldest) entry
            if (aAppUsageArray.length > RecentAppsUsage.MAX_DAYS) {
                aAppUsageArray = aAppUsageArray.shift();
            }
        }
    };

    RecentAppsUsage.prototype.cleanUnusedHashes = function () {
        var iUsages;

        for (var hash in this.oAppsUsageData.recentAppsUsageMap) {
            iUsages = this.getHashUsageSum(hash);

            if (iUsages === 0) {
                delete (this.oAppsUsageData.recentAppsUsageMap[hash]);
            }
        }
    };

    RecentAppsUsage.prototype.getHashUsageSum = function (hash) {
        var sum = 0;
        var dayIndex;
        var appUsageArray = this.oAppsUsageData.recentAppsUsageMap[hash];
        var length = appUsageArray.length;

        for (dayIndex = 0; dayIndex < length; dayIndex++) {
            sum += appUsageArray[dayIndex];
        }
        return sum;
    };

    RecentAppsUsage.prototype.saveAppsUsage = function (obj) {
        return this._save(obj)
            .fail(function () {
                Log.error("Ushell-lib ; saveAppsUsage ; Save action failed");
            });
    };

    RecentAppsUsage.prototype.getDayFromDateObj = function (dateObj) {
        return (dateObj.getUTCFullYear() + "/" + (dateObj.getUTCMonth() + 1) + "/" + dateObj.getUTCDate());
    };

    /**
     * @class The Unified Shell's page user recents service. It used for managing recent searches and recently viewed apps.
     * @constructor
     * @see sap.ushell.services.Container#getServiceAsync
     * @since 1.15.0
     * @public
     */
    var UserRecents = BaseObject.extend("sap.ushell.services.UserRecents", {
        constructor: function () {
            this.oRecentSearches = new RecentsList("RecentSearches", 10, UserRecents._compareSearchItems);
            this.oRecentDataSources = new RecentsList("RecentDataSources", 6, UserRecents._compareDataSources);
            this.oRecentApps = new RecentsList("RecentApps", 6, UserRecents._compareApps);

            this.oRecentActivity = new RecentActivity(500);
            this.oAppsUsage = new RecentAppsUsage();
        }
    });

    /**
     * Checks if the given search items are equivalent.
     *
     * @param {object} a The first search item to be checked.
     * @param {object} b The second search item to be checked.
     * @returns {boolean} True if both search item are equivalent, otherwise false.
     * @static
     * @private
     */
    UserRecents._compareSearchItems = function (a, b) {
        var bResult = false;

        if (a.oDataSource && b.oDataSource) {
            if (a.oDataSource.objectName && b.oDataSource.objectName) {
                bResult = ((a.sTerm === b.sTerm) && (a.oDataSource.objectName.value === b.oDataSource.objectName.value));
            }
            if (!a.oDataSource.objectName && !b.oDataSource.objectName) {
                bResult = (a.sTerm === b.sTerm);
            }
        }

        if (!a.oDataSource && !b.oDataSource) {
            bResult = (a.sTerm === b.sTerm);
        }

        return bResult;
    };

    /**
     * Checks if the given data sources are equivalent.
     *
     * @param {object} a The first data source to be checked.
     * @param {object} b The second data source to be checked.
     * @returns {boolean} True if both data sources are equivalent, otherwise false.
     * @static
     * @private
     */
    UserRecents._compareDataSources = function (a, b) {
        if (a.objectName && b.objectName) {
            return a.objectName.value === b.objectName.value;
        }
        return false;
    };

    /**
     * Checks if the given applications are equivalent.
     *
     * @param {object} a The first app to be checked.
     * @param {object} b The second app to be checked.
     * @returns {boolean} True if both applications are equivalent, otherwise false.
     * @static
     * @private
     */
    UserRecents._compareApps = function (a, b) {
        return a.semanticObject === b.semanticObject && a.action === b.action;
    };

    /**
     * Adds the given activity item to the list of activities.
     *
     * @param {object} oActionItem The activity to be added.
     * @returns {jQuery.Promise} A jQuery Promise that is resolved to the list of updated activities.
     * @since 1.32.0
     * @public
     * @alias sap.ushell.services.UserRecents#addActivity
     */
    UserRecents.prototype.addActivity = function (oActionItem) {
        var oDeferred = new jQuery.Deferred();

        this.oRecentActivity.newItem(oActionItem)
            .done(function () {
                this.oRecentActivity.getRecentItems()
                    .done(oDeferred.resolve)
                    .fail(oDeferred.reject);
            }.bind(this))
            .fail(oDeferred.reject);

        return oDeferred.promise();
    };

    /**
     * Clears the list of activities.
     *
     * @since 1.54.0
     * @returns {jQuery.Promise} A jQuery promise that is resolved once all activities are cleared.
     * @public
     * @alias sap.ushell.services.UserRecents#clearRecentActivities
     */
    UserRecents.prototype.clearRecentActivities = function () {
        return this.oRecentActivity.clearAllActivities();
    };

    /**
     * Resolves to the list of activities.
     *
     * @returns {jQuery.Promise} A jQuery Promise that is resolved to the list of activities.
     * @since 1.32.0
     * @public
     * @alias sap.ushell.services.UserRecents#getRecentActivity
     */
    UserRecents.prototype.getRecentActivity = function () {
        return this.oRecentActivity.getRecentItems();
    };

    /**
     * @returns {jQuery.Promise} A jQuery Promise that is resolved to a list of frequently used activities.
     * @since 1.42.0
     * @public
     * @alias sap.ushell.services.UserRecents#getFrequentActivity
     */
    UserRecents.prototype.getFrequentActivity = function () {
        return this.oRecentActivity.getFrequentItems();
    };

    /**
     * Notification that the given data source has just been used.
     * Adds the search to the LRU list of data sources.
     *
     * @param {object} oDataSource The data source identified by the string parameter <code>objectName.value</code>
     * @returns {jQuery.Promise} A jQuery Promise that is resolved to the list of updated entries for data sources.
     * @since 1.19.0
     * @deprecated Since 1.93 in favor of the alias with the same functionality {@link sap.ushell.services.UserRecents.addDataSourceActivity}.
     * @public
     * @alias sap.ushell.services.UserRecents#noticeDataSource
     * @alias sap.ushell.services.UserRecents#addDataSourceActivity
     */
    UserRecents.prototype.noticeDataSource = function (oDataSource) {
        var sObjectNameValue = ObjectPath.get("objectName.value", oDataSource) || "";
        var sObjectName = ObjectPath.get("objectName", oDataSource) || "";
        var bValueIsAll = sObjectNameValue.toLowerCase() === "$$all$$";
        var bObjectNameIsAll = sObjectName.toLowerCase() === "$$all$$";

        // Don't save $$ALL$$
        if (!bValueIsAll && !bObjectNameIsAll) {
            var oDeferred = new jQuery.Deferred();

            this.oRecentDataSources.newItem(oDataSource)
                .done(function () {
                    this.oRecentDataSources.getRecentItems()
                        .done(oDeferred.resolve)
                        .fail(oDeferred.reject);
                }.bind(this))
                .fail(oDeferred.reject);

            return oDeferred.promise();
        }

        return this.oRecentDataSources.getRecentItems();
    };

    /**
     * Notifies the service that the given data source has been used recently.
     *
     * @param {object} oDataSource The data source identified by the string parameter <code>objectName.value</code>
     * @returns {jQuery.Promise} A jQuery Promise that is resolved to the list of updated entries for data sources.
     * @since 1.93.0
     * @public
     * @alias sap.ushell.services.UserRecents#noticeDataSource
     * @alias sap.ushell.services.UserRecents#addDataSourceActivity
     */
    UserRecents.prototype.addDataSourceActivity = UserRecents.prototype.noticeDataSource;

    /**
     * Returns the list of recently used data sources.
     *
     * @returns {jQuery.Promise} A jQuery Promise that is resolved to the list of updated entries for data sources.
     * @since 1.19.0
     * @public
     * @alias sap.ushell.services.UserRecents#getRecentDataSources
     */
    UserRecents.prototype.getRecentDataSources = function () {
        return this.oRecentDataSources.getRecentItems();
    };

    /**
     * Notification that the given search item has just been used.
     * Adds the search to the list of recently done searches.
     *
     * @param {object} oSearchItem The search item identified by the string parameter <code>sTerm</code>
     * @returns {jQuery.Promise} A jQuery Promise that is resolved to the updated list of recent searches.
     * @since 1.15.0
     * @deprecated Since 1.93 in favor of the alias with the same functionality {@link sap.ushell.services.UserRecents.addSearchActivity}.
     * @public
     * @alias sap.ushell.services.UserRecents#noticeSearch
     * @alias sap.ushell.services.UserRecents#addSearchActivity
     */
    UserRecents.prototype.noticeSearch = function (oSearchItem) {
        var oDeferred = new jQuery.Deferred();

        this.oRecentSearches.newItem(oSearchItem)
            .done(function () {
                this.oRecentSearches.getRecentItems()
                    .done(oDeferred.resolve)
                    .fail(oDeferred.reject);
            }.bind(this))
            .fail(oDeferred.reject);

        return oDeferred.promise();
    };

    /**
     * Notifies the service that the given search item has been used recently.
     *
     * @param {object} oSearchItem The search item identified by the string parameter <code>sTerm</code>
     * @returns {jQuery.Promise} A jQuery Promise that is resolved to the updated list of recent searches.
     * @since 1.93.0
     * @public
     * @alias sap.ushell.services.UserRecents#addSearchActivity
     * @alias sap.ushell.services.UserRecents#noticeSearch
     */
    UserRecents.prototype.addSearchActivity = UserRecents.prototype.noticeSearch;

    /**
     * Returns the list of recently done searches.
     *
     * @returns {jQuery.Promise} A jQuery Promise that is resolved to the list of recent searches.
     * @since 1.15.0
     * @public
     * @alias sap.ushell.services.UserRecents#getRecentSearches
     */
    UserRecents.prototype.getRecentSearches = function () {
        return this.oRecentSearches.getRecentItems();
    };

    /**
     * Notification that the given app item has just been used.
     * Adds the search to the list of recently done searches.
     *
     * @param {object} oAppItem The app item identified by the string parameter <code>id</code>
     * @returns {jQuery.Promise} A jQuery Promise that is resolved to the updated list of recent apps.
     * @since 1.15.0
     * @deprecated Since 1.93 in favor of the alias with the same functionality {@link sap.ushell.services.UserRecents.addAppActivity}.
     * @public
     * @alias sap.ushell.services.UserRecents#noticeApp
     * @alias sap.ushell.services.UserRecents#addAppActivity
     */
    UserRecents.prototype.noticeApp = function (oAppItem) {
        var oDeferred = new jQuery.Deferred();

        this.oRecentApps.newItem(oAppItem)
            .done(function () {
                this.oRecentApps.getRecentItems()
                    .done(oDeferred.resolve)
                    .fail(oDeferred.reject);
            }.bind(this))
            .fail(oDeferred.reject);

        return oDeferred.promise();
    };

    /**
     * Notifies the service that the given app item has been used recently.
     *
     * @param {object} oAppItem The app item identified by the string parameter <code>id</code>
     * @returns {jQuery.Promise} A jQuery Promise that is resolved to the updated list of recent apps.
     * @since 1.93.0
     * @public
     * @alias sap.ushell.services.UserRecents#addAppActivity
     * @alias sap.ushell.services.UserRecents#noticeApp
     */
    UserRecents.prototype.addAppActivity = UserRecents.prototype.noticeApp;

    /**
     * Returns the list of recently used apps.
     *
     * @returns {jQuery.Promise} A jQuery Promise that is resolved to the list of recent apps.
     * @since 1.15.0
     * @public
     * @alias sap.ushell.services.UserRecents#getRecentApps
     */
    UserRecents.prototype.getRecentApps = function () {
        return this.oRecentApps.getRecentItems();
    };

    /**
     * Increment usage count for the given hash.
     * Currently called on openApp event.
     *
     * @param {string} hash The hash for the app for which a usage should be registered.
     */
    UserRecents.prototype.addAppUsage = function (hash) {
        var sRelevantHash = utils.getBasicHash(hash);

        this.oAppsUsage.addAppUsage(sRelevantHash);
    };

    /**
     * API function for the New VD 1 - user action Collector
     * Returns a map of total usage of all (used) applications, plus the maximum and minimum values.
     *
     * @returns {jQuery.Promise} A jQuery Promise that is resolved to an object containing usage-per-hash map and the minimum and maximum values.
     */
    UserRecents.prototype.getAppsUsage = function () {
        return this.oAppsUsage.getAppsUsage();
    };

    UserRecents.hasNoAdapter = true;
    return UserRecents;
}, true /* bExport */);
