# Crypto Gorilla Game

This project is a blockchain game built on Aptos. It consists of two main parts:

## Description

Crypto Gorilla Game is a digital collectible and strategy game where players build and manage their own tribe of unique gorillas.  Each gorilla possesses distinct attributes that contribute to the tribe's overall strength and score.  Players can mint new gorillas, evolve existing ones to enhance their abilities, and compete with others based on their tribe's score.

### Features

*   **Unique Gorilla NFTs:** Each gorilla is a non-fungible token (NFT) with randomly generated attributes, making every gorilla unique and collectible.
*   **Strategic Evolution:** Players can strategically evolve their gorillas to increase their stage and boost their tribe's score.
*   **Tribe Management:** Players can manage their tribe of up to 5 gorillas, optimizing their composition for maximum score potential.
*   **Community Competition:** Players can compete with others based on their tribe's score, fostering a sense of community and rivalry.
*   **Aptos Blockchain Integration:** The game leverages the Aptos blockchain for secure ownership, transparency, and provable scarcity of gorilla NFTs.

## Contract

The contract is written in Move and defines the game's logic.  It uses the Aptos framework and various standard libraries.  The game revolves around collecting and evolving digital gorillas.  Each gorilla has attributes such as strength, intelligence, and social skills, and can evolve through multiple stages.  The goal is to build a powerful tribe with a high overall score.

### Game Mechanics

*   **Minting:** Players can mint new gorillas by paying 100000000 base units (1 APT). Each gorilla is randomly generated with unique attributes (strength, intelligence, social skills, agility, endurance, leadership) and starts at stage 0 with a random rarity (common, rare, epic, legendary).
*   **Evolving:** Players can evolve their gorillas by paying 50000000 base units (0.5 APT). Evolving increases the gorilla's stage by 1, up to a maximum of stage 3, and also increases all of its attributes by 1.  Each stage contributes to the tribe's overall score percentage.
    *   **Stage 0 (Baby Gorilla):** Base stage.
    *   **Stage 1 (Juvenile Gorilla):** 
    *   **Stage 2 (Adult Gorilla):** 
    *   **Stage 3 (Silverback Gorilla):** 
*   **Tribe:** Players can collect up to 5 gorillas in their tribe.  The tribe's score is a percentage calculated based on the total stats of all gorillas, the distribution of stages among the gorillas, and the distribution of rarities among the gorillas.  These factors are weighted to determine the final tribe score percentage.
*   **Cooldown:** There is a 24-hour cooldown period between minting or evolving gorillas.
*   **Scoring:** The game's primary objective is to maximize your tribe's score by strategically minting and evolving gorillas with high attributes and advancing them to higher stages, while also maintaining a balanced distribution of stages and rarities within the tribe.

The specific game mechanics are further detailed in the `contract` directory.  Dependencies include `aptos`, `@aptos-labs/wallet-adapter-react`, `@chakra-ui/react`, `@emotion/react`, `@emotion/styled`, `framer-motion`, and `petra-plugin-wallet-adapter`.

## Frontend

The frontend is built with React, Chakra UI, and the Aptos TypeScript SDK. It provides a user interface for interacting with the game's smart contract.  The frontend is located in the `frontend` directory.  Dependencies include `react`, `react-dom`, `@chakra-ui/react`, `@emotion/react`, `@emotion/styled`, `framer-motion`, `@aptos-labs/ts-sdk`, `@aptos-labs/wallet-adapter-core`, `@aptos-labs/wallet-adapter-react`, and `@martianwallet/aptos-wallet-adapter`.  The frontend uses Vite for development and building.

## Getting Started

To run this project, you will need to have Node.js and npm installed.  Then, clone the repository and navigate to the `frontend` directory.  Run `npm install` to install the dependencies.  After that, you can run `npm run dev` to start the development server.  The contract needs to be deployed to the Aptos network separately.  Instructions for deploying the contract are not provided here.

## Project Structure

*   **contract/**: Contains the Move source code for the game's smart contract.
*   **frontend/**: Contains the React frontend code.

## Technologies Used

*   **Move:** Smart contract language for Aptos.
*   **React:** JavaScript library for building user interfaces.
*   **Chakra UI:** React component library.
*   **Aptos SDK:** TypeScript SDK for interacting with the Aptos blockchain.
*   **Vite:** Build tool for the frontend.
