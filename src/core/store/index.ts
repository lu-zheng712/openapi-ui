import { create } from "zustand";
import { StorageValue, devtools, persist } from "zustand/middleware";
import { IImportModeType } from "../../login/config";
import { IOpenAPI, IOperationEnhanceMap } from "../../openapi/type";
import { logger } from "./loggerMiddleware";

export interface IConfigInfo {
  timeout: number;
}

interface IConfigInfoState {
  configInfo: IConfigInfo | null | undefined;
  updateConfigInfo: (nextState: IConfigInfo) => void;
  clear: () => void;
}

export const configInfoStorageKey = "config-info-storage";
export const defaultConfigInfoStorage = { state: { configInfo: null }, version: 0 };
export type IConfigInfoStorageState = StorageValue<Pick<IConfigInfoState, "configInfo">>;

export const useConfigInfoStore = create<IConfigInfoState>()(
  logger(
    devtools(
      persist(
        (set) => ({
          configInfo: null,
          updateConfigInfo: (newInfo) => set(() => ({ configInfo: newInfo })),
          clear: () => set(() => ({ configInfo: null })),
        }),
        {
          name: configInfoStorageKey,
        },
      ),
    ),
  ),
);

export interface IOpenapiWithServiceInfo {
  serviceURL: string;
  servicePath?: string;
  openapi: IOpenAPI;
  operations?: IOperationEnhanceMap;
  importModeType: IImportModeType;
}

interface IOpenapiWithServiceInfoState {
  openapiWithServiceInfo: IOpenapiWithServiceInfo | null | undefined;
  updateOpenapiWithServiceInfo: (nextState: IOpenapiWithServiceInfo) => void;
  clear: () => void;
}

export const openapiWithServiceInfoStorageKey = "openapi-with-service-info-storage";

export const useOpenapiWithServiceInfoStore = create<IOpenapiWithServiceInfoState>()(
  logger(
    devtools(
      persist(
        (set) => ({
          openapiWithServiceInfo: null,
          updateOpenapiWithServiceInfo: (newInfo) => set(() => ({ openapiWithServiceInfo: newInfo })),
          clear: () => set(() => ({ openapiWithServiceInfo: null })),
        }),
        {
          name: openapiWithServiceInfoStorageKey,
        },
      ),
    ),
  ),
);