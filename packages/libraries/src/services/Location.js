import Urls from "./urls";
import { Request } from "./Utils/Request";

export const LocationService = {
  getLocalities: ({ tenantId }) => {
    return Request({ url: Urls.location.localities, params: { tenantId: tenantId.toLowerCase() }, useCache: true });
  },
};
