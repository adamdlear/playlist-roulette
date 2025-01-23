/* This file is auto-generated by SST. Do not edit. */
/* tslint:disable */
/* eslint-disable */
/* deno-fmt-ignore-file */

declare module "sst" {
    export interface Resource {
        ConnectionsTable: {
            name: string;
            type: "sst.aws.Dynamo";
        };
        GameTable: {
            name: string;
            type: "sst.aws.Dynamo";
        };
        PlaylistRoulette: {
            type: "sst.aws.Nextjs";
            url: string;
        };
        RestApi: {
            type: "sst.aws.ApiGatewayV2";
            url: string;
        };
        WebsocketApi: {
            managementEndpoint: string;
            type: "sst.aws.ApiGatewayWebSocket";
            url: string;
        };
    }
}
/// <reference path="sst-env.d.ts" />

import "sst";
export {};
