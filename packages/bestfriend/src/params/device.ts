import type { ParamMatcher } from '@sveltejs/kit';
import { devices } from '$lib/devices';

// Keeps the root-level dynamic route from swallowing every unknown path.
export const match: ParamMatcher = (param) => devices.some((device) => device.slug === param);
