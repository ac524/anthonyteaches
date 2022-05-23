## What Is Serverless Computing?

Sometimes known as *cloud computing*, serverless computing enables developers to create code in a secure run-time environment as close as possible to users. When serverless computing is used, it is calculated on an as-used basis rather than being purchased with a pre-determined cloud package; the latter method being the traditional way of obtaining cloud computing services. 

It is important to note that the term 'serverless' is conceptually implied. Servers are used in serverless computing, but there are no direct interactions with those servers; they are hidden so developers can focus on developing their application without worrying about server infrastructure. 

## What Is Cloudflare?

Cloudflare is a Content Deliver Network (CDN) intended to provide a fast, secure global network of serverless functions with adherence to protect your website and other internet applications. Cloudflare delivers serverless computing by running JavaScript server-side code via *edge computing*. One can think of edge computing as environmental nodes specific to its intended use-case. For example, a third-party API should run wherever the API is hosted. Similarly, responding to a user in Belgium should enable the ability for that code to run in Belgium - closest to the user. 

## What Are Cloudflare Workers & What Problems Do They Solve?

Cloudflare Workers are a code execution environment designed on V8, the engine that powers Google Chrome. Cloudflare operates 270 data centers globally, enabling developers to use environments closest to their users. Similar to Node.js, Cloudflare does not run in the browser, but rather relies upon the Service Worker API. A service worker simulates an offline user-environment to determine speed, efficiency and execution of an internet application. Cloudflare features a cloud playground where developers can simulate Cloudflare Workers in a secure environment. 

When a client interacts with a server, requests funnel directly to that server. However, with increasing internet traffic comes an uptick in requests which can flood a server, creating a poor user experience. Cloudflare Workers aim to solve this issue by utilizing edge networks, environments closest to a user rather than a centralized server. Cloudflare also provides a number of security features including, but limited to, protection against DDoS attacks and malicious bots.

## Helpful Links:

Cloudflare - https://www.cloudflare.com/
Service Worker API - https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API 
Cloudflare Workers Playground - https://cloudflareworkers.com/#12a9195720fe4ed660949efdbd9c0219:https://tutorial.cloudflareworkers.com 
Serverless (IBM) - https://www.ibm.com/cloud/learn/serverless 