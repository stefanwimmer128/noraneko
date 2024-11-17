/* -*- indent-tabs-mode: nil; js-indent-level: 2 -*-
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import {
  Flex,
  VStack,
  Text,
  Switch, FormControl,
} from "@chakra-ui/react";
import {getFireDragonData, saveFireDragonData} from "./dataManager";
import React, {useEffect} from "react";
import type {FireDragonData} from "@/type";
import {Controller, FormProvider, useForm, useWatch} from "react-hook-form";

export default function FireDragon() {
  const methods = useForm<FireDragonData>({
    defaultValues: () => getFireDragonData(),
  });
  const { control, setValue } = methods;
  const watchAll = useWatch({
    control: methods.control,
  });

  useEffect(() => {
    const fetchDefaultValues = async () => {
      const values = await getFireDragonData();
      for (const key in values) {
        setValue(
          key as keyof FireDragonData,
          values[key as keyof FireDragonData],
        );
      }
    };
    document?.documentElement?.addEventListener("onfocus", fetchDefaultValues);
    return () => {
      document?.documentElement?.removeEventListener(
        "onfocus",
        fetchDefaultValues,
      );
    };
  }, [setValue]);

  useEffect(() => {
    saveFireDragonData(watchAll as FireDragonData);
  }, [watchAll]);

  return (
    <Flex direction="column" alignItems="center" maxW="700px" mx="auto" py={8}>
      <Text fontSize="3xl" mb={10}>FireDragon</Text>

      <VStack align="stretch" spacing={6} w="100%">
        <FormProvider {...methods}>
          <Controller
            name="firefoxSync"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormControl>
                <Switch onChange={(e) => onChange(e.target.checked)} isChecked={value}>Firefox Sync</Switch>
              </FormControl>
            )}
          />
        </FormProvider>
      </VStack>
    </Flex>
  );
}
