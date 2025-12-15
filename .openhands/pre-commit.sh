#!/bin/bash
set -e

bun run format && bun run lint && bun run build
