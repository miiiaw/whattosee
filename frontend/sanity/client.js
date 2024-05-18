import { createClient } from "@sanity/client";

export const sanityClient = createClient({
    projectId: 'pw0hwev7',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2023-05-03',
    ignoreBrowserTokenWarning: true
})


export const writeClient = createClient({
    projectId: "pw0hwev7",
    dataset: "production",
    useCdn: false,
    apiVersion: "2023-05-03",
    token: "sku3FVALJF7Uh5q43K2e76W7tynPoGJ75rfwKQV135jOvgb9Ji9QaMVBgP6XHF488ntGuF3cz5QqlQsLlMxpMsLAFr3tICWvfTFC3LszZ2zvf9St1wETvMu6N8lKcANM3sU9ijjD75rytl1gykWOjz7eiaNs7exxicsnpnKP28yBCCfFhrv3"
  })