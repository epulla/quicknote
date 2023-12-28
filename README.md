> [!CAUTION]
> This project has been discontinued, however here's a good similar open-source project you might definitely want to check out: [Cryptgeon](https://github.com/cupcakearmy/cryptgeon)

# Introduction

Have you ever shared a secret (such as a token or password) with a colleague? Have you felt that the way you share them is a little insecure? 👀

It is common to see cases where passwords or credentials are shared through insecure channels that are easy to hack 😵 There are ways to create secure channels but they are not very intuitive for non-developers 🤕

This is what Quicknote was created for! A secure channel where you can share your secrets quickly, easily and safely.

# What is Quicknote?

Based on [Privnote](https://privnote.com/), Quicknote is a open source app that helps to create and share volatile messages which only text is allowed. This app is perfect to quickly share passwords, private tokens, private credentials and gossip :).

# Tech Stack

- React
- FastAPI (python)
- Redis
- Docker

# Installation

You can install the software using [docker-compose](https://docs.docker.com/compose/):

```
docker-compose up
```

Backend (FastAPI) will be served at port `5000` and Frontend (React SPA) will be served at port `80`.

> [!NOTE]
> You can modify any configuration you need at `docker-compose.yml` file from the repo root folder.
