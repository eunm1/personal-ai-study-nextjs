import { api as apiUtility } from '@/lib/api';

declare global {
  var api: typeof apiUtility;
}