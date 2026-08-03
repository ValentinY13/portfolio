import type { RouteMap, RouteLocationAsRelative, RouteLocationAsString, RouteLocationAsPath } from "#vue-router";

export interface NestedListItem {
  title: string;
  to?: keyof RouteMap | RouteLocationAsRelative | RouteLocationAsString | RouteLocationAsPath;
  items?: NestedListItem[];
}
