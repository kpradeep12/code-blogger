---
layout: page
title: cURL cheat sheet
published: false
menus:
    - title: Get
      url: get
---
cURL is an open-source command-line tool to make network calls. It supports many protocols. In this page, we will see some most commonly used options to test HTTP end points.

##### Get

| **curl http://localhost:9091/hello**   | Prints headers and response body
| **curl -i http://localhost:9091/hello**   | Prints only response
| **curl -u \<userid>:\<password> http://localhost:9091/hello**   | Pass basic authentication details with user id and password.
| **curl -H "\<key>: \<value>" http://localhost:9091/hello**   | Pass header in the request.
{: .custom-cheat-sheet-table}

***