/* -*- indent-tabs-mode: nil; js-indent-level: 2 -*-
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import type {FireDragonData} from "@/type";

export const FIREFOX_SYNC_PREF = "identity.fxaccounts.enabled";

export async function getFireDragonData(): Promise<FireDragonData> {
  return {
    firefoxSync: await getPref(FIREFOX_SYNC_PREF, "boolean"),
  };
}

export async function saveFireDragonData(fireDragonData: FireDragonData): Promise<void> {
    await setPref(FIREFOX_SYNC_PREF, "boolean", fireDragonData.firefoxSync ?? await getPref(FIREFOX_SYNC_PREF, "boolean"));
}

export async function getPref(prefName: string, prefType: "string"): Promise<string>;
export async function getPref(prefName: string, prefType: "number"): Promise<number>;
export async function getPref(prefName: string, prefType: "boolean"): Promise<boolean>;
export async function getPref(prefName: string, prefType: string): Promise<any> {
  return await new Promise((resolve) => {
    window.NRSPrefGet(
      {
        prefName,
        prefType,
      },
      (prefValue: any) => {
        prefValue = JSON.parse(prefValue).prefValue;
        console.log("get", prefName, prefValue);
        resolve(prefValue);
      },
    );
  });
}

export async function setPref(prefName: string, prefType: "string", prefValue: string): Promise<void>;
export async function setPref(prefName: string, prefType: "number", prefValue: number): Promise<void>;
export async function setPref(prefName: string, prefType: "boolean", prefValue: boolean): Promise<void>;
export async function setPref(prefName: string, prefType: string, prefValue: any): Promise<void> {
  return await new Promise((resolve) => {
    window.NRSPrefSet(
      {
        prefName,
        prefType,
        prefValue,
      },
      () => {
        console.log("set", prefName, prefValue);
        resolve();
      },
    );
  });
}
