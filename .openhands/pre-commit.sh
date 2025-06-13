#!/bin/bash
set -e

pnpm run format && pnpm run lint && pnpm run build
