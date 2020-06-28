import { UnavailableError } from "./unavailable.error";

export class ServiceDisabledError extends UnavailableError {
  constructor(service: string = '') {
    super(`Service ${service} is disabled by configuration options.`);
  }
}