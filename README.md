# Wordle

This repository is an implementation of **Wordle**.

It currently contains a web app built with Vite, React, and TypeScript.

## Project Structure

```text
wordle/
└── webapp/          # Wordle web application
```

## Web App

The Wordle application source code lives in `webapp/`.

See [webapp/README.md](webapp/README.md) for full details, including:

- Architecture overview
- Game state and types
- Core game logic functions
- Links to live app and documentation

## Game Logic Overview

The game follows standard Wordle rules:

1. Correct letter in correct position → `correct`
2. Correct letter in wrong position → `present`
3. Letter not in target word (or extra duplicate) → `absent`

Keyboard hints are derived from past guesses with precedence:

`correct` > `present` > `absent` > `unknown`
