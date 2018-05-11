const env = process.env.RUN_IN
export const appId = {
  prd: 'wxfe70c566b10be60d',
  uat: 'wx37b2a08e77577150',
  fvt: 'wx31e9f9a802302b06',
  dev: 'wx499f62117ec1ba28',
  local: 'wx499f62117ec1ba28'
}[env]
