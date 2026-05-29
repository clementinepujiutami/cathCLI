#!/usr/bin/env bash
set -e

BOLD='\033[1m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
DIM='\033[2m'
RESET='\033[0m'

echo ""
echo -e "${BOLD}  ██            ██${RESET}"
echo -e "${BOLD}  ██████      ██████${RESET}"
echo -e "${BOLD}  ██████████████████${RESET}"
echo -e "  cathCLI — cat-holic · Holy Bible & Catholic Prayers"
echo ""

# ── Node.js ───────────────────────────────────────────────────────────────────
if command -v node &>/dev/null; then
  NODE_MAJOR=$(node -v | sed 's/v//' | cut -d. -f1)
  if [ "$NODE_MAJOR" -lt 18 ]; then
    echo -e "${RED}  ✗ Node.js $(node -v) is too old — need v18 or newer.${RESET}"
    echo -e "${DIM}    Install from: https://nodejs.org${RESET}"
    exit 1
  fi
  echo -e "${GREEN}  ✔ Node.js $(node -v)${RESET}"
else
  echo -e "${YELLOW}  → Node.js not found. Installing via nvm...${RESET}"
  curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
  export NVM_DIR="$HOME/.nvm"
  # shellcheck disable=SC1091
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  nvm install --lts
  echo -e "${GREEN}  ✔ Node.js $(node -v) installed${RESET}"
fi

# ── pnpm ──────────────────────────────────────────────────────────────────────
if command -v pnpm &>/dev/null; then
  echo -e "${GREEN}  ✔ pnpm $(pnpm -v)${RESET}"
else
  echo -e "${YELLOW}  → pnpm not found. Installing...${RESET}"
  curl -fsSL https://get.pnpm.io/install.sh | sh -
  export PNPM_HOME="$HOME/.local/share/pnpm"
  export PATH="$PNPM_HOME:$PATH"
  echo -e "${GREEN}  ✔ pnpm $(pnpm -v) installed${RESET}"
fi

# ── cathCLI ───────────────────────────────────────────────────────────────────
echo ""
echo -e "  ${DIM}Installing cathCLI from GitHub...${RESET}"
pnpm install -g github:clementinepujiutami/cathCLI

echo ""
echo -e "${GREEN}${BOLD}  ✔ Done! cathCLI is ready.${RESET}"
echo ""
echo -e "  Run ${BOLD}cath${RESET} to get started."
echo -e "  ${DIM}cath --help for all commands${RESET}"
echo ""
